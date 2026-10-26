# 实验二 React 组件化 SPA 博客开发

> 仓库：`se3306-exp2`（react-blog）  
> 技术栈：React 19 + Vite 5 + Tailwind CSS 3 + Zustand 5 + react-router-dom 6 + marked + lucide-react  
> 学时：约 6 学时

---

## 一、实验目的

1. 掌握 React 组件化思想与 JSX 语法，能拆分并复用 UI 组件；
2. 理解并使用 `useState` / `useEffect` / `useMemo` 等 Hooks 管理状态与副作用；
3. 用 React Router 实现多页面路由与嵌套布局（Layout + Outlet）；
4. 用 Zustand 做全局状态管理，并用 `persist` 中间件把数据持久化到 `localStorage`；
5. 用 Tailwind 原子化 CSS 完成响应式布局与深色模式；
6. 从工程角度理解 SPA 架构与实验一 CSR 渲染的关系，巩固"SEO 为何仍是短板"的认知。

---

## 二、实验环境与工具

- 硬件：可联网计算机；软件：Node.js 20+、npm/pnpm、Chrome（含 DevTools）、VS Code；
- 技术栈：React 19、Vite 5、Tailwind 3、Zustand 5、react-router-dom 6、marked、lucide-react；
- AI 辅助（可选）：通义灵码 / DeepSeek / 豆包，详见 `AI使用声明.md`。

---

## 三、实验原理

### 3.1 React 核心概念速览

| 概念 | 一句话 | 本项目体现 |
|------|--------|-----------|
| 组件 Component | 独立、可复用的 UI 单元，输入 props、内部有 state | `Layout`、`ArticleCard`、`Home`、`Article` 等 |
| JSX | 在 JS 里写类 HTML 的语法糖，编译成 `React.createElement` | 所有 `.jsx` 文件 |
| Props | 父组件传给子组件的只读参数，自上而下流动 | `ArticleCard` 接收 `article` |
| State | 组件内部可变数据，变化触发重新渲染 | `Home` 的 `keyword` / `activeTag` |
| Hooks | 在函数组件里"勾入"状态与生命周期 | `useState`、`useEffect`、`useMemo`、`useParams` |
| 单向数据流 | 数据只能从父到子、由 state 驱动视图 | store → 页面 → 组件 |
| Virtual DOM | 用 JS 对象描述 UI，diff 后只更新变化的真实 DOM | React 内部机制 |

### 3.2 SPA 与前端路由

| 维度 | 传统 MPA | SPA（本实验） |
|------|----------|--------------|
| 页面切换 | 浏览器请求新 HTML，整页刷新 | JS 拦截跳转，局部更新，无刷新 |
| 首屏 | 服务器直出，较快 | 先下载 JS 再渲染，白屏较长（呼应实验一 CSR） |
| SEO | 源码含内容，友好 | 源码是空壳，需额外方案（SSR/预渲染） |
| 路由实现 | 服务器端路由 | 客户端路由（React Router 监听 URL） |

React Router 用 `<Routes>/<Route>` 把 URL 映射到组件；`<Link>`/`useNavigate` 做跳转；`<Outlet>` 在布局中"挖坑"放子页面，实现导航栏不变的嵌套布局。

### 3.3 状态管理方案对比

| 方案 | 适用规模 | 样板代码 | 特点 |
|------|----------|----------|------|
| useState / Props | 单组件或父子传递 | 少 | 够用就别上全局方案 |
| Context | 中小型跨层共享 | 中 | 无第三方，但易引发不必要重渲染 |
| Zustand（本实验） | 中小~中 | 少 | 1KB、按需订阅、API 极简 |
| Redux | 中~大型 | 多 | 可预测、DevTools 强、学习曲线高 |

### 3.4 localStorage 持久化

浏览器 `localStorage` 以键值对存数据，刷新不丢。Zustand 的 `persist` 中间件会自动把 store 状态序列化进 `localStorage`（本实验 key 为 `react-blog-storage`），刷新后自动恢复。

---

## 四、实验内容与步骤

> 命名规则：`se3306-exp2`；每仓库根 `README.md` 为实验报告。本项目为可直接运行的完整 React 博客。

### 任务一：搭建 Vite + React + Tailwind 骨架

```bash
npm create vite@latest react-blog -- --template react
cd react-blog && npm install
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

在 `tailwind.config.js` 的 `content` 声明扫描路径，并在 `index.css` 引入三条指令：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**自检 3 点**：① `npm run dev` 能在 5173 端口打开页面；② Tailwind 工具类即时生效；③ `npm run build` 产出 `dist/`。

### 任务二：布局组件与路由

`main.jsx` 用 `BrowserRouter` 包裹 `App`；`App.jsx` 定义路由表，`Layout` 作为父路由，内部用 `<Outlet/>` 渲染子页面。深色模式通过 `useEffect` 切换 `<html>` 的 `dark` class 实现（`Layout.jsx`）。

**自检 3 点**：① 访问 `/`、`/about`、`/write` 等不刷新即可切换；② 导航栏与页脚在切换时保持不变；③ 点击图标能切换深色/浅色模式。

### 任务三：文章列表首页（搜索 + 标签筛选）

`Home.jsx` 从 store 读取文章，用 `useState` 维护关键词与选中标签，`useMemo` 做派生过滤，再渲染 `ArticleCard` 列表。

**自检 3 点**：① 输入关键词实时过滤；② 点标签按分类筛选；③ 卡片点击跳转到详情页。

### 任务四：文章详情（Markdown + 点赞 + 评论）

`Article.jsx` 用 `useParams` 取 `id`，`marked.parse()` 把 Markdown 正文渲染为 HTML（注入 `dangerouslySetInnerHTML`），点赞/评论写入全局 store。

**自检 3 点**：① 正确渲染 Markdown（标题/列表/代码块/引用）；② 登录后点赞状态切换、数字增减；③ 登录后能发表评论并即时显示。

### 任务五：登录与写文章（Zustand + persist）

`store/blogStore.js` 是数据中枢，管理 `user / articles / comments / dark`，并用 `persist` 持久化。`Login` 把用户名写入 store；`Write` 调用 `addArticle` 发布新文章（未登录引导去登录）。

**自检 3 点**：① 任意账号可登录并显示用户名；② 发布后首页立即出现新文章；③ 刷新后文章/评论/主题仍在（持久化生效）。

### 任务六（选做）：404、响应式与关于页

`NotFound` 用 `path="*"` 兜底；`About` 展示项目说明；Tailwind 的 `md:/lg:` 响应式前缀让列表在手机单列、桌面双列。

---

## 五、核心 API 使用情况对比表（报告要求）

| React 核心概念 | 作用 | 在本项目出现位置 | 掌握情况 |
|----------------|------|----------------|----------|
| 组件 / JSX | 拆分复用 UI | `Layout`、`ArticleCard`、各页面 | ✅ |
| useState | 组件内部状态 | `Home` 搜索/标签、`Login` 表单 | ✅ |
| useMemo | 派生计算/缓存 | `Home` 过滤、`Article` 解析 | ✅ |
| useEffect | 副作用 | `Layout` 主题同步 | ✅ |
| React Router | 客户端路由 | `App.jsx` / `main.jsx` | ✅ |
| Zustand | 全局状态 | `store/blogStore.js` | ✅ |
| persist | 本地持久化 | `blogStore` 中间件 | ✅ |

---

## 六、必答

**（1）什么是组件化？为什么 React 推崇"一切皆组件"？**  
组件化把界面拆成独立、可复用、职责单一的小单元，每个组件管理自己的结构与状态。推崇组件化的原因是：可复用（卡片、按钮处处可用）、可维护（改一处不影响全局）、可组合（搭积木式拼页面），符合"关注点分离"。

**（2）useState 和 props 的区别？数据如何流动？**  
`props` 是父组件传给子组件的**只读**参数，子组件不能改；`useState` 是组件**内部**可变数据，变化时触发自身重渲染。React 数据是**单向**的：自上而下通过 props 传递，自下而上通过回调函数（或全局 store）回传，不存在双向绑定。

**（3）SPA 是什么？它和实验一的 CSR 有什么关系？为什么 SEO 仍是短板？**  
SPA（单页应用）整站只有一个 HTML，路由切换由 JS 局部更新、不刷新页面——这本质上就是实验一的 **CSR**：服务器只返回空壳 + JS，浏览器下载 JS 后才渲染。SEO 仍是短板，因为右键"查看源代码"里没有正文（内容由 JS 运行时生成），搜索引擎爬虫拿不到内容。

**（4）React Router 如何不刷新就"切换页面"？`<Outlet>` 起什么作用？**  
它监听 URL 变化（HTML5 History API），匹配 `<Route>` 渲染对应组件，替换页面局部而非整页重载。`<Outlet>` 是父布局中的"插槽"，子路由组件渲染在它的位置，从而让导航栏/页脚等外壳保持不变（本实验 `Layout` 即如此）。

**（5）为什么选 Zustand 而不是 Context 或 Redux？persist 做了什么？**  
本项目状态跨多个页面共享（用户、文章、评论、主题），用 `useState` 层层透传太烦；Context 在值变化时会让所有消费者重渲染；Redux 样板代码多。Zustand 约 1KB、按需订阅、API 极简，最合适。`persist` 中间件把 store 状态自动序列化进 `localStorage`，初始化时再读回，从而实现刷新不丢数据。

**（6）深色模式怎么实现的？用到了什么机制？**  
`Layout` 用 `useState` 维护 `dark`；`useEffect` 在 `dark` 变化时执行 `document.documentElement.classList.toggle('dark', dark)` 给 `<html>` 加/去 `dark` 类；Tailwind 的 `dark:` 变体据此切换配色。状态本身也由 `persist` 持久化，所以刷新后主题保留。

---

## 七、选答（选 8）

**（8）若把本博客改成 Next.js（SSR），哪些代码要改、哪些不用改？结合实验一谈谈。**  
- **不用大改**：React 组件（`ArticleCard`、`Home`、`Article` 等）、JSX、Tailwind 样式、Zustand 状态逻辑基本可复用——因为都是 React。
- **要改**：路由从 `react-router-dom` 换成 Next 的 `app/` 文件路由；数据获取从客户端 `useState` + `localStorage` 改为服务端组件 / `getServerSideProps` 直连数据库；`BrowserRouter` 不再需要。
- **与实验一呼应**：实验一 SSR 是"服务器现拼完整 HTML 返回、SEO 友好"，Next.js 正是把这件事框架化了；本实验 CSR 空壳的 SEO 短板，在改成 SSR 后即可补齐，代价是需要 Node 服务、首屏逻辑变复杂。

---

## 八、Debug FAQ

- **SPA 部署后刷新子路由 404** → 配置托管平台"所有路径回退到 `index.html`"。
- **Tailwind 样式不生效** → 检查 `tailwind.config.js` 的 `content` 是否覆盖到 `src`。
- **persist 数据不更新** → 改了 store 结构后清一次 `localStorage`（key：`react-blog-storage`）。
- **`dangerouslySetInnerHTML` 报错** → 确认注入的是字符串而非对象（`marked.parse` 返回字符串）。

---

## 九、实验体会

（此处填写本人做实验的收获、踩坑与反思，建议 200 字以上。示例：通过本实验第一次完整跑通一个 React SPA，理解了"组件 + 状态 + 路由 + 持久化"这条现代前端主链路；最深的体会是实验一的 CSR 空壳在真实项目里就是 SPA 的常态，SEO 短板真实存在，后续可用 SSR 弥补；persist 让刷新不丢数据很爽，但也踩了改结构不清缓存的坑。）
