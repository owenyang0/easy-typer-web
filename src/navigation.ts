import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '使用文档',
      links: [
        // {
        //   text: 'Blog List',
        //   href: getBlogPermalink(),
        // },
        // {
        //   text: 'Article',
        //   href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        // },
        // {
        //   text: 'Article (with MDX)',
        //   href: getPermalink('markdown-elements-demo-post', 'post'),
        // },
        // {
        //   text: 'Category Page',
        //   href: getPermalink('tutorials', 'category'),
        // },
        // {
        //   text: 'Tag Page',
        //   href: getPermalink('astro', 'tag'),
        // },
        {
          text: '项目介绍',
          href: '/portal/docs/intro/',
        },
        {
          text: '快速上手',
          href: '/portal/docs/get-started/',
        },
        {
          text: '发布日志',
          href: '/portal/docs/changelog/',
        },
        {
          text: 'macOS版下载',
          href: '/portal/docs/download/',
        },
      ],
    },
    {
      text: '其他作品',
      links: [
        {
          text: '🎉《易·跟打》',
          href: 'https://typer.owenyang.top',
        },
        {
          text: '🍺《易·阅读》',
          href: 'https://yuedu.owenyang.top',
        },
      ],
    },
    {
      text: '关于作者',
      links: [
        {
          text: '💫 关于木易某某',
          href: 'https://owenyang.top/about',
        },
        {
          text: '🎗 技术博客 | 互联网技术与前端开发分享',
          href: 'https://blog.owenyang.top',
        },
      ],
    },
    {
      text: 'Github',
      href: 'https://github.com/owenyang0/easy-typer',
      target: '_blank'
    },
  ],
  actions: [{ text: '下载macOS版', href: '/portal/docs/download/' }],
};

export const footerData = {
  links: [
    {
      title: '作品',
      links: [
        { text: '🎉《易·跟打》', href: 'https://typer.owenyang.top' },
        { text: '🍺《易·阅读》', href: 'https://yuedu.owenyang.top' },
      ],
    },
    {
      title: '木易跟打器',
      links: [
        { text: '🎉 开始跟打', href: 'https://typer.owenyang.top' },
        { text: '👊 快速上手', href: 'https://typer.owenyang.top/help' },
        { text: '💥 常见问题FAQ', href: 'https://blog.owenyang.top/easy-typer-faq' },
        { text: '🍺 支持赞助', href: 'https://blog.owenyang.top/buy-me-a-coffee' },
      ],
    },
    
    {
      title: '关于作者',
      links: [
        { text: '💫 关于木易某某', href: 'https://owenyang.top/about' },
        { text: '🎗 技术博客 | 互联网技术与前端开发分享', href: 'https://blog.owenyang.top' },
        // { text: '🍺 木易的知乎', href: '#' },
      ],
    },
    {
      title: '友情链接',
      links: [
        { text: '✨ 虎码官网', href: 'https://tiger-code.com' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Owen Yang\'s', href: 'https://blog.owenyang.top' },
    { text: '蜀ICP备2023002101号-1', href: 'https://beian.miit.gov.cn' },
  ],
  socialLinks: [
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/owenyang0/easy-typer' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://static.owenyang.top/typers/common/logo-square-dark.png" alt="易跟打 logo" loading="lazy"></img>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://blog.owenyang.top"> 木易某某</a> 2024 · All rights reserved.
  `,
};
