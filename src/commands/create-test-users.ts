import { Command } from "commander";

import logger from "@/utils/logger";
import { viralitxApi } from "@/utils/viralitx-api";

const COMMAND_NAME = "create-test-users";
const COMMAND_DESCRIPTION = "Creates 100 test users";

const commandAction = async (): Promise<void> => {
  logger.info("Creating 100 test users...");

  // @TODO: type correctly.
  const response = await viralitxApi.post("/user", {
    email: "testing@testing.com",
    password: "hashedPassword123",
    fullName: "Testing User",
  });

  logger.info(response.data);
};

export const registerCreateTestUsersCommand = (program: Command): void => {
  program
    .command(COMMAND_NAME)
    .description(COMMAND_DESCRIPTION)
    .action(commandAction);
};
