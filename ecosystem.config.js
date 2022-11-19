module.exports = {
  apps: [
    {
      name: 'pda.os.api',
      script: 'yarn',
      args: 'start:prod',
      interpreter: '/bin/bash',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
};
