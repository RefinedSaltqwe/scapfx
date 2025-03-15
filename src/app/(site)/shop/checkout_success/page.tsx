import React from "react";
import SuccessStripePageContent from "../../_components/SuccessStripePageContent";
import { redirect } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserPresets } from "@/server/queries/fetch-user-presets";
import { getUserByStripeSessionId } from "@/server/queries/fetch-user-preset-by-session";
import DynamicTitle from "@/components/DynamicTitle";
import { siteConfig } from "config/site";

type CheckoutSuccessPageProps = {
  searchParams: {
    session_id?: string;
  };
};

const CheckoutSuccessPage: React.FC<CheckoutSuccessPageProps> = async ({
  searchParams,
}) => {
  const session_id = searchParams.session_id;
  if (!session_id) {
    redirect("/shop");
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryFn: () => getUserPresets(session_id),
    queryKey: ["user_presets_", session_id],
  });
  await queryClient.prefetchQuery({
    queryFn: () => getUserByStripeSessionId(session_id),
    queryKey: ["user_by_stripe_session_id", session_id],
  });

  return (
    <>
      <DynamicTitle title={`Download File(s) | ${siteConfig.name}`} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SuccessStripePageContent sessionId={session_id} />
      </HydrationBoundary>
    </>
  );
};
export default CheckoutSuccessPage;
