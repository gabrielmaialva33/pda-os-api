module.exports = {
  apps: [
    {
      name: 'base-graphql-api',
      script: 'yarn',
      args: 'npx prisma migrate deploy && npm run start:prod',
      interpreter: '/bin/bash',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
};
