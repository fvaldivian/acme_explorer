#!/bin/sh

# read environment variables
source ./.env

# upload script to s3, this one must be public
aws s3 cp ${PWD}/dockerhost-setup.sh s3://bucket-usevilla-do-2023-public/ --acl public-read >> logs/s3.log

# upload template to s3
aws s3 cp ${PWD}/cloudformation-stack-template.yml s3://bucket-usevilla-do-2023-public/ --acl public-read >> logs/s3.log

# upload docker-compose.yml to s3
aws s3 cp ${PWD}/docker-compose.yml s3://bucket-usevilla-do-2023-private/ >> logs/s3.log

# upload docker-compose.override.yml to s3
aws s3 cp ${PWD}/docker-compose.override.yml s3://bucket-usevilla-do-2023-private/ >> logs/s3.log

# upload firebase-credentials.json to s3
aws s3 cp ${PWD}/credentials/firebase-credentials.json s3://bucket-usevilla-do-2023-private/ >> logs/s3.log

# create stack
aws cloudformation create-stack --stack-name stack-usevilla-do-2023 \
--template-url https://bucket-usevilla-do-2023-public.s3.eu-south-2.amazonaws.com/cloudformation-stack-template.yml \
--parameters \
ParameterKey=ApiPortProd,ParameterValue=$ApiPortProd \
ParameterKey=ApiPortDev,ParameterValue=$ApiPortDev \
ParameterKey=MongoPortProd,ParameterValue=$MongoPortProd \
ParameterKey=MongoPortDev,ParameterValue=$MongoPortDev \
ParameterKey=AwsAccessKeyId,ParameterValue=$AwsAccessKeyId \
ParameterKey=AwsSecretAccessKey,ParameterValue=$AwsSecretAccessKey \
ParameterKey=AwsDefaultRegion,ParameterValue=$AwsDefaultRegion >> logs/aws-cli.log

#Waiting for dockerhost ip
DockerHostIp=""

while [ -z "$DockerHostIp" ]
do
    sh ./dockerhost-update-ip.sh >> logs/aws-cli.log
    clear
    printf "Waiting for dockerhost ip "
    for i in {0..3}
    do
        if [ $i -gt 0 ]; then
            printf "."
        fi
        sleep 1
    done
    
    # read environment variables
    source ./.env
done

clear
echo "Applications should soon be available at http://$DockerHostIp:$ApiPortProd/v1/actors and http://$DockerHostIp:$ApiPortDev/v1/actors"