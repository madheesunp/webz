import { type Node } from '@xyflow/react';
import { type WebNodeData } from './nodes/WebNode';

// Cosmetic knobs for the edit panel. Numbers are pixels.
const panelTheme = {
  width: 256,
  offset: 16, // distance from the canvas top-left corner
  background: '#1e96fc',
  borderColor: '#e4e4e7',
  borderWidth: 1,
  borderRadius: 0,
  padding: 16,
  gap: 12, // space between fields
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  fontFamily: '"Lucida Console", "Courier New", monospace',
  label: {
    color: '#eee',
    fontSize: 24,
    fontWeight: 1000,
    fontStyle: 'normal',
  },
  input: {
    background: '#ffffff',
    color: '#111111',
    borderColor: '#ff24c1',
    borderWidth: 2,
    borderRadius: 0, // the box "shape"; bump up for pill-ish corners
    paddingX: 8,
    paddingY: 4,
    fontSize: 14,
    fontWeight: 600,
    fontStyle: 'normal',
  },
};

const labelStyle = {
  color: panelTheme.label.color,
  fontSize: panelTheme.label.fontSize,
  fontWeight: panelTheme.label.fontWeight,
  fontStyle: panelTheme.label.fontStyle,
};

const inputStyle = {
  background: panelTheme.input.background,
  color: panelTheme.input.color,
  border: `${panelTheme.input.borderWidth}px solid ${panelTheme.input.borderColor}`,
  borderRadius: panelTheme.input.borderRadius,
  padding: `${panelTheme.input.paddingY}px ${panelTheme.input.paddingX}px`,
  fontSize: panelTheme.input.fontSize,
  fontWeight: panelTheme.input.fontWeight,
  fontStyle: panelTheme.input.fontStyle,
  fontFamily: 'inherit', // pick up the panel's fontFamily instead of the browser default
};

type NodePanelProps = {
  selectedNode: Node;
  onChange: (patch: Partial<WebNodeData>) => void;
};

export function NodePanel({ selectedNode, onChange }: NodePanelProps) {
  const data = selectedNode.data as WebNodeData;

  return (
    <aside
      className="absolute"
      style={{
        left: panelTheme.offset,
        top: panelTheme.offset,
        zIndex: 10,
        width: panelTheme.width,
        background: panelTheme.background,
        border: `${panelTheme.borderWidth}px solid ${panelTheme.borderColor}`,
        borderRadius: panelTheme.borderRadius,
        padding: panelTheme.padding,
        boxShadow: panelTheme.boxShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: panelTheme.gap,
        fontFamily: panelTheme.fontFamily,
        animation: 'panel-in 150ms ease-out',
      }}
    >
      <label className="block">
        <span className="mb-1 block" style={labelStyle}>
          Label
        </span>
        <input
          className="w-full outline-none focus:ring-2 focus:ring-blue-500"
          style={inputStyle}
          value={data.label ?? ''}
          onChange={(event) => onChange({ label: event.target.value })}
        />
      </label>

      <label className="block">
        <span className="mb-1 block" style={labelStyle}>
          Description
        </span>
        <textarea
          rows={3}
          className="w-full resize-none outline-none focus:ring-2 focus:ring-blue-500"
          style={inputStyle}
          value={data.description ?? ''}
          onChange={(event) => onChange({ description: event.target.value })}
        />
      </label>
    </aside>
  );
}
