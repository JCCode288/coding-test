import { getSkillById } from "@/lib/api";

export default async function SkillDetail({ params }) {
   const { id } = await params;
   const { data: skill } = await getSkillById(id);

   return <section className="flex-1">{JSON.stringify(skill)}</section>;
}
