import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import { Eye, EyeOff } from 'lucide-react'
import { useBlogStore } from '../store/blogStore.js'

marked.setOptions({ breaks: true, gfm: true })

export default function Write() {
  const user = useBlogStore((s) => s.user)
  const addArticle = useBlogStore((s) => s.addArticle)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [tags, setTags] = useState('')
  const [cover, setCover] = useState('')
  const [content, setContent] = useState('# 开始你的文章\n\n支持 **Markdown** 格式')
  const [preview, setPreview] = useState(false)

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">请先登录再写文章</p>
        <button onClick={() => navigate('/login')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">去登录</button>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('标题和内容不能为空')
      return
    }
    addArticle({
      title: title.trim(),
      summary: summary.trim() || content.trim().slice(0, 60) + '...',
      content,
      cover: cover.trim() || '',
      tags: tags.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean),
      author: user.username
    })
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-6">写新文章</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="文章标题"
        className="w-full px-3 py-2 text-lg font-semibold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="文章摘要（可选，留空自动截取前60字）"
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="标签，用逗号分隔 如：React, 前端"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          placeholder="封面图 URL（可选）"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 编辑器 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">
          <span className="text-gray-500">Markdown 编辑器</span>
          <button type="button" onClick={() => setPreview(!preview)} className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
            {preview ? <EyeOff size={14} /> : <Eye size={14} />} {preview ? '编辑' : '预览'}
          </button>
        </div>
        {preview ? (
          <div className="prose-blog dark:text-gray-200 p-5 min-h-[300px]" dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            className="w-full p-5 bg-transparent resize-none focus:outline-none font-mono text-sm"
          />
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">取消</button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">发布文章</button>
      </div>
    </form>
  )
}
