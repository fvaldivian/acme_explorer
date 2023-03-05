#!/bin/sh

#get machine ip
my_array=( $( aws ec2 describe-instances --query Reservations[].Instances[].PublicIpAddress --filters Name=tag:Name,Values=*stack-usevilla-do-2023-ubuntu-instance ))

#get exctly the ip
DockerHostIp=${my_array[1]}

#update config file
sed -i "s/DockerHostIp.*/DockerHostIp=$DockerHostIp/" .env