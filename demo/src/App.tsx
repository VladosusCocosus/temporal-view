import React from 'react';
import { TemporalDevtools } from 'temporal-view';

const EMAILS = [
  {
    id: 1,
    from: 'alice@acme.com',
    subject: 'Order confirmation #1042',
    preview: 'Your order has been placed and is being processed...',
    date: 'Mar 31, 2026',
    workflowId: 'order-confirmation-alice-1042',
    sendWorkflowId: 'send-email-order-confirm-alice-1042',
  },
  {
    id: 2,
    from: 'billing@stripe.com',
    subject: 'Payment receipt for invoice INV-2026-0389',
    preview: 'Thank you for your payment. Here is your receipt...',
    date: 'Mar 30, 2026',
    workflowId: 'payment-processing-inv-2026-0389',
    sendWorkflowId: 'send-email-payment-receipt-inv-0389',
  },
  {
    id: 3,
    from: 'noreply@github.com',
    subject: '[temporal-view] New issue: Overlay flickers on scroll',
    preview: 'A new issue has been opened in temporal-view...',
    date: 'Mar 29, 2026',
    workflowId: 'github-notification-issue-47',
    sendWorkflowId: 'send-email-github-notif-issue-47',
  },
  {
    id: 4,
    from: 'team@vercel.com',
    subject: 'Deployment succeeded: temporal-view-demo',
    preview: 'Your project temporal-view-demo has been deployed to production...',
    date: 'Mar 28, 2026',
    workflowId: 'deploy-temporal-view-demo-prod-88',
    sendWorkflowId: 'send-email-deploy-success-prod-88',
  },
  {
    id: 5,
    from: 'security@company.com',
    subject: 'Monthly security audit complete',
    preview: 'The automated security scan for March has completed with 0 critical...',
    date: 'Mar 27, 2026',
    workflowId: 'security-audit-march-2026',
    sendWorkflowId: 'send-email-security-audit-mar-2026',
  },
  {
    id: 6,
    from: 'hr@company.com',
    subject: 'PTO request approved',
    preview: 'Your time-off request for April 14-18 has been approved by your manager...',
    date: 'Mar 26, 2026',
    workflowId: 'pto-approval-user-512-apr',
    sendWorkflowId: 'send-email-pto-approved-user-512',
  },
  {
    id: 7,
    from: 'alerts@datadog.com',
    subject: '[Resolved] High latency on /api/workflows',
    preview: 'The alert for high p99 latency on /api/workflows has been resolved...',
    date: 'Mar 25, 2026',
    workflowId: 'alert-resolution-latency-api-workflows',
    sendWorkflowId: 'send-email-alert-resolved-latency',
  },
  {
    id: 8,
    from: 'onboarding@temporal.io',
    subject: 'Welcome to Temporal Cloud!',
    preview: 'Your Temporal Cloud namespace is ready. Get started with our quickstart...',
    date: 'Mar 24, 2026',
    workflowId: 'user-onboarding-temporal-cloud-9281',
    sendWorkflowId: 'send-email-onboarding-temporal-9281',
  },
  {
    id: 9,
    from: 'ci@buildkite.com',
    subject: 'Build #3847 passed on main',
    preview: 'All 142 tests passed. Coverage: 94.2%. Build time: 3m 12s...',
    date: 'Mar 23, 2026',
    workflowId: 'ci-pipeline-main-build-3847',
    sendWorkflowId: 'send-email-ci-passed-build-3847',
  },
  {
    id: 10,
    from: 'digest@linear.app',
    subject: 'Weekly digest: 12 issues closed, 3 new',
    preview: 'Here is your weekly summary for the temporal-view project...',
    date: 'Mar 22, 2026',
    workflowId: 'weekly-digest-linear-wk13-2026',
    sendWorkflowId: 'send-email-digest-linear-wk13-2026',
  },
];

export function App() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ background: '#1a1a2e', color: '#fff', padding: '20px 32px' }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>Inbox</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.7 }}>
          Each email is backed by a Temporal workflow. Open the devtool (bottom-right) to explore.
        </p>
      </header>

      <main style={{ maxWidth: 720, margin: '24px auto', background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {EMAILS.map((email) => (
          <div
            key={email.id}
            temporal-workflow-id={email.workflowId}
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f9f9ff'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: '#1a1a2e' }}>{email.from}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  temporal-workflow-id={email.sendWorkflowId}
                  style={{ fontSize: 11, color: '#3a8', background: '#e8f8f0', padding: '2px 8px', borderRadius: 10, fontWeight: 500 }}
                >
                  Sent
                </span>
                <span style={{ fontSize: 12, color: '#999' }}>{email.date}</span>
              </div>
            </div>
            <div style={{ fontSize: 14, color: '#333', marginTop: 4 }}>{email.subject}</div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {email.preview}
            </div>
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 6, fontFamily: 'monospace' }}>
              workflow: {email.workflowId}
            </div>
          </div>
        ))}
      </main>

      <TemporalDevtools baseUrl="https://cloud.temporal.io" namespace="default" />
    </div>
  );
}
