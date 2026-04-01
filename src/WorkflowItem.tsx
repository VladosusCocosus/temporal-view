import React from 'react';
import { COLORS } from './styles';
import type { WorkflowEntry } from './types';

interface WorkflowItemProps {
  entry: WorkflowEntry;
  baseUrl: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function WorkflowItem({
  entry,
  baseUrl,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: WorkflowItemProps) {
  const url = `${baseUrl}/namespaces/${encodeURIComponent(entry.namespace)}/workflows/${encodeURIComponent(entry.workflowId)}`;

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      style={{
        padding: '10px 14px',
        cursor: 'pointer',
        borderBottom: `1px solid ${COLORS.panelBorder}`,
        background: isHovered ? COLORS.itemHover : 'transparent',
        transition: 'background 0.1s ease',
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 13,
          color: COLORS.text,
          wordBreak: 'break-all',
        }}
      >
        {entry.workflowId}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <span style={{ fontSize: 11, color: COLORS.textSecondary }}>
          {entry.namespace}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              entry.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            style={{
              background: 'none',
              border: `1px solid ${COLORS.primary}`,
              color: COLORS.primary,
              fontSize: 11,
              padding: '1px 6px',
              borderRadius: 3,
              cursor: 'pointer',
            }}
          >
            Show
          </button>
          <span style={{ fontSize: 11, color: COLORS.primary }}>
            Open in Temporal →
          </span>
        </span>
      </div>
    </div>
  );
}
