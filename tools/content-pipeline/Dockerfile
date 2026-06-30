# Hardened image for running the content pipeline in isolation.
#
# Why this exists: defense in depth. The model has no tools and never sees your
# secrets, so prompt injection's worst case here is bad text in a draft (caught
# by the PR review). The larger residual risk is a compromised npm dependency
# reaching your machine or keys. Running generation in a throwaway container with
# a read-only filesystem, dropped capabilities, and only the env you pass limits
# that blast radius.
#
# Note: for the AUTONOMOUS path you already get equivalent isolation for free.
# GitHub Actions runs each job in a fresh, throwaway VM with run-scoped secrets.
# This image is mainly for LOCAL runs, where your keys would otherwise sit on
# your shell.
#
# Build:
#   docker build -t raisedash-content-pipeline tools/content-pipeline
#
# Generate a draft in the sandbox (keys go to the container only; content/blog is
# the one writable mount; shipping/PR stays on your host where review happens):
#   docker run --rm \
#     --read-only --tmpfs /tmp --tmpfs /home/node/.cache \
#     --cap-drop ALL --security-opt no-new-privileges \
#     -e AWS_REGION=us-east-1 -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY \
#     -e FIRECRAWL_API_KEY \
#     -v "$PWD/content/blog:/repo/content/blog" \
#     -v "$PWD/tools/content-pipeline/.runs:/repo/tools/content-pipeline/.runs" \
#     raisedash-content-pipeline generate --topic "FMCSA new entrant safety audit"
#
# Then review the draft on your host and commit it yourself.

FROM node:22-slim

# Place the app so REPO_ROOT (three levels up from src/) resolves to /repo.
WORKDIR /repo/tools/content-pipeline

COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

COPY tsconfig.json ./
COPY src ./src

RUN mkdir -p /repo/content/blog /repo/tools/content-pipeline/.runs \
  && chown -R node:node /repo

USER node
ENTRYPOINT ["npx", "tsx", "src/cli.ts"]
CMD ["check"]
