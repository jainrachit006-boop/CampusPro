import { React, useState, useEffect } from 'react'
import { Search, MessageSquare, Shield, Trash2, Loader2 } from 'lucide-react'

export default function AdminCommunityModeration() {
  const [posts, setPosts] = useState([])
  const [loading] = useState(true)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    // In production, fetch reported posts from Supabase
    // For demo, use mock data
    const MOCK_REPORTED_POSTS = [
      {
        id: '1',
        author: 'u:ProblemStudent',
        title: 'Spam post about crypto',
        content: 'Crypto investment opportunity guaranteed returns! Join now!',
        category: 'General',
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        upvotes: 0,
        downvotes: 5,
        comments: 2,
        isResolved: false,
      },
      {
        id: '2',
        author: 'u:Anonymous',
        title: 'Inappropriate content',
        content: 'This post contains content that should not be shown on campus platform.',
        category: 'Events',
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        upvotes: 1,
        downvotes: 8,
        comments: 1,
        isResolved: false,
      },
    ]

    setPosts([...MOCK_REPORTED_POSTS])
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="flex justify-center">
          <Loader2 className="w-16 h-16 text-indigo-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Community Moderation</h1>
          <span className="text-sm text-gray-400">View reported posts</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-indigo-400">{posts.length}</p>
            <p className="text-xs text-gray-400">Reported Posts</p>
          </div>
          <div className="bg-gray-700/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-green-400">0</p>
            <p className="text-xs text-gray-400">Resolved</p>
          </div>
          <div className="bg-gray-700/50 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-400">0</p>
            <p className="text-xs text-gray-400">Removed</p>
          </div>
        </div>

        {/* Reported posts list */}
        {posts.length === 0 ? (
          <div className="min-h-64 flex flex-col items-center justify-center py-12">
            <p className="text-gray-500">No reported posts at this time</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <ReportCard
                key={post.id}
                post={post}
                onResolve={() => {
                  // In production, would update Supabase
                  setPosts(posts.filter((p) => p.id !== post.id))
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

interface ReportCardProps {
  post: {
    id: string
    author: string
    title: string
    content: string
    category: string
    created_at: string
    upvotes: number
    downvotes: number
    comments: number
    isResolved: boolean
  }
  onResolve: () => void
}

function ReportCard({ post, onResolve }: ReportCardProps) {
  const score = post.upvotes - post.downvotes
  const timestamp = new Date(post.created_at)
  const formattedTime = `${timestamp.getMonth() + 1}/${timestamp.getDate()}, ${timestamp.getHours() % 12 || 12}:${timestamp.getMinutes().toString().padStart(2, '0')} ${timestamp.getHours() >= 12 ? 'PM' : 'AM'}`

  return (
    <div className`
      bg-gray-800/50
      backdrop-blur-sm
      rounded-2xl
      p-5
      border-l-4
      border-red-500
      transition-all
      hover:bg-gray-700/80
    `>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-indigo-300">{post.title}</h3>
          <p className="text-sm text-gray-300 line-clamp-2 mt-1">{post.content.substring(0, 80)}{post.content.length > 80 ? '...' : ''}</p>
          <p className="text-xs text-gray-400">by {post.author} · {formattedTime}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Score: {score}</p>
          <button
            onClick={onResolve}
            className`
              px-3
              py-1
              rounded
              bg-red-600
              text-white
              text-sm
              hover:bg-red-500
              transition-colors
            `
            aria-label="Mark as resolved"
          >
            Resolve
          </button>
        </div>
      </div>
    </div>
  )
}