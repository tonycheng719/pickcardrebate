import { redirect } from "next/navigation";

export default function GuidePage() {
  redirect("/discover?type=guide");
}
