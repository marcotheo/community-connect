# QWIK SST DEPLOYMENTS

main entry file is sst.config.ts

### Deployments (infra folder)

- cloudflare pages (default)
- frontend lambda

### Root environment variables

##### BASIC ENV

- AWS_PROFILE=value
- AWS_REGION=value
- APP_NAME=value

##### CLOUDFLARE

- CLOUDFLARE_DEFAULT_ACCOUNT_ID=value
- CLOUDFLARE_API_TOKEN=value
- GITHUB_OWNER=value
- GITHUB_REPO_NAME=value
- GITHUB_BRANCH=value

### Frontend env variables

create .env & .dev.vars (for cloudflare pages local dev)

- CDN_URL = cloudfront url refer to sst outputs (created by /infra/images-cdn.ts)
