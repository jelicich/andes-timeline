module.exports = {
    "transpileDependencies": [
      "vuetify"
    ],
    publicPath: process.env.BASE_URL,
    chainWebpack: config => {
        config.plugin('VuetifyLoaderPlugin').tap(args => [{
            match(originalTag, { kebabTag, camelTag, path, component }) {
                if (kebabTag.startsWith('core-')) {
                    return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
                }
            }
        }])
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: '@import "@/styles/mixins.scss";',
            },
        },
    },
    // publicPath: '/timeline/'
}
