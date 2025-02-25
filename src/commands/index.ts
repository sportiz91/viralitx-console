import { Command } from "commander";

import { registerHelloCommand } from "./hello.js";
import { registerCreateTestUsersCommand } from "./create-test-users.js";
import { registerDeleteTestUsersCommand } from "./delete-test-users.js";

const registerCommands = (program: Command): void => {
  registerHelloCommand(program);
  registerCreateTestUsersCommand(program);
  registerDeleteTestUsersCommand(program);
};

export default registerCommands;
