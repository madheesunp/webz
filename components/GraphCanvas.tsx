'use client';

import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Daft Punk' } },
  { id: '2', position: { x: 240, y: 120 }, data: { label: 'Justice' } },
  { id: '3', position: { x: -200, y: 140 }, data: { label: 'Kraftwerk' } },
];

const initialEdges: Edge[] = [
  { id: 'e3-1', source: '3', target: '1', label: 'influenced' },
  { id: 'e1-2', source: '1', target: '2', label: 'influenced' },
];

export default function GraphCanvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Drag from one node's handle to another to create an edge (built in).
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}
