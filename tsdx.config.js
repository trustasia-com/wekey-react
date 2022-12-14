//tsdx.config.js配置文件

const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const image = require('@rollup/plugin-image');
const json = require('@rollup/plugin-json')
const cssnano = require('cssnano');


module.exports = {
  configureWebpack: {
    module: {
      rules: [{
        test: /\.geojson$/,
        loader: 'json-loader'
      }]
    },
  },

  rollup(config, options) {
    config.plugins.push(
      json({
        kml: true
      }),
      postcss({
        plugins: [
            autoprefixer(),
            cssnano({
                preset: 'default',
            }),
        ],
        inject: true, // 是否主动注入css到js中(设置为true,则在引用组件的时候,就无需再单独引入css了)
        extract: !!options.writeMeta, //
        // modules: true, // 使用css modules
        // camelCase: true, // 支持驼峰
        // sass: true, // 是否使用sass
        // less: true, // 是否使用less
      }),
    );
    // 截至2021年3月: 必须使用 unshift 添加 image 插件, 否则报错
    config.plugins.unshift(image({
      svg: true,
      include: ['**/*.png', '**/*.jpg'],
    }));
    return config;
  },
};