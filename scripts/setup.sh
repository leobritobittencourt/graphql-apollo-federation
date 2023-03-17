#!/bin/bash
awslocal s3api create-bucket \
  --acl private \
  --bucket schema-registry

awslocal dynamodb create-table \
  --table-name SchemaRegistry \
  --attribute-definitions AttributeName=FileName,AttributeType=S AttributeName=CreatedAt,AttributeType=N AttributeName=IsAvailable,AttributeType=S \
  --key-schema AttributeName=FileName,KeyType=HASH AttributeName=CreatedAt,KeyType=RANGE \
  --global-secondary-indexes IndexName=CreatedAtIndex,KeySchema=["{AttributeName=CreatedAt,KeyType=HASH}","{AttributeName=FileName,KeyType=RANGE}"],Projection="{ProjectionType=ALL}",ProvisionedThroughput="{ReadCapacityUnits=5,WriteCapacityUnits=5}" \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

