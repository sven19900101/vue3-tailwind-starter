import c_process from "child_process";
import inquirer from "inquirer";
import ora from "ora";
import { getPlatformName } from "./utils/index.js";

(async function () {
  let spinner = null;
  try {
    const result = await inquirer.prompt([
      {
        message: "请选择平台",
        type: "list",
        name: "name",
        choices: await getPlatformName(),
      },
    ]);
    spinner = ora("开始打包..."+'\n').start();
   let ls= c_process.exec(
      `vue-tsc --noEmit && vite build`,
      {
        env:{
          ...process.env,
        plat:result.name
        }
      },
      function (error, stdout) {
        error && console.log("error:" + error);
       
        spinner.succeed("打包完成");
      },
    );
    ls.stdout.on('data',data=>{
      console.log(data);
    })
  } catch (err) {
    spinner.fail("打包出错");
    console.error(err);
  }
  
})();
