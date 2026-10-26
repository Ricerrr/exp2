export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">关于本站</h1>
      <div className="prose-blog dark:text-gray-200">
        <p>
          这是一个使用 <strong>React 19 + Vite + Tailwind CSS + Zustand</strong> 搭建的极简博客示例。
          所有数据都保存在浏览器的 <code>localStorage</code> 里，刷新页面不会丢失。
        </p>
        <h2>主要功能</h2>
        <ul>
          <li>文章列表 + 搜索 + 标签筛选</li>
          <li>Markdown 文章详情（代码块、引用、列表都支持）</li>
          <li>登录 / 退出（演示模式，任意用户名即可）</li>
          <li>点赞（登录后可用，每人每篇点一次）</li>
          <li>评论区</li>
          <li>写新文章（Markdown 编辑器 + 实时预览）</li>
          <li>深色 / 浅色主题切换</li>
          <li>响应式布局（手机 / 平板 / 桌面）</li>
        </ul>
        <h2>项目结构</h2>
        <pre><code>react-blog/
├── src/
│   ├── components/  布局 + 文章卡片
│   ├── pages/       5 个页面
│   ├── store/       Zustand 状态 + 持久化
│   ├── data/        初始 mock 文章
│   └── App.jsx      路由
├── tailwind.config.js
└── vite.config.js</code></pre>
        <h2>启动</h2>
        <pre><code>npm install
npm run dev</code></pre>
        <p>默认端口 <code>http://localhost:5173</code>。</p>
      </div>
    </div>
  )
}
