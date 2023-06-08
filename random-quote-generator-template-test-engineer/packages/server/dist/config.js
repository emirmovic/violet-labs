"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config = () => ({
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
exports.config = config;
//# sourceMappingURL=config.js.map