import { useEffect } from 'react';
import type { WorkflowEntry } from './types';

const ATTR_WORKFLOW_ID = 'temporal-workflow-id';

export function usePageHoverDetection(
  isOpen: boolean,
  entries: WorkflowEntry[],
  baseUrl: string,
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
      if (!el) return; // Don't clear — keep last hovered sticky

      const index = entries.findIndex((entry) => entry.element === el);
      if (index >= 0) {
        onHover(index);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-temporal-devtools]')) return;

      const el = target.closest<HTMLElement>(`[${ATTR_WORKFLOW_ID}]`);
      if (!el) return;

      const entry = entries.find((entry) => entry.element === el);
      if (!entry) return;

      // Cmd/Ctrl+Click to open workflow in Temporal
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        const url = `${baseUrl}/namespaces/${encodeURIComponent(entry.namespace)}/workflows/${encodeURIComponent(entry.workflowId)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    };

    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('click', handleClick, true);
    };
  }, [isOpen, entries, baseUrl, onHover]);
}
