import { Command } from "commander";

const COMMAND_NAME = "hello";
const COMMAND_DESCRIPTION = "Prints Hello World";

const commandAction = (): void => {
  console.log("Hello, World!");
};

export const registerHelloCommand = (program: Command): void => {
  program
    .command(COMMAND_NAME)
    .description(COMMAND_DESCRIPTION)
    .action(commandAction);
};
