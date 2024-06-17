declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT_NODE: number;
        NODE_ENV: 'development' | 'production';
      }
    }
  }
  
  export {}