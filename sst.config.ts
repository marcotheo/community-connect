/// <reference path="./.sst/platform/config.d.ts" />
import { cloudflare_pages } from "./infra/cloudflare-pages";

export default $config({
  app(input) {
    return {
      name: "community-connect",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: process.env.PROFILE,
          region: process.env.AWS_REGION as any,
        },
        cloudflare: true,
      },
    };
  },
  async run() {
    const result = cloudflare_pages();

    return {
      name: result?.name,
      domain: result?.domains[0],
    };
  },
});
