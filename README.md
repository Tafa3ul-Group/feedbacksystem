# Nuxt Feedback Layer

A Nuxt layer that provides feedback widget components and functionality for collecting user feedback in your Nuxt applications.

## Features

- 🎯 **Multiple Feedback Types**: Like/Dislike buttons or Emoji rating system
- 🎨 **Beautiful Animations**: Smooth transitions using Motion-v
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🔧 **Easy Integration**: Simple composable-based API
- 💾 **PocketBase Integration**: Built-in support for PocketBase backend
- 🎛️ **Customizable**: Flexible configuration options

## Installation

### Using this layer in your Nuxt project

1. Install the layer as a dependency:

```bash
npm install nuxt-feedback-layer
# or
pnpm add nuxt-feedback-layer
# or
yarn add nuxt-feedback-layer
```

2. Add the layer to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  extends: ['nuxt-feedback-layer']
})
```

### Using from Git repository

Add to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  extends: ['github:Tafa3ul-Group/feedbacksystem']
})
```

## Usage

### Basic Usage

```vue
<template>
  <div>
    <h1>My Page</h1>
    <p>Some content...</p>
    
    <!-- Feedback Widget -->
    <FeedbackWidget
      :url="pocketbaseUrl"
      :token="projectToken"
      type="like_dislike"
    />
  </div>
</template>

<script setup>
const pocketbaseUrl = "https://your-pocketbase-instance.com"
const projectToken = "your-project-identifier"
</script>
```

### Emoji Rating System

```vue
<template>
  <FeedbackWidget
    :url="pocketbaseUrl"
    :token="projectToken"
    type="emojis"
  />
</template>
```

### Using the Composable Directly

```vue
<template>
  <div>
    <button @click="sendFeedback" :disabled="isSubmitting">
      {{ isSubmitting ? 'Sending...' : 'Send Feedback' }}
    </button>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
const { submitFeedback, isSubmitting, error } = useFeedback({
  url: 'https://your-pocketbase-instance.com',
  token: 'your-project-token',
  type: 'like_dislike'
})

const sendFeedback = async () => {
  await submitFeedback({
    comment: 'This page was helpful!',
    score: 1
  })
}
</script>
```

## Configuration

### FeedbackWidget Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `url` | `string` | ✅ | - | PocketBase instance URL |
| `token` | `string` | ✅ | - | Project identifier token |
| `type` | `'like_dislike' \| 'emojis'` | ❌ | `'like_dislike'` | Type of feedback widget |

### PocketBase Schema

Create a `feedback` collection in your PocketBase with the following fields:

```javascript
// Collection: feedback
{
  "path": "text",        // Page path where feedback was given
  "comment": "text",     // Optional user comment
  "browser": "text",     // User agent string
  "device": "text",      // User platform
  "product": "text",     // Project token
  "type": "text",        // Feedback type (like_dislike or emojis)
  "score": "number"      // Feedback score
}
```

## Development

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd feedbacksystem

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Testing the Layer

The layer includes example pages for testing:

- `/` - Basic demo
- `/test` - Test page with different configurations

## Dependencies

This layer includes:

- **Nuxt 3** - The framework
- **TailwindCSS** - For styling
- **Motion-v** - For animations
- **PocketBase** - For backend integration

These will be automatically available in your consuming project.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)
