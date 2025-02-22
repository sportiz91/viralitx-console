import { Command } from "commander";

import { registerHelloCommand } from "./hello.js";
import { registerCreateTestUsersCommand } from "./create-test-users.js";

const registerCommands = (program: Command): void => {
  registerHelloCommand(program);
  registerCreateTestUsersCommand(program);
};

export default registerCommands;
