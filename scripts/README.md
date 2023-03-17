# Scripts

| Scripts               | Description                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| setup.sh              | This script is responsible to set up your localstack environment, creating the S3 bucket and DynamoDB table                   |
| publish-subgraph.sh   | This script is responsible to publish the GraphQL files in order to update the S3 bucket                                      |
| compose-supergraph.sh | This script is responsible to generate a new Supergraph file and store it on an S3 bucket according to existing GraphQL files |
