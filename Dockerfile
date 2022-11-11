# Build Stage 1
# This build created a staging docker image
#
FROM node:alpine AS appbuild

WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
RUN npm run build
# Build Stage 2
# This build takes the production build from staging build
#
FROM node:alpine
WORKDIR /usr/src/app
COPY ["package.json", ".env", ".babelrc", "./"]
COPY --from=appbuild /usr/src/app/dist ./dist
RUN npm install --omit=dev
CMD npm start