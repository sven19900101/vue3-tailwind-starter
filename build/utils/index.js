import fs from "fs";
import { extname, basename } from "path";
//删除文件夹中的全部文件
function deleteAllFile(path, delEmptyDir = false) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteAllFile(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    delEmptyDir ? fs.rmdirSync(path) : null;
  }
}
//复制文件
function copyFile(src, dist) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dist));
}
//重命名文件
function renameFile(oldPath, newPath) {
  fs.renameSync(oldPath, newPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getDirNameArr(platformNames) {
  const platformNameArr = [];
  platformNames.forEach((platformName) => {
    // 获取当前前缀
    const curPrefix = platformName.substr(0, platformName.indexOf("-"));
    const curprefixObjArr = platformNameArr.filter(
      (prefixObj) => prefixObj.prefix === curPrefix,
    );

    //如果数组已存在该前缀数据
    if (curprefixObjArr.length) {
      const { prefixArr } = curprefixObjArr[0];
      if (prefixArr[prefixArr.length - 1].length === 8) {
        prefixArr.push([platformName]);
      } else {
        prefixArr[prefixArr.length - 1].push(platformName);
      }
    } else {
      platformNameArr.push({
        prefix: curPrefix,
        prefixArr: [[platformName]],
      });
    }
  });

  let arr = [];
  platformNameArr.map((item) => {
    item.prefixArr.forEach((childArr) => {
      childArr.forEach((child) => {
        arr.push(child);
      });
    });
  });
  return arr;
}

function getPlatformName() {
  return new Promise((resolve, reject) => {
    const platformNames = fs
      .readdirSync("./platform-static")
      .filter((item) => item !== ".DS_Store");
    resolve(platformNames);
    // resolve(getDirNameArr(platformNames));
  });
}

/**
 * 新目录写入文件
 * @param {*} filePath
 * @param {*} targetDirectory
 */
const migrationFile = (filePath, targetDirectory) => {
  const fileName = basename(filePath);
  console.log("写入文件:" + filePath, `${targetDirectory}/${fileName}`);
  let data = fs.readFileSync(filePath);
  fs.writeFileSync(`${targetDirectory}/${fileName}`, data);
};
/**
 * 迁移目录or文件
 * @param {*} curDirectory 当前目录或文件名
 * @param {*} targetDirectory 目标目录
 * @param {*} isHash 文件夹是否解构
 */
const migrationAssets = (curDirectory, targetDirectory, isHash = false) => {
  //判断是否是文件
  const isFile = /\./.test(extname(curDirectory));

  if (isFile) {
    migrationFile(curDirectory, targetDirectory);
  } else {
    const dirName = basename(curDirectory);
    // console.log(dirName);
    if (!isHash && !fs.existsSync(`${targetDirectory}/${dirName}`)) {
      //往指定位置创建文件夹
      fs.mkdirSync(`${targetDirectory}/${dirName}`);
    }

    const readdirRes = fs.readdirSync(curDirectory);
    readdirRes
      .filter((item) => item !== ".DS_Store")
      .forEach((fileName) => {
        //   console.log(`${curDirectory}/${fileName}`,`${targetDirectory}${!isHash ? '/'+dirName : ''}`,)
        migrationAssets(
          `${curDirectory}/${fileName}`,
          `${targetDirectory}${!isHash ? "/" + dirName : ""}`,
        );
      });
  }
};

export {
  deleteAllFile,
  copyFile,
  renameFile,
  getPlatformName,
  migrationAssets,
};
