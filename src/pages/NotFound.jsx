import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="text-6xl font-bold mb-3">404</h1>
      <p className="text-gray-500 mb-6">页面不存在</p>
      <Link to="/" className="text-blue-500 hover:underline">← 回到首页</Link>
    </div>
  )
}
