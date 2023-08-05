// const pxToViewportConfig = {
//   unitToConvert: "px", // 要转化的单位
//   // viewportWidth: 750, // UI设计稿的宽度
//   unitPrecision: 6, // 转换后的精度，即小数点位数
//   propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
//   viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
//   fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
//   selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
//   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
//   mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
//   replace: true, // 是否转换后直接更换属性值
//   // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
//   exclude: [],
//   landscape: false, // 是否处理横屏情况
// };

export default {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
    // "postcss-pxtorem": {
    //   rootValue: 37.5, // Vant 官方根字体大小是 37.5
    //   propList: ["*"],
    //   selectorBlackList: ["norem"], // 过滤掉.norem-开头的class，不进行rem转换
    // },
    // "@jonny1994/postcss-px-to-viewport": {
    //   viewportWidth: 375, // UI设计稿的宽度
    //   exclude: [/^(?!.*node_modules\/vant)/], // 对vant组件库单独处理
    //   ...pxToViewportConfig,
    // },
    // "@jonny1994/postcss-px-to-viewport": {
    //   viewportWidth: 750, // UI设计稿的宽度
    //   include: /\/src\//, // 对src目录下文件进行转换
    //   ...pxToViewportConfig,
    // },
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
