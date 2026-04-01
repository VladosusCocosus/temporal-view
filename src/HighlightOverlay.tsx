import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { COLORS } from './styles';

interface HighlightOverlayProps {
  target: HTMLElement | null;
  workflowId: string | null;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function HighlightOverlay({ target, workflowId }: HighlightOverlayProps) {
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (!target) {
      setRect(null);
      return;
    }

    const update = () => {
      const r = target.getBoundingClientRect();
      setRect({
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        width: r.width,
        height: r.height,
      });
    };

    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [target]);

  if (!rect || !target) return null;

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        background: COLORS.primaryLight,
        border: `2px solid ${COLORS.primary}`,
        borderRadius: 4,
        pointerEvents: 'none',
        zIndex: 2147483646,
        transition: 'all 0.15s ease',
      }}
    >
      {workflowId && (
        <div
          style={{
            position: 'absolute',
            top: -24,
            right: 0,
            background: COLORS.primary,
            color: COLORS.white,
            fontSize: 11,
            fontFamily: 'monospace',
            padding: '2px 6px',
            borderRadius: 3,
            whiteSpace: 'nowrap',
          }}
        >
          {workflowId}
        </div>
      )}
    </div>,
    document.body,
  );
}
