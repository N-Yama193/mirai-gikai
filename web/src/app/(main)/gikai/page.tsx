import type { Metadata } from "next";
import { Container } from "@/components/layouts/container";
import { getAssemblies } from "@/features/assemblies/server/loaders/get-assemblies";
import { AssemblyList } from "@/features/assemblies/server/components/assembly-list";

export const metadata: Metadata = {
  title: "定例会一覧 | みらい議会",
  description: "広川町議会の定例会・臨時会の一覧です。",
};

export default async function AssemblyListPage() {
  const assemblies = await getAssemblies();

  return (
    <div className="bg-mirai-surface-muted">
      <Container className="py-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-[22px] font-bold text-black leading-[1.48]">
            定例会一覧
          </h1>
          <AssemblyList assemblies={assemblies} />
        </div>
      </Container>
    </div>
  );
}
