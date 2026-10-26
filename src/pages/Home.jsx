import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import ArticleCard from '../components/ArticleCard.jsx'
import { useBlogStore } from '../store/blogStore.js'

export default function Home() {
  const articles = useBlogStore((s) => s.articles)
  const [keyword, setKeyword] = useState('')
  const [activeTag, setActiveTag] = useState('')

  const allTags = useMemo(() => {
    const set = new Set()
    articles.forEach((a) => a.tags?.forEach((t) => set.add(t)))
    return Array.from(set)
  }, [articles])

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchKw = !keyword || a.title.includes(keyword) || a.summary.includes(keyword)
      const matchTag = !activeTag || a.tags?.includes(activeTag)
      return matchKw && matchTag
    })
  }, [articles, keyword, activeTag])

  return (
    <div>
      {/* 搜索栏 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索文章标题或摘要..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={activeTag}
          onChange={(e) => setActiveTag(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">全部分类</option>
          {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* 标签快速筛选 */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTag('')}
            className={`px-3 py-1 rounded-full text-sm border ${activeTag === '' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 dark:border-gray-700 hover:border-blue-500'}`}
          >全部</button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(activeTag === t ? '' : t)}
              className={`px-3 py-1 rounded-full text-sm border ${activeTag === t ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 dark:border-gray-700 hover:border-blue-500'}`}
            >{t}</button>
          ))}
        </div>
      )}

      {/* 文章列表 */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">没有找到相关文章</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}
    </div>
  )
}
