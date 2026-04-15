import { readData } from "@/lib/data";
import type { NavData } from "@/lib/types";
import NavbarContent from "./NavbarContent";

export default function Navbar() {
  const nav = readData<NavData>("nav.json");
  return <NavbarContent items={nav.items} />;
}
