import Joi from "joi";
import dotenv from "dotenv";

import { Config, NodeEnv } from "@/types/config.types";

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3002),

    MONGODB_URL: Joi.string().required().description("MongoDB URL"),

    MAILGUN_API_KEY: Joi.string().required().description("Mailgun API Key"),
    MAILGUN_DOMAIN: Joi.string().required().description("Mailgun Domain"),
    EMAIL_FROM: Joi.string()
      .email()
      .required()
      .description("Email from address"),

    VIRALITX_API_URL: Joi.string().required().description("Viralitx API URL"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config: Config = {
  env: envVars.NODE_ENV as NodeEnv,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  email: {
    mailgunApiKey: envVars.MAILGUN_API_KEY,
    mailgunDomain: envVars.MAILGUN_DOMAIN,
    from: envVars.EMAIL_FROM,
  },
  viralitx: {
    apiUrl: envVars.VIRALITX_API_URL,
  },
};

export default config;
