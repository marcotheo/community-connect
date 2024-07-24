export const images_cdn = () => {
  const bucket = new aws.s3.Bucket("AssetsBucket", {
    acl: "private",
  });

  // Create a CloudFront Origin Access Identity
  const oai = new aws.cloudfront.OriginAccessIdentity(
    "AssetsOriginIdentity",
    {}
  );

  // Configure the S3 bucket policy to allow CloudFront to read the objects
  new aws.s3.BucketPolicy("AssetsBucketPolicy", {
    bucket: bucket.bucket,
    policy: $util
      .all([bucket.bucket, oai.s3CanonicalUserId])
      .apply(([bucketName, canonicalUserId]) =>
        JSON.stringify({
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Principal: {
                CanonicalUser: canonicalUserId,
              },
              Action: "s3:GetObject",
              Resource: `arn:aws:s3:::${bucketName}/*`,
            },
          ],
        })
      ),
  });

  // Create a CloudFront distribution
  const distribution = new aws.cloudfront.Distribution(
    "AssetsBucketDistribution",
    {
      enabled: true,
      origins: [
        {
          domainName: bucket.bucketRegionalDomainName,
          originId: bucket.arn,
          s3OriginConfig: {
            originAccessIdentity: oai.cloudfrontAccessIdentityPath,
          },
        },
      ],
      defaultCacheBehavior: {
        targetOriginId: bucket.arn,
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: ["GET", "HEAD"],
        cachedMethods: ["GET", "HEAD"],
        forwardedValues: {
          queryString: false,
          cookies: {
            forward: "none",
          },
        },
        defaultTtl: 3600,
        maxTtl: 86400,
        minTtl: 0,
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
    }
  );

  return {
    assetsBucket: bucket.bucket,
    distribution: distribution.domainName,
  };
};
