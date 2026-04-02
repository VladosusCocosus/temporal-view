# temporal-view 
[![Build](https://github.com/VladosusCocosus/temporal-view/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/VladosusCocosus/temporal-view/actions/workflows/ci.yml) [![Publish to npm](https://github.com/VladosusCocosus/temporal-view/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/VladosusCocosus/temporal-view/actions/workflows/publish.yml)


React devtool for visualizing [Temporal](https://temporal.io) workflows on the page. Add `temporal-workflow-id` attributes to your DOM elements, and this package provides a floating panel that lists them, highlights on hover, and links to the Temporal UI on click.

## Install

```bash
npm install temporal-view
```

## Usage

```tsx
import { TemporalDevtools } from 'temporal-view';

function App() {
  return (
    <>
      <div temporal-workflow-id="order-processing-123">Order #123</div>
      <div temporal-workflow-id="payment-flow-456" temporal-namespace="payments">
        Payment #456
      </div>

      <TemporalDevtools
        baseUrl="http://localhost:8233"
        namespace="default"
      />
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `baseUrl` | `string` | *required* | Temporal UI base URL |
| `namespace` | `string` | `"default"` | Default Temporal namespace |
| `position` | `"bottom-right" \| "bottom-left"` | `"bottom-right"` | Toggle button position |

## HTML Attributes

| Attribute | Description |
|-----------|-------------|
| `temporal-workflow-id` | Workflow ID to display in the panel |
| `temporal-namespace` | Override the default namespace for this element |

## Features

- Floating toggle button with workflow count badge
- Side panel listing all detected workflows
- Hover highlighting with overlay on the corresponding DOM element
- Click to open workflow in Temporal UI
- Auto-detects DOM changes via MutationObserver
- Disabled in production (`NODE_ENV=production`)

## License

ISC
