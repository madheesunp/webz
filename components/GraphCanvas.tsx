'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type Edge,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { WebNode, type WebNodeData } from './nodes/WebNode';
import { NodePanel } from './NodePanel';

// Registered once at module scope so the reference stays STABLE across renders.
// An inline object here would make React Flow re-mount every node each render.
const nodeTypes = { webNode: WebNode };

const initialNodes: Node[] = [
  { id: '1', type: 'webNode', position: { x: 0, y: 0 }, data: { label: 'Daft Punk' } },
  { id: '2', type: 'webNode', position: { x: 240, y: 120 }, data: { label: 'Justice' } },
  { id: '3', type: 'webNode', position: { x: -200, y: 140 }, data: { label: 'Kraftwerk' } },
];

const initialEdges: Edge[] = [
  { id: 'e3-1', source: '3', target: '1', label: 'influenced' },
  { id: 'e1-2', source: '1', target: '2', label: 'influenced' },
];

// How long the cursor must sit still over empty canvas before the hint shows.
const HINT_DELAY_MS = 2000;

// Inner component: lives UNDER <ReactFlowProvider>, so useReactFlow() is legal here.
function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { screenToFlowPosition } = useReactFlow();

  const selectedNode = nodes.find((n) => n.selected) ?? null;

  const updateSelectedData = (patch: Partial<WebNodeData>) => {
    setNodes((nds) =>
      nds.map((n) => (n.selected ? { ...n, data: { ...n.data, ...patch } } : n)),
    );
  };

  // Screen position of the "click to make new node!" hint, or null when hidden.
  const [hint, setHint] = useState<{ x: number; y: number } | null>(null);
  // Holds the pending idle timer so we can cancel it whenever the cursor moves.
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelHint = useCallback(() => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
    setHint(null);
  }, []);

  // Tidy up any pending timer if the component unmounts mid-countdown.
  useEffect(() => cancelHint, [cancelHint]);

  // Drag from one node's handle to another to create an edge.
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  // Click empty canvas to add a node at the cursor.
  const onPaneClick = useCallback(
    (event: React.MouseEvent) => {
      cancelHint();
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node = {
        id: crypto.randomUUID(),
        type: 'webNode',
        position,
        data: { label: 'New node' },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes, cancelHint],
  );

  // Show the hint once the cursor sits still over the empty pane for a moment.
  // Every move hides it and restarts the countdown, so it only appears when idle.
  const onPaneMouseMove = useCallback((event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    setHint(null); // no-op re-render when already null (React bails on ===)
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setHint({ x: clientX, y: clientY });
    }, HINT_DELAY_MS);
  }, []);

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onPaneMouseMove={onPaneMouseMove}
        onPaneMouseLeave={cancelHint}
        onNodeMouseEnter={cancelHint}
        onMoveStart={cancelHint}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      {selectedNode && (
        <NodePanel selectedNode={selectedNode} onChange={updateSelectedData} />
      )}

      {hint && (
        <div
          data-node-hint
          className="pointer-events-none fixed z-50 whitespace-nowrap rounded-md bg-zinc-900/90 px-2 py-1 text-xs text-white shadow-md"
          style={{
            left: hint.x + 14,
            top: hint.y + 14,
            animation: 'hint-fade-in 150ms ease-out',
          }}
        >
          click to make new node!
        </div>
      )}
    </div>
  );
}

// Outer component: provides the React Flow context. Keeps the default export stable
// so GraphEditor.tsx's dynamic import is unaffected.
export default function GraphCanvas() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
