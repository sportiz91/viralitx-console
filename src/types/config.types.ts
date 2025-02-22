export type NodeEnv = "development" | "production" | "test";

export interface MongooseConfig {
  url: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  };
}

export interface EmailConfig {
  mailgunApiKey: string;
  mailgunDomain: string;
  from: string;
}

export interface Config {
  env: NodeEnv;
  port: number;
  mongoose: MongooseConfig;
  email: EmailConfig;
  viralitx: {
    apiUrl: string;
  };
}
