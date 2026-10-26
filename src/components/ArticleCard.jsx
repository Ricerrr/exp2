import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ArticleCard({ article }) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition"
    >
      {article.cover && (
        <div className="aspect-[16/8] bg-gray-100 overflow-hidden">
          <img src={article.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 group-hover:text-blue-500 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{article.summary}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.createdAt}</span>
          </div>
          <div className="flex items-center gap-1 text-pink-500">
            <Heart size={13} fill="currentColor" /> {article.likes}
          </div>
        </div>
        {article.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {article.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
