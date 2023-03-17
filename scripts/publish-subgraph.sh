#!/bin/bash

environment="dev";
bucketName="s3://schema-registry";
timestamp=$(date +%s)
dir="./";
files=$(find $dir -name "*.graphql" -not -path "*/node_modules/*" -not -path "*/scripts/*" -not -name "supergraph.graphql");

for i in $files
do
    fileName=$(echo $i | cut -d '/' -f 9)
    fileDir=$bucketName"/$environment/subgraphs/"$timestamp"/"$fileName
    awslocal s3 cp $i $fileDir;
done

echo "Finished!";
