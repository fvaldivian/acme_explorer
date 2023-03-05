#!/bin/bash

#-------------------------------------------------------------------------------
#INSTALL DOCKER
#-------------------------------------------------------------------------------

# Set up the repository
# 1. Update the apt package index and install packages to allow apt to use a repository over HTTPS:
sudo apt-get update
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 2. Add Docker’s official GPG key:
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 3. Use the following command to set up the repository:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


# Install Docker Engine
# 1. Update the apt package index:
sudo apt-get update

# 2. Install Docker Engine, containerd, and Docker Compose.
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

#-------------------------------------------------------------------------------
#AWS CLI
#-------------------------------------------------------------------------------

# 1. Install
apt install -y unzip
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# 2. Read environment variables
. /home/ubuntu/.env.aws

# 3. Configure
aws configure set aws_access_key_id $AwsAccessKeyId
aws configure set aws_secret_access_key $AwsSecretAccessKey
aws configure set default.region $AwsDefaultRegion

# 4. Download private files
aws s3 cp s3://bucket-usevilla-do-2023-private/docker-compose.yml /home/ubuntu/

#-------------------------------------------------------------------------------
#DEPLOY APP ENVIRONMENTS
#-------------------------------------------------------------------------------

# 1. Introduce a delay not to overload the server(only in low resources servers)
sleep 30

# 2. Deploy production app
cd /home/ubuntu/ && docker compose -p "app-usevilla-do-2023-prod" --env-file /home/ubuntu/.env.prod up --build -d

# 3. Introduce a delay not to overload the server(only in low resources servers)
sleep 30

# 4. Deploy developement app
cd /home/ubuntu/ && docker compose -p "app-usevilla-do-2023-dev" --env-file /home/ubuntu/.env.dev up --build -d