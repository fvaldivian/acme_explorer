#!/bin/sh

## delete stack
aws cloudformation delete-stack --stack-name stack-usevilla-do-2023 >> logs/aws-cli.log

#update config file
DockerHostIp=""
sed -i "s/DockerHostIp.*/DockerHostIp=$DockerHostIp/" .env