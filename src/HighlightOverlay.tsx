import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { COLORS } from './styles';

interface HighlightOverlayProps {
  target: HTMLElement | null;
  workflowId: string | null;
  workflowUrl: string | null;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function HighlightOverlay({ target, workflowId, workflowUrl }: HighlightOverlayProps) {
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

  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
  const modKey = isMac ? '\u2318' : 'Ctrl';

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
            top: -28,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              background: 'rgba(30, 30, 46, 0.85)',
              color: COLORS.textSecondary,
              fontSize: 10,
              padding: '2px 6px',
              borderRadius: 3,
              whiteSpace: 'nowrap',
            }}
          >
            {modKey}+Click to open
          </span>
          <span
            style={{
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
          </span>
        </div>
      )}
    </div>,
    document.body,
  );
}
