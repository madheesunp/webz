import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';

// The shape of a Webz node's `data`. React Flow stores arbitrary data per node;
// this is our app-specific contract for what lives in there.
export type WebNodeData = {
  label?: string;
};


const nodeTheme = {
  background: '#1e96fc',
  textColor: '#ffffff',
  borderWidth: 0, // px — set > 0 to show a border
  borderColor: '#e4e4e7',
  borderRadius: 0, // px
  paddingY: 8, // px
  paddingX: 16, // px
  fontSize: 14, // px
  fontWeight: 700,
  fontFamily: '"Lucida Console", "Courier New", monospace',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',

  selected: {
    outlineColor: '#ff24c1',
    outlineWidth: 1, // px
    outlineOffset: 1, // px
  },
} as const;


const deleteButtonClass =
  'nodrag absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center ' +
  'rounded-full border border-zinc-300 bg-white text-xs leading-none text-zinc-500 ' +
  'shadow-sm opacity-0 transition-opacity hover:bg-red-500 hover:text-white group-hover:opacity-100';

/**
 * A custom Webz node.
 *
 * A custom node MUST render its own <Handle>s or edges can't connect/render.
 * All the tunable styling lives in `nodeTheme` above; the JSX just applies it.
 */
export function WebNode({ id, data, selected }: NodeProps) {
  const label = (data as WebNodeData).label ?? '';


  const { deleteElements } = useReactFlow();

  return (
    <div
      className="group relative transition"
      style={{
        background: nodeTheme.background,
        color: nodeTheme.textColor,
        border: `${nodeTheme.borderWidth}px solid ${nodeTheme.borderColor}`,
        borderRadius: nodeTheme.borderRadius,
        padding: `${nodeTheme.paddingY}px ${nodeTheme.paddingX}px`,
        fontSize: nodeTheme.fontSize,
        fontWeight: nodeTheme.fontWeight,
        fontFamily: nodeTheme.fontFamily,
        boxShadow: nodeTheme.boxShadow,
        outline: selected
          ? `${nodeTheme.selected.outlineWidth}px solid ${nodeTheme.selected.outlineColor}`
          : undefined,
        outlineOffset: selected ? nodeTheme.selected.outlineOffset : undefined,
      }}
    >
      {/* Incoming edges attach here (top). */}
      <Handle type="target" position={Position.Top} />

      <span>{label}</span>

      {/* Drag from here (bottom) to another node to create an edge. */}
      <Handle type="source" position={Position.Bottom} />

      {/* Hover-reveal delete button (see deleteButtonClass above). */}
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
