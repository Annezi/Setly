import { shareMetadataBundle } from "@/app/lib/og-helpers";

export const metadata = shareMetadataBundle({
  segmentTitle: "Создание чек-плана",
  description:
    "Создайте свой чек-план путешествия: что взять, куда сходить и бюджет — в одном месте.",
  path: "/create-checkplan",
});

export default function CreateCheckplanSegmentLayout({ children }) {
  return children;
}
