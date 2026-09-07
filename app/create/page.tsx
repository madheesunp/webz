import GraphEditor from './GraphEditor';

// Server Component (route: /create). React Flow needs a parent with an
// explicit size, so we give it the full viewport height/width here.
export default function CreatePage() {
  return (
    <main className="h-screen w-screen">
      <GraphEditor />
    </main>
  );
}
