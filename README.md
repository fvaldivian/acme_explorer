# acme_explorer

## 0 - Repository - Swagger
    
    https://github.com/fvaldivian/acme_explorer
    http://localhost:8080/api-docs/

## 1 - Set up .env files regarding .env.example file.

    cp .env.example .env.dev

## 2 - Start application with Docker.

    docker-compose --env-file .env.dev up --build 

    docker-compose --env-file .env.dev down 

## 3 - In terminal generate data: 

    node .\massiveLoad\0-generate.js

This will create these files, please check they are not empty:

    ./massiveLoad/1-actors.json
    ./massiveLoad/2-trips.json
    ./massiveLoad/3-applications.json
    ./massiveLoad/4-finders.json


# Mocha and Chai Tests

## 1 - In a terminal execute the command.

    npm run test

# Gatling Tests

## 1 - Download Gatling.

    https://gatling.io/open-source/start-testing/

## 2 - Extract the files, rename the folder to gatling and put it in C:\ . 

    C:\gatling\bin

## 3 - Create environment variable.

    GATLING_HOME = C:\gatling

## 4 - Add the variable to path.
    
    %GATLING_HOME%\bin

## 5 - In the same terminal run gatling tests.
    
    gatling --run-description AcmeExplorerTest --simulations-folder %TESTS_FOLDER%simulations --resources-folder %TESTS_FOLDER%resources --results-folder %TESTS_FOLDER%results

 - The terminal will ask for an optional run description.

## 6 - Tests results can be consulted via index.html, wich is inside %TESTS_FOLDER%results.