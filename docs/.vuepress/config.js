const { path } = require('@vuepress/utils')
require('dotenv-flow').config();
module.exports = {
    base: process.env.NODE_ENV == 'development' ? '/' : '/',
    lang: 'zh-CN',
    title: "Hughes | 博客",
    description: 'Hughes的博客',
    shouldPrefetch: true,
    // 个人logo
    head: [
        ['link', { rel: 'shortcut', type:"image/x-icon", href: './favicon.ico' }],
        ['link', { rel: 'icon', type:"image/x-icon", href: './favicon.ico' }]
    ],
    themeConfig: {
        postsDir: path.resolve(__dirname, '../posts'),
        motto: ['Miracles sometimes occur,', 'but one has to work terribly for them.'],
        valine: {
            appId: process.env.VALINE_APPID,
            appKey: process.env.VALINE_APPKEY
        },
        navbar: [
            // NavbarItem
            {
                text: '博客',
                link: '/',
            },
            {
                text: '时间线',
                link: '/timeline',
            },
            {
                text: '留言板',
                link: '/comment',
            },
            {
                text: '标签',
                link: '/tag',
            },
            {
                text: 'Github',
                link: 'https://github.com/hughes-hc',
            },
        ],
    },
    plugins: [
        [
            '@vuepress/plugin-search',
        ],
    ],
    //   theme: 'vuepress-theme-hughes',
    theme: path.resolve(__dirname, "../../vuepress-theme-hughes")
}