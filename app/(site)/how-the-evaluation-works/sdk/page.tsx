import type { Metadata } from "next";
import { SdkContent } from "@/components/api-docs/pages/sdk-content";

export const metadata: Metadata = {
  title: "SDK",
};

export default function SdkPage() {
  return <SdkContent />;
}
