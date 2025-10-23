#!/bin/bash

# Publishing script for @tafa3ul/feedback-layer

echo "🚀 Publishing @tafa3ul/feedback-layer..."

# Check if logged into npm
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Please login to npm first: npm login"
    exit 1
fi

# Check if package name is available
echo "📦 Checking package availability..."
if npm view @tafa3ul/feedback-layer > /dev/null 2>&1; then
    echo "⚠️  Package @tafa3ul/feedback-layer already exists"
    read -p "Do you want to update the version? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📝 Updating version..."
        npm version patch
    else
        echo "❌ Publishing cancelled"
        exit 1
    fi
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Publish to npm
echo "📤 Publishing to npm..."
npm publish --access public

echo "✅ Successfully published @tafa3ul/feedback-layer!"
echo "📋 Package URL: https://www.npmjs.com/package/@tafa3ul/feedback-layer"
