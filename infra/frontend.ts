import * as path from "path";

export const frontend = () => {
  const role = new aws.iam.Role("LambdaRole", {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
      Service: "lambda.amazonaws.com",
    }),
  });

  new aws.iam.RolePolicyAttachment("LambdaRoleAttachment", {
    role: role,
    policyArn: aws.iam.ManagedPolicies.AWSLambdaBasicExecutionRole,
  });

  // define the frontend source code path
  const rootDir = process.cwd();
  const dockerfileAbsolutePath = path.resolve(rootDir, "packages/frontend");

  const qwikLambda = new aws.lambda.Function("QwikLambdaFunction", {
    role: role.arn,
    runtime: "nodejs20.x",
    memorySize: 128,
    timeout: 10,
    code: new $util.asset.AssetArchive({
      server: new $util.asset.FileArchive(`${dockerfileAbsolutePath}/server`),
      dist: new $util.asset.FileArchive(`${dockerfileAbsolutePath}/dist`),
    }),
    handler: "server/entry_aws-lambda.qwikApp",
  });

  const lambdaFunctionUrl = new aws.lambda.FunctionUrl("QwikLambdaUrl", {
    functionName: qwikLambda.name,
    authorizationType: "NONE",
  });

  // Extract domain name from the Lambda function URL
  const lambdaFunctionUrlDomain = lambdaFunctionUrl.functionUrl.apply((url) => {
    const match = url.match(/^https?:\/\/([^/]+)/);
    return match ? match[1] : url;
  });

  // Create CloudFront Distribution
  const distribution = new aws.cloudfront.Distribution("MyDistribution", {
    origins: [
      {
        originId: "LambdaOrigin",
        domainName: lambdaFunctionUrlDomain,
        customOriginConfig: {
          httpPort: 80,
          httpsPort: 443,
          originProtocolPolicy: "https-only",
          originSslProtocols: ["TLSv1.2"],
        },
      },
    ],
    enabled: true,
    defaultCacheBehavior: {
      targetOriginId: "LambdaOrigin",
      viewerProtocolPolicy: "redirect-to-https",
      allowedMethods: ["GET", "HEAD", "OPTIONS"],
      cachedMethods: ["GET", "HEAD", "OPTIONS"],
      forwardedValues: {
        queryString: false,
        cookies: {
          forward: "none",
        },
      },
      compress: true,
    },
    priceClass: "PriceClass_100",
    restrictions: {
      geoRestriction: {
        restrictionType: "none",
      },
    },
    viewerCertificate: {
      cloudfrontDefaultCertificate: true,
    },
  });

  return {
    distributionName: distribution.domainName,
  };
};
