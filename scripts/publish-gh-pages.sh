#!/bin/bash

# Stop on error
set -e

# Get current revision
rev=$(git rev-parse HEAD)
# Get the current origin URL
origin_url=$(git config remote.origin.url)

# Build everything
npm run build

# Prepare a temporary clone of the local repository
rm -rf gh-pages
mkdir gh-pages
pushd gh-pages &>/dev/null
git clone -b gh-pages ../ ./
# Default origin will be set to the local repository, so we need to set the origin again under different name
git remote add upstream ${origin_url}
# Pull latest changes
git pull --ff upstream gh-pages


# Start fresh
rm -rf *
# Add demo app files
cp -R ../dist/demo-app/* ./
cp index.html 404.html
# Workaround for files starting with underscore not showing up
touch .nojekyll


# All done - commit and push
git add -A .
git commit -m "Release github pages for ngx-slider ${rev}"
git push upstream gh-pages

popd &>/dev/null