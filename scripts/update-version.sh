# scripts/update-version.sh
GIT_TAG=$(git describe --tags)
echo "NEXT_PUBLIC_APP_VERSION=$GIT_TAG" > .env.production