# 1. Deploy production app
docker compose -p "app-usevilla-do-2023-prod" --env-file .env.prod up --build -d

# 2. Deploy developement app
docker compose -p "app-usevilla-do-2023-dev" --env-file .env.dev up --build -d