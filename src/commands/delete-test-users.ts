import { Command } from "commander";
import logger from "@/utils/logger";
import { viralitxApi } from "@/utils/viralitx-api";

const COMMAND_NAME = "delete-test-users";
const COMMAND_DESCRIPTION = "Deletes the 100 test users";
const BATCH_SIZE = 10;

const handleDeleteTestUserError = (error: unknown, email: string): void => {
  if (error instanceof Error) {
    logger.error(`Failed to delete user ${email}:`);
    logger.error(error.message);

    return;
  }

  logger.error(`Failed to delete user ${email}:`);
  logger.error(error);
};

const deleteTestUser = async (index: number): Promise<void> => {
  const email = `test_user_${index}@test.com`;

  try {
    await viralitxApi.delete(`/user/${email}`);
    logger.info(`Deleted user ${email}`);
  } catch (error: unknown) {
    handleDeleteTestUserError(error, email);
  }
};

const deleteUsersInBatch = async (
  start: number,
  batchSize: number
): Promise<void> => {
  const promises: Promise<void>[] = [];

  for (let i = start; i < start + batchSize && i <= 100; i++) {
    promises.push(deleteTestUser(i));
  }

  await Promise.all(promises);
};

const commandAction = async (): Promise<void> => {
  logger.info("Starting deletion of 100 test users...");

  for (let i = 1; i <= 100; i += BATCH_SIZE) {
    await deleteUsersInBatch(i, BATCH_SIZE);
    logger.info(`Completed deletion batch starting from user ${i}`);
  }

  logger.info("Finished deleting test users");
};

export const registerDeleteTestUsersCommand = (program: Command): void => {
  program
    .command(COMMAND_NAME)
    .description(COMMAND_DESCRIPTION)
    .action(commandAction);
};
