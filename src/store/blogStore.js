import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INITIAL_ARTICLES } from '../data/mock.js'

export const useBlogStore = create(
  persist(
    (set, get) => ({
      // 用户状态
      user: null, // { username }
      login: (username) => set({ user: { username } }),
      logout: () => set({ user: null }),

      // 文章
      articles: INITIAL_ARTICLES,
      addArticle: (article) =>
        set((s) => ({
          articles: [
            { ...article, id: Date.now(), createdAt: new Date().toISOString().slice(0, 10), likes: 0, likedBy: [] },
            ...s.articles
          ]
        })),

      // 点赞
      toggleLike: (articleId) => {
        const username = get().user?.username
        if (!username) return
        set((s) => ({
          articles: s.articles.map((a) => {
            if (a.id !== articleId) return a
            const liked = a.likedBy.includes(username)
            return {
              ...a,
              likes: liked ? a.likes - 1 : a.likes + 1,
              likedBy: liked ? a.likedBy.filter((u) => u !== username) : [...a.likedBy, username]
            }
          })
        }))
      },

      // 评论
      comments: {}, // { articleId: [{ id, username, content, createdAt }] }
      addComment: (articleId, content) => {
        const username = get().user?.username || '匿名'
        const list = get().comments[articleId] || []
        const newComment = {
          id: Date.now(),
          username,
          content,
          createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
        }
        set((s) => ({
          comments: { ...s.comments, [articleId]: [newComment, ...list] }
        }))
      },

      // 主题
      dark: false,
      toggleTheme: () => set((s) => ({ dark: !s.dark }))
    }),
    { name: 'react-blog-storage' }
  )
)
