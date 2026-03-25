import { readData } from "@/lib/data";
import type { NavData, SiteData } from "@/lib/types";
import NavbarContent from "./NavbarContent";

export default function Navbar() {
  const nav = readData<NavData>("nav.json");
  const site = readData<SiteData>("site.json");
  return <NavbarContent items={nav.items} logoText={site.logoText} />;
}
