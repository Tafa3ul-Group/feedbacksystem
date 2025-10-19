# Nuxt Layer Configuration Guide

This document explains how to properly configure and use the Nuxt Feedback Layer.

## Layer Structure

```
nuxt-feedback-layer/
├── components/
│   └── FeedbackWidget.vue       # Main feedback widget component
├── composables/
│   └── useFeedback.ts           # Composable for feedback functionality
├── layouts/
│   └── default.vue              # Basic layout (optional)
├── pages/                       # Demo pages (not included in consuming apps)
│   ├── index.vue
│   └── test.vue
├── nuxt.config.ts               # Layer configuration
└── package.json                 # Layer package info
```

## How Layers Work

When you extend a layer in your Nuxt project:

1. **Components** are automatically available globally
2. **Composables** are auto-imported 
3. **Layouts** are merged with your existing layouts
4. **Pages** are NOT included (only for demo/development)
5. **Modules** are automatically installed

## Configuration Options

### In the layer (nuxt.config.ts)
```typescript
export default defineNuxtConfig({
  // Required modules for the layer
  modules: ['@nuxtjs/tailwindcss', 'motion-v/nuxt'],
  
  // Make components globally available
  components: [
    {
      path: '~/components',
      global: true
    }
  ],

  // Auto-import composables
  imports: {
    dirs: ['composables']
  }
})
```

### In consuming projects
```typescript
export default defineNuxtConfig({
  // Extend the layer
  extends: ['nuxt-feedback-layer'],
  
  // Your project's configuration
  modules: [
    // Additional modules if needed
  ]
})
```

## Components Available

### FeedbackWidget
```vue
<FeedbackWidget
  :url="pocketbaseUrl"
  :token="projectToken"
  :type="feedbackType"
/>
```

**Props:**
- `url` (string, required): PocketBase instance URL
- `token` (string, required): Project identifier
- `type` (string, optional): 'like_dislike' | 'emojis' (default: 'like_dislike')

## Composables Available

### useFeedback
```typescript
const { submitFeedback, isSubmitting, error } = useFeedback({
  url: 'https://your-pocketbase.com',
  token: 'your-project-token',
  type: 'like_dislike'
})
```

**Options:**
- `url` (string): PocketBase instance URL
- `token` (string): Project identifier
- `type` (string): 'like_dislike' | 'emojis'

**Returns:**
- `submitFeedback(data)`: Function to submit feedback
- `isSubmitting`: Reactive boolean for loading state
- `error`: Reactive error message

## PocketBase Schema

Create a collection named `feedback` with these fields:

```json
{
  "path": {
    "type": "text",
    "required": false
  },
  "comment": {
    "type": "text", 
    "required": false
  },
  "browser": {
    "type": "text",
    "required": false
  },
  "device": {
    "type": "text",
    "required": false
  },
  "product": {
    "type": "text",
    "required": true
  },
  "type": {
    "type": "text",
    "required": true
  },
  "score": {
    "type": "number",
    "required": false
  }
}
```

## Customization

### Styling
The components use TailwindCSS classes. You can:
1. Override styles in your consuming project
2. Use Tailwind's configuration to customize colors
3. Create custom variants of the components

### Custom Feedback Types
Extend the `useFeedback` composable to support additional feedback types:

```typescript
// In your project
const customFeedback = useFeedback({
  url: 'your-url',
  token: 'your-token',
  type: 'custom'
})
```

### Adding New Components
Create additional components in your project that use the `useFeedback` composable:

```vue
<template>
  <div class="custom-feedback">
    <!-- Your custom UI -->
    <button @click="sendFeedback">Send Custom Feedback</button>
  </div>
</template>

<script setup>
const { submitFeedback } = useFeedback({
  url: 'your-url',
  token: 'your-token'
})

const sendFeedback = () => {
  submitFeedback({
    score: 5,
    comment: 'Custom feedback'
  })
}
</script>
```

## Development

To develop the layer:

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start dev server: `pnpm dev`
4. Test at `http://localhost:3000`

## Publishing

To publish the layer to npm:

1. Update version in `package.json`
2. Build: `pnpm build`
3. Publish: `npm publish`

## Troubleshooting

### Component not found
- Ensure the layer is properly extended in `nuxt.config.ts`
- Check that components are globally registered

### Composable not available
- Verify auto-imports are working
- Check the composable syntax

### PocketBase connection issues
- Verify the URL and token are correct
- Check CORS settings in PocketBase
- Ensure the feedback collection exists

### Styling issues
- Ensure TailwindCSS is installed in your project
- Check for CSS conflicts
- Verify component styling is not overridden