import { permanentRedirect } from "next/navigation";

export default function AuditPage() {
  permanentRedirect("/services/codebase-audit");
}
