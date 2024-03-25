import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes } from 'prism-react-renderer'
// import social from './data/social'
// import { GiscusConfig } from './src/components/Comment'

const config: Config = {
  title: '鱼桶的小站',
  url: 'https://fishcask.space',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'fish',
  projectName: 'blog',
  customFields: {
    bio: '日子常新，未来不远',
    description: '鱼在学习的海洋中收获知识并存储的地方',
  },
  themeConfig: {
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: ``,
    // },
    metadata: [
      {
        name: 'keywords',
        content: '鱼桶, fishcask',
      },
      {
        name: 'keywords',
        content: 'blog',
      },
      {
        name: 'keywords',
        content: '编程爱好者',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      logo: {
        alt: '鱼桶',
        src: 'img/logo.webp',
        srcDark: 'img/logo.webp',
      },
      hideOnScroll: true,
      items: [
        {
          label: '博客',
          position: 'right',
          to: 'blog',
        },
        {
          label: '项目',
          position: 'right',
          to: 'project',
        },
        { 
          label: '归档', 
          position: 'right', 
          to: 'blog/archive', 
        },
        /*
        { 
          label: '笔记', 
          position: 'right', 
          to: 'docs/skill',
        },
        */
        /*
        {
          label: '更多',
          position: 'right',
          items: [
            { label: '归档', to: 'blog/archive' },
            { label: '笔记', to: 'docs/skill' },
            { label: '资源', to: 'resources' },
            { label: '友链', to: 'friends' },
            { label: '工具推荐', to: 'docs/tools' },
          ],
        },
      
        {
          type: 'localeDropdown',
          position: 'right',
        },
        */
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            { label: '博客', to: 'blog' },
            { label: '归档', to: 'blog/archive' },
            // { label: '技术笔记', to: 'docs/skill' },
            // { label: '实战项目', to: 'project' },
            // { label: '前端示例', to: 'https://example.kuizuo.cn' },
          ],
        },
        /*
        {
          title: '社交媒体',
          items: [
            { label: '关于我', to: '/about' },
            { label: 'GitHub', href: social.github.href },
            { label: 'Twitter', href: social.twitter.href },
            { label: '掘金', href: social.juejin.href },
            { label: 'Discord', href: social.discord.href },
          ],
        },
        */
        {
          title: '更多',
          items: [
            // { label: '友链', position: 'right', to: 'friends' },
            // { label: '导航', position: 'right', to: 'resources' },
            {
              html: `
                <a href="https://docusaurus.io/zh-CN/" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                <a/>
                `,
            },
          ],
        },
      ],
    },
    // algolia: {
    //   appId: 'GV6YN1ODMO',
    //   apiKey: '50303937b0e4630bec4a20a14e3b7872',
    //   indexName: 'kuizuo',
    // },
    prism: {
      theme: themes.oneLight,
      darkTheme: themes.oneDark,
      additionalLanguages: [
        'bash',
        'json',
        'java',
        'python',
        'php',
        'graphql',
        'rust',
        'toml',
        'protobuf',
      ],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },

    // 删除评论服务
    // 评论服务
    // giscus: {
    //   repo: 'kuizuo/blog',
    //   repoId: 'MDEwOlJlcG9zaXRvcnkzOTc2MjU2MTI=',
    //   category: 'General',
    //   categoryId: 'DIC_kwDOF7NJDM4CPK95',
    //   theme: 'light',
    //   darkTheme: 'dark_dimmed',
    // } satisfies Partial<GiscusConfig>,

    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    liveCodeBlock: { playgroundPosition: 'top' },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
  
  
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          // sidebarPath: 'sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.scss'],
        },
        sitemap: {
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-S4SD5NXWXF',
          anonymizeIP: true,
        },
        debug: process.env.NODE_ENV === 'development',
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    'docusaurus-plugin-image-zoom',
    'docusaurus-plugin-sass',
    '@docusaurus/plugin-ideal-image',
    // ['docusaurus-plugin-baidu-tongji', { token: 'c9a3849aa75f9c4a4e65f846cd1a5155' }],
    /*
    [
      '@docusaurus/plugin-pwa',
      {
        debug: process.env.NODE_ENV === 'development',
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#12affa' },
        ],
      },
    ],
    */
    // TODO 搞清楚这里的链接是做什么用的
    [
      './src/plugin/plugin-content-blog', // 插件的路径，这里使用了一个定制版本的 'plugin-content-blog'
      {
        path: 'blog', // 博客文章存放的相对路径
        // editUrl 函数用于生成文章的编辑链接。这个链接会在每篇文章页面上显示，点击后可以直接跳转到 GitHub 上的编辑页面。
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/wuhuang1001/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false, // 如果设置为 false，将在所有版本的文档中使用一样的 editUrl，而不是为每种语言版本的文档使用不同的 editUrl
        blogDescription: '代码人生：编织技术与生活的博客之旅', // 博客的描述
        blogSidebarCount: 10, // 博客侧边栏显示的文章数量
        blogSidebarTitle: 'Blogs', // 博客侧边栏的标题
        postsPerPage: 10, // 每页显示的文章数量
        showReadingTime: true, // 是否在每篇文章上显示预计的阅读时间
        // 计算阅读时间的函数。这里设置了每分钟阅读300个词。
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        // RSS 订阅源的选项
        feedOptions: {
          type: 'all', // 订阅类型，'all' 表示订阅所有文章
          title: '鱼桶', // 订阅源的标题
        },
      },
    ],
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: '鱼桶的个人博客',
      },
    },
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["zh"],
        // ```
      }),
    ],
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
  
}

export default config
