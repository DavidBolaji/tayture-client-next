# scripts/update-version.sh
GIT_TAG=$(git describe --tags 2>/dev/null || echo "v0.0.1")
echo "NEXT_PUBLIC_APP_VERSION=$GIT_TAG" > .env.production