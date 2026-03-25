import { readData } from "@/lib/data";
import type { HomeData, SiteData } from "@/lib/types";
import HomeContent from "./HomeContent";

export default function HomePage() {
  const home = readData<HomeData>("home.json");
  const site = readData<SiteData>("site.json");
  return <HomeContent home={home} site={site} />;
}
