#!/bin/sh
# Exit script if any command fails
set -e

# Build the application
npm run build

# Move to the build output directory
cd dist

# Initialize a new Git repository in the dist directory
git init

# Set the correct remote for the GitHub Pages branch
git remote add origin https://github.com/kevinmathewv/wellbePublic.git

# Checkout the gh-pages branch or create it if it doesn't exist
git checkout -B gh-pages

# Add and commit the changes
git add -A
git commit -m "Deploy to GitHub Pages"

# Force push the changes to the gh-pages branch
git push -f origin gh-pages

# Move back to the original directory
cd ..

# Print a message to indicate the deployment was successful
echo "Successfully deployed to GitHub Pages!"
