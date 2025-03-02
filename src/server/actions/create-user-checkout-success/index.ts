"use server";

import { env } from "@/env";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/server/db";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { CreateUserPresetSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";

// ✅ Extracted email sender function
const sendEmail = async (name: string, session_id: string, email: string) => {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, session_id }),
    });

    const data = (await res.json()) as {
      success: boolean;
      data: { id: string };
    };
    return data.success;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

const handler = async (data: InputType): Promise<ReturnType> => {
  const { priceId, userEmail, stripeSessionId, createdAt } = data;
  const date = new Date(createdAt * 1000);

  try {
    // ✅ Fetch presets and check user existence
    const [presets, existingUser] = await Promise.all([
      db.preset.findMany({ where: { productId: { in: priceId } } }),
      db.user.findUnique({
        where: { email: userEmail },
        include: { presets: true },
      }),
    ]);

    const presetUserData = presets.map((preset) => ({
      presetId: preset.id,
      userEmail,
      stripeSessionId,
      createdAt: date.toISOString(),
    }));

    // ✅ Filter out already owned presets
    const ownedPresetIds = new Set(
      existingUser?.presets.map((p) => p.presetId) ?? [],
    );

    const newPresetUserData = presetUserData.filter(
      (p) => !ownedPresetIds.has(p.presetId),
    );

    let emailSent = false;

    if (newPresetUserData.length > 0) {
      // ✅ If the user doesn't exist, create it first
      if (!existingUser) {
        await db.user.create({
          data: {
            email: userEmail,
            password: "N/A",
            accounts: {
              create: {
                type: "CLIENT",
                provider: "credentials",
                providerAccountId: randomUUID(),
              },
            },
          },
        });
      }

      // ✅ Insert new preset-user relationships
      await db.presetUser.createMany({ data: newPresetUserData });

      emailSent = await sendEmail(
        existingUser?.name ?? "Guest",
        stripeSessionId,
        userEmail,
      );
    }

    revalidatePath(`/shop/checkout_success`, "page");
    return { data: { count: newPresetUserData.length, success: emailSent } };
  } catch (error) {
    console.error("Error in createUserPreset:", error);
    return { error: "Something went wrong. Please try again later." };
  }
};

export const createUserPreset = createSafeAction(
  CreateUserPresetSchema,
  handler,
);

// "use server";
// import { env } from "@/env";
// import { createSafeAction } from "@/lib/create-safe-actions";
// import { db } from "@/server/db";
// import { randomUUID } from "crypto";
// import { revalidatePath } from "next/cache";
// import { CreateUserPresetSchema } from "./schema";
// import { type InputType, type ReturnType } from "./types";

// const handleSendLinkByEmail = async (
//   name: string,
//   session_id: string,
//   email: string,
// ) => {
//   const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/send`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email,
//       name: name,
//       session_id: session_id,
//     }), //Send data to api
//   });

//   const data = (await res.json()) as {
//     success: boolean;
//     data: { id: string };
//   };
//   return data;
// };

// const handler = async (data: InputType): Promise<ReturnType> => {
//   const { priceId, userEmail, stripeSessionId, createdAt } = data;

//   const date = new Date(createdAt * 1000);
//   let resendStatus;

//   try {
//     // Fetch Preset from db
//     const presets = await db.preset.findMany({
//       where: {
//         productId: {
//           in: priceId,
//         },
//       },
//     });

//     const presetId = presets.map((item) => item.id);

//     const presetUserData = presetId.map((id) => ({
//       presetId: id,
//       userEmail,
//       stripeSessionId,
//       createdAt: date.toISOString(),
//     }));

//     // Check if user exist
//     const userExist = await db.user.findUnique({
//       where: {
//         email: userEmail,
//       },
//       include: {
//         presets: true,
//       },
//     });
//     // Check if userPreset exist
//     const userPresetExist = await db.presetUser.findMany({
//       where: {
//         stripeSessionId,
//       },
//     });

//     // Check if the user already exists
//     if (!userExist) {
//       // If user do not exist => create user then insert presetUser data
//       await db.user.create({
//         data: {
//           email: userEmail,
//           password: "N/A",
//           accounts: {
//             create: {
//               type: "CLIENT",
//               provider: "credentials",
//               providerAccountId: randomUUID(),
//             },
//           },
//         },
//       });
//       // Insert preset right after user creation
//       await db.presetUser.createMany({
//         data: presetUserData,
//       });

//       resendStatus = await handleSendLinkByEmail(
//         "Guest",
//         stripeSessionId,
//         userEmail,
//       );
//     } // If user exists insert preset to presetUser
//     else if (userPresetExist.length === 0) {
//       // Check if presets exist already
//       // If stripe session doesn't exist. Then, create data
//       await db.presetUser.createMany({
//         data: presetUserData,
//       });

//       resendStatus = await handleSendLinkByEmail(
//         userExist.name ?? "Guest",
//         stripeSessionId,
//         userEmail,
//       );
//     }
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return {
//         error: err.message,
//       };
//     }
//   }

//   revalidatePath(`/shop/checkout_success`, "page");
//   return { data: { count: 0, success: resendStatus?.success ?? false } };
// };

// export const createUserPreset = createSafeAction(
//   CreateUserPresetSchema,
//   handler,
// );
