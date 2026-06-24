import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '客户数据分析技术',
  description: 'AI时代高职课程 — 成为数据驱动的分析指挥官',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '客户数据分析技术',

    nav: [
      { text: '课程首页', link: '/' },
      { text: '课程大纲', link: '/syllabus' },
      { text: '📊 数据资源', link: '/data/' },
      { text: '🤖 AI助手', link: '/ai-assistant/' },
      {
        text: '课程讲义',
        items: [
          { text: '阶段一：数据基础', link: '/week01/' },
          { text: '阶段二：分析方法', link: '/week05/' },
          { text: '阶段三：商业应用', link: '/week09/' },
          { text: '阶段四：AI赋能与实战', link: '/week13/' },
        ]
      }
    ],

    sidebar: [
      {
        text: '📋 课程大纲',
        link: '/syllabus'
      },
      {
        text: '📊 数据资源',
        link: '/data/'
      },
      {
        text: '🤖 AI助手',
        link: '/ai-assistant/'
      },
      {
        text: '阶段一：数据基础',
        collapsed: false,
        items: [
          { text: '第1周：数据觉醒', link: '/week01/' },
          { text: '第2周：数据清洗', link: '/week02/' },
          { text: '第3周：客户画像与RFM分析', link: '/week03/' },
          { text: '第4周：数据可视化', link: '/week04/' },
        ]
      },
      {
        text: '阶段二：分析方法',
        collapsed: false,
        items: [
          { text: '第5周：客户细分', link: '/week05/' },
          { text: '第6周：客户生命周期价值', link: '/week06/' },
          { text: '第7周：客户流失预警', link: '/week07/' },
          { text: '第8周：A/B测试', link: '/week08/' },
        ]
      },
      {
        text: '阶段三：商业应用',
        collapsed: false,
        items: [
          { text: '第9周：精准营销与个性化推荐', link: '/week09/' },
          { text: '第10周：全渠道客户体验', link: '/week10/' },
          { text: '第11周：会员体系与忠诚度', link: '/week11/' },
          { text: '第12周：数据隐私与伦理', link: '/week12/' },
        ]
      },
      {
        text: '阶段四：AI赋能与实战',
        collapsed: false,
        items: [
          { text: '第13周：AI时代的客户分析', link: '/week13/' },
          { text: '第14周：综合实战工作坊（上）', link: '/week14/' },
          { text: '第15周：综合实战工作坊（下）', link: '/week15/' },
          { text: '第16周：成果展示', link: '/week16/' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: '客户数据分析技术 — AI时代高职课程',
      copyright: '© 2026 课程教学团队'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    docFooter: {
      prev: '上一周',
      next: '下一周'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
