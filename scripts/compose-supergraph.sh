#!/bin/bash

environment="dev"
bucketName="schema-registry";
dynamodbTableName="SchemaRegistry";
timestamp=$(date +%s)
subgraphDir="$environment/subgraphs/"
supergraphDir="$environment/supergraph/"$timestamp"/supergraph.graphql";
list=$(awslocal s3api list-objects --bucket $bucketName --delimiter / --prefix $subgraphDir --query 'reverse(sort_by(CommonPrefixes, &Prefix))[:1].Prefix' --max-items 1 --output text)

for file in $list
do
    files=$(awslocal s3api list-objects --bucket $bucketName --prefix $file --query 'Contents[?ends_with(Key, `".graphql"`) == `true`].Key' --output text)
    for i in $files
    do
        echo $i;
        fileDir=s3://$bucketName"/"$i;
        awslocal s3 cp $fileDir ./scripts/subgraphs;
    done
    
done

rover supergraph compose -o ./scripts/supergraph/supergraph.graphql --config ./scripts/supergraph/supergraph.yml

awslocal s3 cp ./scripts/supergraph/supergraph.graphql s3://$bucketName/$supergraphDir;

awslocal dynamodb put-item \
  --table-name $dynamodbTableName \
  --item '{"FileName": {"S": "'$supergraphDir'"}, "CreatedAt": {"N": "'$timestamp'"}, "IsAvailable": {"S": "OK"}}'

echo "Finished!";
