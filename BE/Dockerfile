FROM node:18.14.2-alpine
WORKDIR /Social/BE
COPY package.json ./
COPY tsconfig.json ./
COPY . /src
RUN yarn
COPY . ./
RUN yarn build
EXPOSE 8080
CMD ["yarn", "run", "dev"]