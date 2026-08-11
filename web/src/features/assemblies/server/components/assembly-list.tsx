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
        <AssemblyCard key={assembly.id} assembly={assembly} />
      ))}
    </div>
  );
}
