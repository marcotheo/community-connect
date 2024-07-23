import * as path from "path";

export const frontend_edge = () => {
  const awsUsEast1 = new aws.Provider("USEast1", {
    region: "us-east-1",
    profile: process.env.PROFILE,
  });

  const role = new aws.iam.Role("EdgeLambdaRole", {
    assumeRolePolicy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            Service: ["lambda.amazonaws.com", "edgelambda.amazonaws.com"],
          },
          Action: "sts:AssumeRole",
        },
      ],
    }),
  });

  new aws.iam.RolePolicyAttachment("LambdaRoleAttachment", {
    role: role,
    policyArn: aws.iam.ManagedPolicies.AWSLambdaBasicExecutionRole,
  });

  // define the frontend source code path
  const rootDir = process.cwd();
  const dockerfileAbsolutePath = path.resolve(rootDir, "packages/frontend");

  const qwikLambda = new aws.lambda.Function(
    "QwikLambdaFunction",
    {
      role: role.arn,
      runtime: "nodejs20.x",
      memorySize: 128,
      timeout: 10,
      code: new $util.asset.AssetArchive({
        server: new $util.asset.FileArchive(`${dockerfileAbsolutePath}/server`),
        dist: new $util.asset.FileArchive(`${dockerfileAbsolutePath}/dist`),
      }),
      handler: "server/entry_aws-lambda.qwikApp",
      publish: true,
    },
    {
      provider: awsUsEast1,
    }
  );

  const lambdaFunctionUrl = new aws.lambda.FunctionUrl(
    "QwikLambdaUrl",
    {
      functionName: qwikLambda.name,
      authorizationType: "NONE",
    },
    {
      provider: awsUsEast1,
    }
  );

  const lambdaVersionArn = qwikLambda.arn.apply((lambdaArn) => {
    return qwikLambda.version.apply((version) => {
      return lambdaArn + ":" + version;
    });
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
        queryString: true,
        cookies: {
          forward: "all",
        },
      },
      lambdaFunctionAssociations: [
        {
          eventType: "origin-request",
          lambdaArn: lambdaVersionArn,
        },
      ],
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
