// import WebDeveloperSvg from '@site/static/svg/undraw_web_developer.svg'
import OpenSourceSvg from '@site/static/svg/undraw_open_source.svg'
import SpiderSvg from '@site/static/svg/undraw_spider.svg'
import Translate, { translate } from '@docusaurus/Translate'

export type FeatureItem = {
  title: string
  text: JSX.Element
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
}

const FEATURES: FeatureItem[] = [
  /*
  {
    title: translate({
      id: 'homepage.feature.developer',
      message: 'TypeScript 全栈工程师',
    }),
    text: (
      <Translate>
        作为一名 TypeScript 全栈工程师，秉着能用 TS 绝不用 JS
        的原则，为项目提供类型安全的保障，提高代码质量和开发效率。
      </Translate>
    ),
    Svg: WebDeveloperSvg,
  },
  {
    title: translate({
      id: 'homepage.feature.spider',
      message: '会点逆向 & 爬虫',
    }),
    text: (
      <Translate>
        作为一名曾学习与实践逆向工程两年半的开发者，对于逆向工程有着浓厚的兴趣，同时造就了超凡的阅读代码能力。没有看不懂的代码，只有不想看的代码。
      </Translate>
    ),
    Svg: SpiderSvg,
  },
  */
  {
    title: translate({
      id: 'homepage.feature.student',
      message: '学生',
    }),
    text: (
      <Translate>
        在编程的道路上努力学习中
      </Translate>
    ),
    Svg:SpiderSvg,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: '编程爱好者',
    }),
    text: (
      <Translate>
        作为一名编程爱好者，积极学习编程知识，希望有生之年能够构建出一个知名的开源项目。
      </Translate>
    ),
    Svg: OpenSourceSvg,
  },
]

export default FEATURES
