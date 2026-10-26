import { useParams, Link, useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react'
import { useBlogStore } from '../store/blogStore.js'
import { useState, useMemo } from 'react'

// 配置 marked
marked.setOptions({ breaks: true, gfm: true })

export default function Article() {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = useBlogStore((s) => s.articles.find((a) => String(a.id) === id))
  const { user, toggleLike, comments, addComment } = useBlogStore()
  const [commentText, setCommentText] = useState('')

  const articleComments = comments[article?.id] || []

  const html = useMemo(() => (article ? marked.parse(article.content) : ''), [article])

  if (!article) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">文章不存在或已被删除</p>
        <Link to="/" className="text-blue-500">返回首页</Link>
      </div>
    )
  }

  const liked = article.likedBy.includes(user?.username)

  const handleComment = () => {
    if (!commentText.trim()) return
    if (!user) {
      alert('请先登录再评论')
      navigate('/login')
      return
    }
    addComment(article.id, commentText.trim())
    setCommentText('')
  }

  return (
    <article className="max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 mb-4">
        <ArrowLeft size={14} /> 返回
      </button>

      {article.cover && (
        <img src={article.cover} alt="" className="w-full rounded-xl mb-6 aspect-[16/7] object-cover" />
      )}

      <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
        <span>作者：{article.author}</span>
        <span>·</span>
        <span>{article.createdAt}</span>
        {article.tags?.map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">#{t}</span>
        ))}
      </div>

      {/* 正文 */}
      <div
        className="prose-blog dark:text-gray-200"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* 点赞 */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <button
          onClick={() => toggleLike(article.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
            liked ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-500' : 'border-gray-200 dark:border-gray-700 hover:border-pink-400'
          }`}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} /> {article.likes}
        </button>
        <div className="flex items-center gap-1 text-gray-500">
          <MessageCircle size={16} /> {articleComments.length} 评论
        </div>
      </div>

      {/* 评论区 */}
      <div className="mt-8">
        <h3 className="font-bold text-lg mb-4">评论 ({articleComments.length})</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            placeholder={user ? '说点什么...' : '登录后才能评论'}
            className="w-full bg-transparent resize-none focus:outline-none"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleComment}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
            >发布</button>
          </div>
        </div>

        <div className="space-y-3">
          {articleComments.map((c) => (
            <div key={c.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="font-semibold">{c.username}</span>
                <span className="text-gray-400">{c.createdAt}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{c.content}</p>
            </div>
          ))}
          {articleComments.length === 0 && (
            <p className="text-center text-gray-400 py-6">还没有评论，来抢沙发吧 🛋️</p>
          )}
        </div>
      </div>
    </article>
  )
}
