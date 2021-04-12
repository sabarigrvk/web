import chalk from "chalk";

export const compilerPromise = (name, compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      console.info(`[${chalk.bold.cyanBright(name)}] Compiling `);
    });
    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(`Failed to compile ${chalk.red(name)}`);
    });
  });
};

export const clientOnly = () => process.argv.includes("--client-only");
