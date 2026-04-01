import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useWorkflowScanner } from './useWorkflowScanner';
import { usePageHoverDetection } from './usePageHoverDetection';
import { FloatingToggle } from './FloatingToggle';
import { SidePanel } from './SidePanel';
import { HighlightOverlay } from './HighlightOverlay';
import type { TemporalDevtoolsProps, PanelSide } from './types';

export function TemporalDevtools({
  baseUrl,
  namespace = 'default',
  position = 'bottom-right',
  defaultSide = 'right',
}: TemporalDevtoolsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [side, setSide] = useState<PanelSide>(defaultSide);
  const entries = useWorkflowScanner(namespace);

  const handlePageHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  usePageHoverDetection(isOpen, entries, baseUrl, handlePageHover);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const hoveredEntry = hoveredIndex !== null ? entries[hoveredIndex] ?? null : null;

  return createPortal(
    <>
      <FloatingToggle
        count={entries.length}
        isOpen={isOpen}
        position={position}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setHoveredIndex(null);
        }}
      />
      <SidePanel
        isOpen={isOpen}
        entries={entries}
        baseUrl={baseUrl}
        hoveredIndex={hoveredIndex}
        onHover={setHoveredIndex}
        side={side}
        onToggleSide={() => setSide((s) => (s === 'right' ? 'left' : 'right'))}
        onClose={() => {
          setIsOpen(false);
          setHoveredIndex(null);
        }}
      />
      <HighlightOverlay
        target={hoveredEntry?.element ?? null}
        workflowId={hoveredEntry?.workflowId ?? null}
        workflowUrl={
          hoveredEntry
            ? `${baseUrl}/namespaces/${encodeURIComponent(hoveredEntry.namespace)}/workflows/${encodeURIComponent(hoveredEntry.workflowId)}`
            : null
        }
      />
    </>,
    document.body,
  );
}
