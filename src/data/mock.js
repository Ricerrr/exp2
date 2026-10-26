// 初始 Mock 文章数据
export const INITIAL_ARTICLES = [
  {
    id: 1,
    title: 'React 入门：组件与状态',
    summary: 'React 的核心是组件化和单向数据流，本文带你从零开始理解 useState 和 useEffect。',
    content: `# React 入门

React 是一个用于构建用户界面的 **JavaScript 库**。

## 组件化思想

React 把界面拆分成一个个独立、可复用的组件：

\`\`\`jsx
function Welcome({ name }) {
  return <h1>你好, {name}</h1>
}
\`\`\`

## useState 状态管理

\`useState\` 让函数组件也能拥有自己的状态：

\`\`\`jsx
const [count, setCount] = useState(0)
\`\`\`

> 状态变化会触发组件重新渲染，这是 React 的基本工作方式。

- props 是父组件传给子组件的参数
- state 是组件内部自己维护的数据
- 数据只能自上而下单向流动`,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=react%20javascript%20programming%20code%20blue%20theme&image_size=square',
    tags: ['React', '前端'],
    author: '老张',
    likes: 42,
    likedBy: [],
    createdAt: '2026-10-20'
  },
  {
    id: 2,
    title: 'Tailwind CSS 速查：原子化 CSS 的正确姿势',
    summary: 'Tailwind 让你不用离开 HTML 就能写完样式，来看常用的工具类组合技巧。',
    content: `# Tailwind CSS 速查

原子化 CSS 的精髓：**每个类名做一件事**。

## 常用布局

- \`flex justify-between items-center\` — 两端对齐 + 垂直居中
- \`grid grid-cols-3 gap-4\` — 三列栅格
- \`p-4 m-2\` — 内边距外边距

## 响应式前缀

\`\`\`
mobile default
md:  ≥ 768px
lg:  ≥ 1024px
xl:  ≥ 1280px
\`\`\`

这样写：\`text-sm md:text-base lg:text-lg\`

## 实用技巧

> 不要把所有东西都塞到一个 class 里，适度抽组件才是长久之道。`,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tailwind%20css%20web%20design%20purple%20gradient&image_size=square',
    tags: ['CSS', 'Tailwind'],
    author: '老张',
    likes: 28,
    likedBy: [],
    createdAt: '2026-10-22'
  },
  {
    id: 3,
    title: 'Vite + React + Tailwind 项目骨架搭建',
    summary: '一条命令搞定现代前端三件套，开箱即用的开发体验。',
    content: `# Vite + React + Tailwind

## 创建项目

\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
\`\`\`

## 安装 Tailwind

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## 配置 content

在 \`tailwind.config.js\` 里声明需要扫描的文件路径即可。

完成！现在你可以写 \`className="p-4 bg-red-500 text-white rounded"\` 了。`,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vite%20react%20project%20setup%20minimalist%20dark&image_size=square',
    tags: ['Vite', 'React', '工程化'],
    author: '小李',
    likes: 15,
    likedBy: [],
    createdAt: '2026-10-25'
  },
  {
    id: 4,
    title: '为什么选择 Zustand 而不是 Redux',
    summary: '小而美的状态管理库，1KB 大小，无 boilerplate，上手即用。',
    content: `# Zustand vs Redux

Zustand 是一个极简的 React 状态管理库。

## 对比

| 特性 | Redux | Zustand |
|---|---|---|
| 学习曲线 | 高 | 低 |
| Boilerplate | 多 | 少 |
| 体积 | ~4KB + middleware | ~1KB |
| DevTools | 强 | 有 |

## 示例

\`\`\`js
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 }))
}))
\`\`\`

就这么简单。`,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zustand%20state%20management%20lightweight%20minimal&image_size=square',
    tags: ['React', '状态管理'],
    author: '老王',
    likes: 33,
    likedBy: [],
    createdAt: '2026-10-26'
  }
]
