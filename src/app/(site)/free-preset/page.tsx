import { db } from "@/server/db";
import DownloadButton from "../_components/DownloadButton";

interface FreePresetPageProps {
  searchParams?: {
    email?: string;
  };
}

export default async function FreePresetPage({
  searchParams,
}: FreePresetPageProps) {
  const email = searchParams?.email;

  if (!email) {
    return (
      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-sm flex-col items-center space-y-10 align-middle">
          <h2 className="text-primary mt-10 text-center text-2xl font-bold tracking-tight">
            Parameter Error
          </h2>
        </div>
      </div>
    );
  }

  const exist = await db.newsLetter.findUnique({
    where: { email },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {exist ? (
        <div className="flex w-full max-w-sm flex-col items-center space-y-10 align-middle">
          <h2 className="text-primary mt-10 text-center text-2xl font-bold tracking-tight">
            Free Preset Download
          </h2>
          <p className="text-primary text-center text-sm">
            Your preset is ready! Simply click the button below to download it.
          </p>
          <DownloadButton fileName="E1" />
        </div>
      ) : (
        <h2 className="text-primary mt-10 text-center text-2xl font-bold tracking-tight">
          Email does not exist.
        </h2>
      )}
    </div>
  );
}
