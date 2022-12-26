export default () => ({
  // 実行時の環境変数を GCP or AWSのSecret Managerから取得する想定です
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER || 'test',
    password: process.env.password || 'password',
    database: process.env.database || 'test',
  },
});
