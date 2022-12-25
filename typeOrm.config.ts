import { DataSource } from 'typeorm';

// 本来は環境変数から取得することを推奨します
export default new DataSource({
    type: 'sqlite',
    database: 'data/dev.sqlite',
    entities: ['dist/**/entities/**/*.entity.js'],
    migrations: ['dist/**/migrations/**/*.js'],
    logging: true,
});
