import React from 'react';
import { COLORS, DIMENSIONS } from './styles';

interface FloatingToggleProps {
  count: number;
  isOpen: boolean;
  position: 'bottom-right' | 'bottom-left';
  onClick: () => void;
}

export function FloatingToggle({ count, isOpen, position, onClick }: FloatingToggleProps) {
  const positionStyle =
    position === 'bottom-right'
      ? { right: DIMENSIONS.toggleOffset, left: undefined as undefined }
      : { left: DIMENSIONS.toggleOffset, right: undefined as undefined };

  return (
    <button
      data-temporal-devtools
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: DIMENSIONS.toggleOffset,
        ...positionStyle,
        width: DIMENSIONS.toggleSize,
        height: DIMENSIONS.toggleSize,
        borderRadius: '50%',
        background: isOpen ? COLORS.primary : COLORS.panelBg,
        color: COLORS.white,
        border: `2px solid ${COLORS.primary}`,
        cursor: 'pointer',
        zIndex: 2147483647,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 700,
        fontFamily: 'monospace',
        transition: 'background 0.15s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      T
      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            background: COLORS.badge,
            color: COLORS.white,
            fontSize: 10,
            fontWeight: 700,
            width: 18,
            height: 18,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
