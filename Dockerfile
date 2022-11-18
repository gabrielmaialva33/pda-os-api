FROM node:18 AS builder

# Create app directory
WORKDIR /home/app

# Install app dependencies
COPY package*.json ./
COPY prisma ./prisma/

RUN yarn

# Bundle app source
COPY . .

RUN yarn build

FROM node:18 AS runner

WORKDIR /home/app

# Copy the build files
COPY --from=builder /home/app/node_modules ./node_modules
COPY --from=builder /home/app/package*.json ./
COPY --from=builder /home/app/dist ./dist
COPY --from=builder /home/app/prisma ./prisma

EXPOSE 3333

# Run the app
CMD [ "yarn", "start:migrate:prod" ]

# CMD [ "node", "dist/main.js" ]