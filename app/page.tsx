import { readData } from "@/lib/data";
import type { HomeData, SiteData, ProjectData } from "@/lib/types";
import HomeContent from "./HomeContent";

export default function HomePage() {
  const home = readData<HomeData>("home.json");
  const site = readData<SiteData>("site.json");
  const { years } = readData<ProjectData>("project.json");
  const projects2025 = years.find((y) => y.year === "2025")?.projects ?? [];
  return (
    <HomeContent
      home={home}
      site={site}
      marqueeItems={projects2025.map((p) => ({ title: p.title, client: p.client }))}
    />
  );
}
