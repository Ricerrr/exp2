import { Outlet, Link } from 'react-router-dom'
import { Moon, Sun, PenLine, LogIn, LogOut, User } from 'lucide-react'
import { useBlogStore } from '../store/blogStore.js'
import { useEffect } from 'react'

export default function Layout() {
  const { user, logout, dark, toggleTheme } = useBlogStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl tracking-tight">📝 简单博客</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:text-blue-500">首页</Link>
            <Link to="/about" className="hover:text-blue-500">关于</Link>
            <Link to="/write" className="flex items-center gap-1 hover:text-blue-500">
              <PenLine size={16} /> 写文章
            </Link>

            <button onClick={toggleTheme} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="切换主题">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-gray-600">
                  <User size={14} /> {user.username}
                </span>
                <button onClick={logout} className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                  <LogOut size={14} /> 退出
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <LogIn size={14} /> 登录
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* 内容区 */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 py-6">
        © 2026 简单博客 · React + Vite + Tailwind 示例
      </footer>
    </div>
  )
}
