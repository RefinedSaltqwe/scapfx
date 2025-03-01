import React from "react";
import SuccessStripePageContent from "../../_components/SuccessStripePageContent";
import { redirect } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserPresets } from "@/server/queries/fetch-user-presets";

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SuccessStripePageContent sessionId={session_id} />
    </HydrationBoundary>
  );
};
export default CheckoutSuccessPage;
