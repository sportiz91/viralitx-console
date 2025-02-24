import { Command } from "commander";

import logger from "@/utils/logger";
import { viralitxApi } from "@/utils/viralitx-api";
import { TestUser } from "@/types/user.types";

const COMMAND_NAME = "create-test-users";
const COMMAND_DESCRIPTION = "Creates 100 test users";
const BATCH_SIZE = 10;

const handleCreateTestUserError = (error: unknown, user: TestUser): void => {
  if (error instanceof Error) {
    logger.error(`Failed to create user ${user.email}:`);
    logger.error(error.message);

    return;
  }

  logger.error(`Failed to create user ${user.email}:`);
  logger.error(error);
};

const createTestUser = async (index: number): Promise<void> => {
  const user: TestUser = {
    email: `test_user_${index}@test.com`,
    password: "TestUser123!",
    fullName: `Test User ${index}`,
  };

  try {
    await viralitxApi.post("/user", user);

    logger.info(`Created user ${user.email}`);
  } catch (error: unknown) {
    handleCreateTestUserError(error, user);
  }
};

const createUsersInBatch = async (
  start: number,
  batchSize: number
): Promise<void> => {
  const promises: Promise<void>[] = [];

  for (let i = start; i < start + batchSize && i <= 100; i++) {
    promises.push(createTestUser(i));
  }

  await Promise.all(promises);
};

const commandAction = async (): Promise<void> => {
  logger.info("Starting creation of 100 test users...");

  for (let i = 1; i <= 100; i += BATCH_SIZE) {
    await createUsersInBatch(i, BATCH_SIZE);
    logger.info(`Completed batch starting from user ${i}`);
  }

  logger.info("Finished creating test users");
};

export const registerCreateTestUsersCommand = (program: Command): void => {
  program
    .command(COMMAND_NAME)
    .description(COMMAND_DESCRIPTION)
    .action(commandAction);
};
