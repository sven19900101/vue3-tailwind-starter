import c_process from "child_process";
import inquirer from "inquirer";
import { getPlatformName, migrationAssets } from "./utils/index.js";

(async function () {
  try {
    const result = await inquirer.prompt([
      {
        message: "请选择平台",
        type: "list",
        name: "name",
        choices: await getPlatformName(),
      },
    ]);
    migrationAssets(
      "./platform-static/" + result.name + "/config.ts",
      "./src/utils",
    );
    let ls = c_process.exec(
      `vite`,
      {
        env: {
          ...process.env,
          plat: result.name,
        },
      },
      function (error, stdout) {
        error && console.log("error:" + error);
      },
    );
    ls.stdout.on("data", (data) => {
      console.log(data);
    });
  } catch (err) {
    console.error(err);
  }
})();
