import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';

export type WebNodeData = {
  label?: string;
  description?: string;
};

const nodeTheme = {
  size: 96, // diameter in px (circle)
  handleOffset: 6, // px the connector dots sit outside the circle
  background: '#1e96fc',
  textColor: '#ffffff',
  borderWidth: 0, // px — set > 0 to show a border
  borderColor: '#e4e4e7',
  paddingX: 12,
  paddingY: 12,
  fontSize: 14,
  fontWeight: 700,
  fontFamily: '"Lucida Console", "Courier New", monospace',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  selected: {
    ringColor: '#ff24c1',
    ringWidth: 2, // px
  },
} as const;

const deleteButtonClass =
  'nodrag absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center ' +
  'rounded-full border border-zinc-300 bg-white text-xs leading-none text-zinc-500 ' +
  'shadow-sm opacity-0 transition-opacity hover:bg-red-500 hover:text-white group-hover:opacity-100';

export function WebNode({ id, data, selected }: NodeProps) {
  const label = (data as WebNodeData).label ?? '';
  const { deleteElements } = useReactFlow();

  return (
    // Outer wrapper: sized to the circle, but no overflow clipping, so the
    // handles and delete button can sit outside the circle.
    <div
      className="group relative"
      style={{ width: nodeTheme.size, height: nodeTheme.size }}
    >
      <Handle type="target" position={Position.Top} style={{ top: -nodeTheme.handleOffset }} />

      {/* Inner circle: the visible node; clips its own label. */}
      <div
        className="flex h-full w-full items-center justify-center text-center"
        style={{
          borderRadius: '50%',
          overflow: 'hidden',
          background: nodeTheme.background,
          color: nodeTheme.textColor,
          border: `${nodeTheme.borderWidth}px solid ${nodeTheme.borderColor}`,
          padding: `${nodeTheme.paddingY}px ${nodeTheme.paddingX}px`,
          fontSize: nodeTheme.fontSize,
          fontWeight: nodeTheme.fontWeight,
          fontFamily: nodeTheme.fontFamily,
          boxShadow: selected
            ? `${nodeTheme.boxShadow}, 0 0 0 ${nodeTheme.selected.ringWidth}px ${nodeTheme.selected.ringColor}`
            : nodeTheme.boxShadow,
        }}
      >
        <span style={{ wordBreak: 'break-word' }}>{label}</span>
      </div>

      <Handle type="source" position={Position.Bottom} style={{ bottom: -nodeTheme.handleOffset }} />

      <button
        type="button"
        data-delete-node
        aria-label="Delete node"
        className={deleteButtonClass}
        onClick={(event) => {
          event.stopPropagation();
          deleteElements({ nodes: [{ id }] });
        }}
      >
        ×
      </button>
    </div>
  );
}
