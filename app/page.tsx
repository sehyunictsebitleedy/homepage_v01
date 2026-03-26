import { readData } from "@/lib/data";
import type { HomeData, SiteData, PartnersData } from "@/lib/types";
import HomeContent from "./HomeContent";

export default function HomePage() {
  const home = readData<HomeData>("home.json");
  const site = readData<SiteData>("site.json");
  const { partners } = readData<PartnersData>("partners.json");
  return <HomeContent home={home} site={site} partners={partners.map((p) => p.name)} />;
}
