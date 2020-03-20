module.exports = {
    publicPath: "/", //根路径
    outputDir: "dist", //打包目录

    indexPath: "index.html", //生成的html路径
    filenameHashing: true, //生成文件名中包含hash

    // 
    // // pages:{
    // // 	
    // // },//多页面配置
    // // 
    // //

    css: {
        requireModuleExtension: true, //启动css Modules eg:有时候element引入效果出不来可以改为true
        extract: true, //css分离插件
        loaderOptions: {
            css: {
                modules: {
                    localIdentName: '[path]-[name]-[local]-[hash:base64:5]'
                  },
                  localsConvention: 'camelCaseOnly'
                // css:{
                //     localIdentName:"[path]-[name]-[local]-[hash:base64:5]",
                //     camelCase:true,
                // }
            },
            sass: {
                prependData: `@import "@/assets/css/_style.scss";`
            }
        }
    },
    //
    lintOnSave: process.env.NODE_ENV === "production", // 是否保存时limt代码
    runtimeCompiler: true, //是否使用编译器

    productionSourceMap: false,

    // 代理
    devServer: {
        port: "8090",
        host: "localhost",
        https: false,
        open: false,
        compress: true,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: "<url>", // 目标接口
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '/api': '/'
                }
            }
        }
    }
}