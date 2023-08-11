/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: any) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = propName + "=";
    if (typeof value === "object") {
      for (const key of Object.keys(value)) {
        if (
          value[key] !== null &&
          value[key] !== "" &&
          typeof value[key] !== "undefined"
        ) {
          let params = propName + "[" + key + "]";
          const subPart = params + "=";
          result += subPart + value[key] + "&";
        }
      }
    } else {
      result += part + value + "&";
    }
  }
  return result;
}
