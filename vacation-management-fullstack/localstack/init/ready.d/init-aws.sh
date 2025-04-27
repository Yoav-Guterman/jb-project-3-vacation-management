#!/bin/bash

echo "Starting S3 bucket initialization..."

# Create the bucket 
export AWS_ACCESS_KEY_ID=000000000000 AWS_SECRET_ACCESS_KEY=000000000000
awslocal s3 mb s3://il.co.johnbryce.yoavguterman

# Upload each image individually
echo "Uploading images to bucket..."
awslocal s3 cp /tmp/localstack-images/barcelona.jpg s3://il.co.johnbryce.yoavguterman/Barcelona.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/budapest.webp s3://il.co.johnbryce.yoavguterman/budapest.webp --acl public-read
awslocal s3 cp /tmp/localstack-images/hadera.jpg s3://il.co.johnbryce.yoavguterman/hadera.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/machu-picchu.jpg s3://il.co.johnbryce.yoavguterman/machu-picchu.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/New-York-City.jpg s3://il.co.johnbryce.yoavguterman/New-York-City.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/paris.jpg s3://il.co.johnbryce.yoavguterman/paris.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/santorini.jpeg s3://il.co.johnbryce.yoavguterman/santorini.jpeg --acl public-read
awslocal s3 cp /tmp/localstack-images/tokyo.webp s3://il.co.johnbryce.yoavguterman/tokyo.webp --acl public-read
awslocal s3 cp /tmp/localstack-images/Venice.jpg s3://il.co.johnbryce.yoavguterman/Venice.jpg --acl public-read

awslocal s3 cp /tmp/localstack-images/kyoto.jpg s3://il.co.johnbryce.yoavguterman/kyoto.jpg --acl public-read
awslocal s3 cp /tmp/localstack-images/bali.webp s3://il.co.johnbryce.yoavguterman/bali.webp --acl public-read
awslocal s3 cp /tmp/localstack-images/marrakech.jpg s3://il.co.johnbryce.yoavguterman/marrakech.jpg --acl public-read

# List bucket contents to verify
echo "Bucket contents:"
awslocal s3 ls s3://il.co.johnbryce.yoavguterman

echo "S3 bucket initialization complete!"