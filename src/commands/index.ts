import { Command } from "commander";
import { registerHelloCommand } from "./hello";

const registerCommands = (program: Command): void => {
  registerHelloCommand(program);
};

export default registerCommands;
