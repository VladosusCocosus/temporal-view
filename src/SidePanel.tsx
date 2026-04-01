import React, { useRef, useEffect, useCallback } from 'react';
import { COLORS, DIMENSIONS } from './styles';
import { WorkflowItem } from './WorkflowItem';
import type { WorkflowEntry } from './types';

interface SidePanelProps {
  isOpen: boolean;
  entries: WorkflowEntry[];
  baseUrl: string;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  onClose: () => void;
}

export function SidePanel({
  isOpen,
  entries,
  baseUrl,
  hoveredIndex,
  onHover,
  onClose,
}: SidePanelProps) {
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const setItemRef = useCallback((index: number, el: HTMLDivElement | null) => {
    if (el) {
      itemRefs.current.set(index, el);
    } else {
      itemRefs.current.delete(index);
    }
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const el = itemRefs.current.get(hoveredIndex);
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [hoveredIndex]);

  return (
    <div
      data-temporal-devtools
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: DIMENSIONS.panelWidth,
        height: '100vh',
        background: COLORS.panelBg,
        borderLeft: `1px solid ${COLORS.panelBorder}`,
        zIndex: 2147483647,
        transform: isOpen ? 'translateX(0)' : `translateX(${DIMENSIONS.panelWidth}px)`,
        transition: 'transform 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          height: DIMENSIONS.panelHeaderHeight,
          borderBottom: `1px solid ${COLORS.panelBorder}`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>
            Temporal Workflows
          </span>
          <span
            style={{
              fontSize: 11,
              background: COLORS.primary,
              color: COLORS.white,
              padding: '1px 6px',
              borderRadius: 10,
              fontWeight: 600,
            }}
          >
            {entries.length}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: COLORS.textSecondary,
            fontSize: 18,
            cursor: 'pointer',
            padding: '4px 8px',
            lineHeight: 1,
          }}
        >
          x
        </button>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {entries.length === 0 ? (
          <div
            style={{
              padding: 20,
              textAlign: 'center',
              color: COLORS.textSecondary,
              fontSize: 13,
            }}
          >
            No elements with temporal-workflow-id found on this page.
          </div>
        ) : (
          entries.map((entry, i) => (
            <div key={`${entry.workflowId}-${i}`} ref={(el) => setItemRef(i, el)}>
              <WorkflowItem
                entry={entry}
                baseUrl={baseUrl}
                isHovered={hoveredIndex === i}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(null)}
              />
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '8px 14px',
          borderTop: `1px solid ${COLORS.panelBorder}`,
          fontSize: 10,
          color: COLORS.textSecondary,
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        temporal-view
      </div>
    </div>
  );
}
