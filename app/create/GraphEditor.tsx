'use client';

import dynamic from 'next/dynamic';

// React Flow measures the DOM, so we load it browser-only (ssr: false).
// ssr:false isn't allowed inside a Server Component, so this dynamic import
// lives here, in a Client Component, and the page (a Server Component)
// simply renders <GraphEditor />.
const GraphCanvas = dynamic(() => import('@/components/GraphCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-zinc-500">
      Loading canvas…
    </div>
  ),
});

export default function GraphEditor() {
  return <GraphCanvas />;
}
