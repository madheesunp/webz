import { type Node } from '@xyflow/react';
import { type WebNodeData } from './nodes/WebNode';

type NodePanelProps = {
  selectedNode: Node;
  onLabelChange: (label: string) => void;
};

export function NodePanel({ selectedNode, onLabelChange }: NodePanelProps) {
  return (
    <aside
      className="absolute left-4 top-4 z-10 w-64 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg"
      style={{ animation: 'panel-in 150ms ease-out' }}
    >
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-zinc-700">Label</span>
        <input
          className="w-full rounded border border-zinc-300 px-2 py-1 text-sm outline-none focus:border-blue-500"
          value={(selectedNode.data as WebNodeData).label ?? ''}
          onChange={(event) => onLabelChange(event.target.value)}
        />
      </label>
    </aside>
  );
}
