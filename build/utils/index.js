import fs from "fs";

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

export { deleteAllFile, copyFile, renameFile, getPlatformName };
