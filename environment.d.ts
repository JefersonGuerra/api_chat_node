declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT_NODE: number;
      TZ: string;
      DB_BASE: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_PORT: string;
      DB_DIALECT: string
      PGADMIN_DEFAULT_EMAIL: string;
      PGADMIN_DEFAULT_PASSWORD: string;
      PGADMIN_DEFAULT_PORT: string;
      JWT_SECRET: string;
      DATABASE_URL: string;
    }
  }
}

export { }