import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useBlogStore } from '../store/blogStore.js'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()
  const login = useBlogStore((s) => s.login)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setErr('用户名和密码不能为空')
      return
    }
    login(username.trim())
    navigate('/', { replace: true })
  }

  return (
    <div className="max-w-sm mx-auto mt-12">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5 text-gray-600 dark:text-gray-400">用户名</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="任意用户名即可"
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5 text-gray-600 dark:text-gray-400">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="任意密码即可（演示用）"
            />
          </div>
          {err && <p className="text-sm text-red-500">{err}</p>}
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">登录</button>
        </form>
        <p className="text-xs text-gray-400 text-center mt-4">
          演示模式，输入任意内容即可登录 · <Link to="/" className="hover:text-blue-500">返回首页</Link>
        </p>
      </div>
    </div>
  )
}
