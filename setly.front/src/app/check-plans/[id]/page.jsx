import { redirect } from "next/navigation";

/**
 * Единый публичный просмотр — `/preview-checkplan/...`.
 * Старые и закладки на `/check-plans/{segment}` ведут на ту же страницу.
 */
export default async function CheckPlansDynamic({ params }) {
  const resolved = await params;
  const raw = resolved?.id != null ? String(resolved.id) : "";
  const segment = raw.trim();
  if (!segment) {
    redirect("/check-plans");
  }
  redirect(`/preview-checkplan/${encodeURIComponent(segment)}`);
}
