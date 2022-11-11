# README for oauth server
#start docker
sudo dockerd

#start robo 3t
robo3t/robo3t-1.3.1-linux-x86_64-7419c406/bin
./robo3t

## Prerequisite

### Generate key and certificate for server

    openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout ./keys/key.pem -out ./keys/cert.pem -subj "/C=FR/ST=Paris/L=Paris/O=Orange/OU=R&D Department"

### Get node modules to ./node_modules

    npm install

## Local utilisation

### Start docker mongoDB container
    cd /home/amal/ExchangePlace/jwt_oauth

    cd docker/mongo && docker-compose -f docker-compose-mongo.yaml up

### Build source code

    npm run build #[ to generate /dist fodler ]

### Start server
    cd /home/amal/ExchangePlace/jwt_oauth
    set -a && . ./.env && set +a && npm run start

## Docker utilisation

### Build docker image for oauth server

    docker build -f Dockerfile -t oauth:1.0.0 .

### Start oauth and DB docker containers

    set -a && . ./.env && set +a && cd docker && docker-compose -f docker-compose.yaml up -d

### Stop oauth and DB docker containers

    cd docker && docker-compose -f docker-compose.yaml stop

### Remove oauth and DB docker containers

    cd docker && docker-compose -f docker-compose.yaml down

## API

### Display server Version

http://localhost:4000/oauth/version

### Display swagger

http://localhost:4000/oauth/api/v1.0.0/api-docs

### Sign in

POST http://localhost:4000/oauth/api/v1.0.0/auth/sign_in
{"email":"admin1@orange.com", "password":"PassWord007"}

### Register a new user

header: Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...eyJlbWFpbCI6ImFkbWluMUBvcmFuZ2UuY29tIiwibmFtZSI6ImFkbWluMSIsIl9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSIsImlhdCI6MTU4Njg4MDQ2NywiZXhwIjoxNTg2ODg3NjY3fQ.sF7GGgLCkXolnqmhkO5YehRj90H4LFfEO8Zzmdd3aO4
POST http://localhost:4000/oauth/api/v1.0.0/users
{"userName":"toto", "firstName":"titi", "lastName":"tutu", "email":"p.l@orange.fr", "password":"password"}

curl -X POST "http://localhost:4000/oauth/api/v1.0.0/users" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"userName\": \"amal\",  \"firstName\": \"gassara\",  \"lastName\": \"gassara\",  \"email\": \"amal.gassara@gmail.com\",  \"password\": \"amal1234\"}" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTlmN2YzMGYzZTFiMTUyZTQ5MWUzMmUiLCJpYXQiOjE1OTI4MjgyNDMsImV4cCI6MTU5MjgzNTQ0M30.ZRRZRM2gH1HkWKu9qFZIFYLe4gOQAFK4rT4LnIX8uq0"
### Get list of users

header: Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTlmN2YzMGYzZTFiMTUyZTQ5MWUzMmUiLCJpYXQiOjE1OTk1NTQ2NzAsImV4cCI6MTU5OTU2MTg3MH0.CmWX9LMFIKkRMwgUk9s8Rs3ltQKLIBXk2XfN83jZpDE
GET http://localhost:4000/oauth/api/v1.0.0/users

curl -X GET "http://localhost:4000/oauth/api/v1.0.0/users" -H "accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTlmN2YzMGYzZTFiMTUyZTQ5MWUzMmUiLCJpYXQiOjE1OTI4MjgyNDMsImV4cCI6MTU5MjgzNTQ0M30.ZRRZRM2gH1HkWKu9qFZIFYLe4gOQAFK4rT4LnIX8uq0"
"
curl -X GET "http://localhost:4000/oauth/api/v1.0.0/users" -H  "accept: application/json" -H  "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTlmN2YzMGYzZTFiMTUyZTQ5MWUzMmUiLCJpYXQiOjE1OTk1NTQ2NzAsImV4cCI6MTU5OTU2MTg3MH0.CmWX9LMFIKkRMwgUk9s8Rs3ltQKLIBXk2XfN83jZpDE"
### Get details about a user

header: Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GET http://localhost:4000/oauth/api/v1.0.0/users/5e95e01af5217541df292db5

### Update a user

header: Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
PUT http://localhost:4000/oauth/api/v1.0.0/users/5e95e01af5217541df292db5
{"userName":"riri", "firstName":"titi", "lastName":"tutu", "password":"pwd"}

### Delete a user

header: Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DELETE http://localhost:4000/oauth/api/v1.0.0/users/5e95e01af5217541df292db5

### How to check Json Web Token

JWT consists of three concatenated Base64url-encoded strings, separated by dots (.): header, payload and signature
ex: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJfaWQiOiI1ZTk2ZGE3MWY5OWNkODYxNzk0MzY1YjIiLCJpYXQiOjE1ODY5NDQ2NTEsImV4cCI6MTU4Njk1MTg1MX0.
    bLBHPG5-1Uf1v5-hVjcOehv1Wknu09vJGjel2GTRKPI

header: { "alg": "HS256", "typ": "JWT" }
payload: { "_id": "5e96da71f99cd861794365b2", "iat": 1586944651, "exp": 1586951851 }

if you decode payload you can get userID ('_id')
and with this ID you can invoke the follow URL to get details about this user:

header: Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GET http://localhost:4000/oauth/api/v1.0.0/users/5e96da71f99cd861794365b2

If you received details, it means your token is verified.

curl -X GET "http://localhost:4000/oauth/api/v1.0.0/users/5ee2cae522b75a27ce964dae" -H "accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUyY2FlNTIyYjc1YTI3Y2U5NjRkYWUiLCJpYXQiOjE1OTIyMTIzODUsImV4cCI6MTU5MjIxOTU4NX0.Olvx96l3vIXocktp8kwhAAfX1NJJbhP-gPNaVADqZBo"
