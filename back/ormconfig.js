module.exports = {
  type: 'mysql',
  port: 3306,
  logging: Boolean(process.env.MYSQL_LOGGING),
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/**/*.entity.ts', './**/*.entity.js'],
  migrations: ['src/migrations/**/*.ts', './migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: false,
};
