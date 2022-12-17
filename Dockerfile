FROM node:18 AS builder

# Create app directory
WORKDIR /home/pda.os.api

# Install app dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN yarn

# Bundle app source
COPY . .

RUN yarn build

FROM node:18 AS runner

WORKDIR /home/pda.os.api

# Copy the build files
COPY --from=builder /home/pda.os.api .

EXPOSE 3333

# Run the app
CMD [ "yarn", "start:migrate:prod" ]
