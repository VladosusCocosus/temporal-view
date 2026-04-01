import { useEffect } from 'react';
import type { WorkflowEntry } from './types';

const ATTR_WORKFLOW_ID = 'temporal-workflow-id';

export function usePageHoverDetection(
  isOpen: boolean,
  entries: WorkflowEntry[],
  onHover: (index: number | null) => void,
) {
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Skip events from inside the devtool panel itself
      if (target.closest('[data-temporal-devtools]')) return;

      const el = target.closest<HTMLElement>(`[${ATTR_WORKFLOW_ID}]`);
      if (!el) {
        onHover(null);
        return;
      }

      const index = entries.findIndex((entry) => entry.element === el);
      onHover(index >= 0 ? index : null);
    };

    document.addEventListener('mouseover', handleMouseOver, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
    };
  }, [isOpen, entries, onHover]);
}
