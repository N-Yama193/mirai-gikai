import Link from "next/link";
import type { Route } from "next";
import { routes } from "@/lib/routes";
import type { Assembly } from "../../shared/types";
import { AssemblyCard } from "./assembly-card";

interface AssemblyListProps {
  assemblies: Assembly[];
}

export function AssemblyList({ assemblies }: AssemblyListProps) {
  if (assemblies.length === 0) {
    return (
      <p className="text-center py-12 text-muted-foreground">
        定例会・臨時会はまだ登録されていません
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {assemblies.map((assembly) => (
        <Link
          key={assembly.id}
          href={routes.generalQuestionList(assembly.id) as Route}
        >
          <AssemblyCard assembly={assembly} />
        </Link>
      ))}
    </div>
  );
}
