#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Sync with S3 bucket
echo "Syncing with S3..."
aws s3 sync build/ s3://upgrad-eshop --delete

# Invalidate CloudFront cache
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"