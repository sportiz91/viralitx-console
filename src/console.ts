import clear from "clear";
import figlet from "figlet";
import chalk from "chalk";
import { Command } from "commander";

import registerCommands from "./commands";

const logHeader = (): void => {
  console.log(
    chalk.bold.blueBright(
      figlet.textSync("LASANTONETA", { horizontalLayout: "full" })
    )
  );
  console.log("-------------------------------------");
  console.log(
    chalk.bold.blue("Developed by Lasantoneta (https://santiagoportiz.tech)")
  );
  console.log("-------------------------------------");
};

const main = (): void => {
  clear();

  logHeader();

  const program: Command = new Command();

  registerCommands(program);

  program.parse(process.argv);
};

main();
