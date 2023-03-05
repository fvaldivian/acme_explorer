#!/bin/sh

# read environment variables
source ./.env
# login into host
ssh -i credentials/aws-key-pair.pem ubuntu@$DockerHostIp