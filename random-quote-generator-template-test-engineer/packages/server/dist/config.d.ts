export declare const config: () => {
    app: {
        name: string;
        port: number;
    };
    database: {
        type: string;
        database: string;
        entities: string[];
        logging: boolean;
        synchronize: boolean;
    };
};
