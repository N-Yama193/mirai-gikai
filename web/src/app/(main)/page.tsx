import { Container } from "@/components/layouts/container";
import { AboutThisSite } from "@/components/top/about-this-site";
import { HirokawaHero } from "@/components/top/hirokawa-hero";
import { AssemblyList } from "@/features/assemblies/server/components/assembly-list";
import { LatestAssemblySection } from "@/features/assemblies/server/components/latest-assembly-section";
import { getAssemblies } from "@/features/assemblies/server/loaders/get-assemblies";
import { HotTopicsSection } from "@/features/home/server/components/hot-topics-section";

export default async function Home() {
  // getAssemblies() は年度・回次の降順で返すため、先頭が直近の定例会になる
  const assemblies = await getAssemblies();
  const [latestAssembly, ...pastAssemblies] = assemblies;

  return (
    <>
      <HirokawaHero />

      <Container className="py-10">
        <div className="flex flex-col gap-14">
          <HotTopicsSection />

          {latestAssembly ? (
            <LatestAssemblySection assembly={latestAssembly} />
          ) : (
            <p className="py-12 text-center text-muted-foreground">
              定例会・臨時会はまだ登録されていません
            </p>
          )}

          {pastAssemblies.length > 0 && (
            <section className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-hirokawa-indigo">
                  過去の定例会
                </h2>
                <p className="text-xs font-medium text-mirai-text-subtle">
                  これまでに開催された定例会・臨時会
                </p>
              </div>
              <AssemblyList assemblies={pastAssemblies} />
            </section>
          )}

          <AboutThisSite />
        </div>
      </Container>
    </>
  );
}
