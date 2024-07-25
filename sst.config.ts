/// <reference path="./.sst/platform/config.d.ts" />
import { images_cdn } from "./infra/images-cdn";
import { cloudflare_pages } from "./infra/cloudflare-pages";

export default $config({
  app(input) {
    return {
      name: "community-connect",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: process.env.AWS_PROFILE,
          region: process.env.AWS_REGION as any,
        },
        cloudflare: true,
      },
    };
  },
  async run() {
    let output = {};

    if (!process.env.APP_NAME) {
      console.error("must define APP_NAME env variable");
      return;
    }

    const cdnInfra = images_cdn();

    output = {
      ...cdnInfra,
    };

    if (
      process.env.NODE_ENV &&
      ["production", "preview"].includes(process.env.NODE_ENV)
    ) {
      const cloudflareResults = cloudflare_pages();

      output = {
        ...output,
        cloudflareResults,
      };
    }

    return output;
  },
});
