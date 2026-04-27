import { parseProfilePublicRef } from "@/app/lib/slug";
import { generateProfileShareMetadata, shareMetadataBundle } from "@/app/lib/og-helpers";

export async function generateMetadata({ params }) {
  const p = await params;
  const raw = p?.userRef != null ? String(p.userRef) : "";
  const { userId } = parseProfilePublicRef(raw);
  if (userId == null) {
    return shareMetadataBundle({
      segmentTitle: "Профиль",
      description: "Страница профиля в Setly",
      path: `/u/${encodeURIComponent(raw)}`,
    });
  }

  const meta = await generateProfileShareMetadata(userId);
  return (
    meta ??
    shareMetadataBundle({
      segmentTitle: "Профиль",
      description: "Страница профиля в Setly",
      path: `/u/${encodeURIComponent(raw)}`,
    })
  );
}

export default function UserProfileLayout({ children }) {
  return children;
}
