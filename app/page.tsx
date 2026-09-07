import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">Webz</h1>
      <Link href="/create" className="text-blue-600 underline">
        Create a graph →
      </Link>
    </main>
  );
}
