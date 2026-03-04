FROM docker.io/library/python:3.12-slim

WORKDIR /app

COPY req.txt .

RUN pip install --no-cache-dir -r req.txt

COPY . .

# Команда запуска указана в docker-compose.yml для возможности hot reload 