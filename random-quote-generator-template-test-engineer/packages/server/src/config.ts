export const config = () => ({
  app: {
    name: 'Violet Labs',
    port: 3000,
  },
  database: {
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: false,
    synchronize: true,
  },
});
