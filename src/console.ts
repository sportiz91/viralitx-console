import clear from "clear";
import figlet from "figlet";
import chalk from "chalk";
import { Command } from "commander";

import logger from "@/utils/logger";
import registerCommands from "@/commands";

const logHeader = (): void => {
  logger.info(
    chalk.bold.blueBright(
      figlet.textSync("LASANTONETA", { horizontalLayout: "full" })
    )
  );
  logger.info("-------------------------------------");
  logger.info(
    chalk.bold.blue("Developed by Lasantoneta (https://santiagoportiz.tech)")
  );
  logger.info("-------------------------------------");
};

const main = (): void => {
  clear();

  logHeader();

  const program: Command = new Command();

  registerCommands(program);

  program.parse(process.argv);
};

main();
