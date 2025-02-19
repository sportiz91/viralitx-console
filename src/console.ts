import clear from "clear";
import figlet from "figlet";
import chalk from "chalk";

import { Command } from "commander";

const main = () => {
  clear();

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

  const program: Command = new Command();

  program
    .command("hello")
    .description("Prints Hello World")
    .action(() => {
      console.log("Hello, World!");
    });

  program.parse(process.argv);
};

main();
