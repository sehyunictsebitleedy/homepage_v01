import { readData } from "@/lib/data";
import type { ProjectData } from "@/lib/types";
import ProjectContent from "./ProjectContent";

export default function ProjectPage() {
  const data = readData<ProjectData>("project.json");
  return <ProjectContent data={data} />;
}
