import { React, useState, useEffect } from 'react'
import { Search, Upload, MessageSquare, ThumbsUp, ThumbsDown, Sun, Moon, Loader2 } from 'lucide-react'
import { getComplaints, getCategoryWeights } from '../services/complaintService.js'

const postCategories = [
  'General',
  'Events',
  'Academics',
  'Clubs & Societies',
  'Lost & Found',
  'Announcements',
]

const sortOptions = ['newest', 'popular']
const viewOptions = ['grid', 'list']

export default function StudentCommunity() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock community data for development
  const MOCK_POSTS = [
    {
      id: '1',
      author: 'u:Student123',
      title: 'Wi-Fi down in Library again',
      content: 'The library Wi-Fi has been down for 3 hours during finals week. This is unacceptable!',
      category: 'General',
      created_at: new Date().toISOString(),
      upvotes: 12,
      downvotes: 3,
      comments: 5,
      isResolved: false,
    },
    {
      id: '2',
      author: 'u:EventPlanner',
      title: 'Career Fair this Thursday',
      content: 'Don\'t forget the Career Fair is happening this Thursday in the Student Center. Free food and networking!',
      category: 'Events',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      upvotes: 8,
      downvotes: 1,
      comments: 2,
      isResolved: false,
    },
    {
      id: '3',
      author: 'u:LabRat',
      title: 'Lab equipment missing',
      content: 'Several beakers and pipettes are missing from the chemistry lab. Reported to admin but no follow-up.',
      category: 'Academics',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      upvotes: 5,
      downvotes: 0,
      comments: 3,
      isResolved: false,
    },
  ]

  useEffect(() => {
    // In production, this would fetch from Supabase
    // For now, use mock data
    let resultPosts = [...MOCK_POSTS]

    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      resultPosts = resultPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.content.toLowerCase().includes(lowercaseQuery) ||
          post.author.toLowerCase().includes(lowercaseQuery) ||
          post.category.toLowerCase().includes(lowercaseQuery)
      )
    }

    // Sort
    resultPosts.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else {
        // Popular: sort by upvotes minus downvotes
        const aScore = a.upvotes - a.downvotes
        const bScore = b.upvotes - b.downvotes
        return bScore - aScore
      }
    })

    setPosts(resultPosts)
    setFilteredPosts(resultPosts)
    setLoading(false)
  }, [searchQuery, sortBy])

  const handleCreatePost = async (e: React.FormEvent, title: string, content: string, category: string) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      setError('Please fill in both title and content')
      return
    }

    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      author: `u:Student${Math.floor(Math.random() * 10000)}`,
      title,
      content,
      category,
      created_at: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      isResolved: false,
    }

    // In production, would call Supabase to create post
    // For now, add to front of list
    setPosts([newPost, ...posts])
    setFilteredPosts([newPost, ...filteredPosts])
  }

  const handleToggleVote = (postId: string, direction: 'up' | 'down') => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              [direction === 'up' ? 'upvotes' : 'downvotes']: (post[direction === 'up' ? 'upvotes' : 'downvotes'] || 0) + 1,
            }
          : post
      )
    )
    setFilteredPosts(
      filteredPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              [direction === 'up' ? 'upvotes' : 'downvotes']: (post[direction === 'up' ? 'upvotes' : 'downvotes'] || 0) + 1,
            }
          : post
      )
    )
  }

  const handleAddComment = (postId: string, content: string) => {
    if (!content.trim()) return

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: (post.comments || 0) + 1,
            }
          : post
      )
    )
    setFilteredPosts(
      filteredPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: (post.comments || 0) + 1,
            }
          : post
      )
    )
  }

  const handleReportPost = (postId: string) => {
    // In production, would report to Supabase
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isResolved: true }
          : post
      )
    )
    setFilteredPosts(
      filteredPosts.map((post) =>
        post.id === postId
          ? { ...post, isResolved: true }
          : post
      )
    )
  }

  // Filter posts based on search and sort
  useEffect(() => {
    if (!posts.length) return

    let resultPosts = [...posts]

    // Filter by search
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      resultPosts = resultPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.content.toLowerCase().includes(lowercaseQuery) ||
          post.author.toLowerCase().includes(lowercaseQuery) ||
          post.category.toLowerCase().includes(lowercaseQuery)
      )
    }

    setFilteredPosts(resultPosts)
  }, [posts, searchQuery])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="flex justify-center">
          <Loader2 className="w-16 h-16 text-indigo-500" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with search and filters */}
      <header className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">Community Feed</h1>
              <Badge status={filteredPosts.length} />
            </div>

            <div className="flex items-center gap-2">
              <select
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
                className`
                  px-3 py-1
                  rounded
                  bg-gray-700 text-white text-sm
                  border-transparent
                  hover:bg-gray-600
                `
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
              </select>

              <select
                onChange={(e) => setViewMode(e.target.value as 'grid' | 'list')}
                className`
                  px-3 py-1
                  rounded
                  bg-gray-700 text-white text-sm
                  border-transparent
                  hover:bg-gray-600
                `
              >
                <option value="grid">Grid</option>
                <option value="list">List</option>
              </select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className`
                  pl-8
                  pr-3
                  py-2
                  rounded
                  bg-gray-800 text-white
                  placeholder-gray-400
                  text-sm
                  outline-none
                  border-transparent
                  hover:bg-gray-700
                `
              />
            </div>
          </div>
        </div>
      </header>

      {/* Create Post Modal */}
      <CreatePostModal
        onCreate={handleCreatePost}
        onClose={() => {}}
        visible={false}
      />

      {/* Posts Feed */}
      <main className="max-w-7xl mx-auto p-6">
        {!filteredPosts.length && searchQuery && (
          <div className="min-h-64 flex flex-col items-center justify-center py-12">
            <p className="text-gray-400">No posts found matching "{searchQuery}"</p>
          </div>
        )}

        {!filteredPosts.length && !searchQuery && (
          <div className="min-h-64 flex flex-col items-center justify-center py-12">
            <p className="text-gray-400">No posts yet. Create one above!</p>
          </div>
        )}

        {filteredPosts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onToggleVote={handleToggleVote}
                onAddComment={handleAddComment}
                onReport={handleReportPost}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Empty state when no posts */}
        {filteredPosts.length === 0 && !searchQuery && (
          <div className="min-h-64 flex flex-col items-center justify-center py-12">
            <p className="text-gray-500">Be the first to create a post!</p>
          </div>
        )}
      </main>
    </div>
  )
}

interface PostCardProps {
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
  onToggleVote: (postId: string, direction: 'up' | 'down') => void
  onAddComment: (postId: string, content: string) => void
  onReport: (postId: string) => void
  viewMode: 'grid' | 'list'
}

function PostCard({ post, onToggleVote, onAddComment, onReport, viewMode }: PostCardProps) {
  const score = post.upvotes - post.downvotes
  const timestamp = new Date(post.created_at)
  const formattedTime = `${timestamp.getMonth() + 1}/${timestamp.getDate()} ${timestamp.getHours() % 12 || 12}:${timestamp.getMinutes().toString().padStart(2, '0')} ${timestamp.getHours() >= 12 ? 'PM' : 'AM'}`

  if (viewMode === 'grid') {
    return (
      <article className`
        bg-gray-800/50
        backdrop-blur-sm
        rounded-2xl
        p-5
        border-l-4
        border-indigo-500
        transition-all
        hover:bg-gray-700/50
        cursor-pointer
      `>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-gray-300 line-clamp-3 mt-1">{post.content.substring(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">{formattedTime}</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => onToggleVote(post.id, 'up')}
                className`
                  text-indigo-400
                  text-sm
                  flex items-center gap-1
                  hover:text-indigo-300
                  transition-colors
                `
                aria-label="Upvote"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 15h5v2h-5zm-5-8h5v6H8v-6zm0 6h5v2H8v-2zm5-17h2v6h6v-6h-2v-6zm-5 8h2v6h6v-6h-2v-6zm5-8h2v6h6v-6h-2v-6z" />
                </svg>
                {post.upvotes}
              </button>
              <span className="text-indigo-400 ml-2">({post.upvotes})</span>
              <button
                onClick={() => onToggleVote(post.id, 'down')}
                className`
                  text-red-400
                  text-sm
                  flex items-center gap-1
                  hover:text-red-300
                  transition-colors
                `
                aria-label="Downvote"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.5 3L4.5 12h3v8l6.5-5.5L10.5 3zm-7 8h14v2H3.5v-2zm0 4h14v2H3.5v-2zm0 4h14v2H3.5v-2z" />
                </svg>
                {post.downvotes}
              </button>
              <span className="text-red-400 ml-2">({post.downvotes})</span>
            </div>
          </div>
        </article>
      )
  }

  return (
    <article className`
      bg-gray-800/50
      backdrop-blur-sm
      rounded-2xl
      p-5
      border-b
      border-gray-700
      transition-colors
      hover:bg-gray-700/80
      cursor-pointer
    `>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium">{post.title}</h3>
          <p className="text-sm text-gray-300 line-clamp-3 mt-1">{post.content.substring(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">{formattedTime}</p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => onToggleVote(post.id, 'up')}
              className`
                text-indigo-400
                text-sm
                flex items-center gap-1
                hover:text-indigo-300
                transition-colors
              `
              aria-label="Upvote"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 15h5v2h-5zm-5-8h5v6H8v-6zm0 6h5v2H8v-2zm5-17h2v6h6v-6h-2v-6zm-5 8h2v6h6v-6h-2v-6zm5-8h2v6h6v-6h-2v-6z" />
              </svg>
              {post.upvotes}
            </button>
            <span className="text-indigo-400 ml-2">({post.upvotes})</span>
            <button
              onClick={() => onToggleVote(post.id, 'down')}
              className`
                text-red-400
                text-sm
                flex items-center gap-1
                hover:text-red-300
                transition-colors
              `
              aria-label="Downvote"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.5 3L4.5 12h3v8l6.5-5.5L10.5 3zm-7 8h14v2H3.5v-2zm0 4h14v2H3.5v-2zm0 4h14v2H3.5v-2z" />
              </svg>
              {post.downvotes}
            </button>
            <span className="text-red-400 ml-2">({post.downvotes})</span>
            <button
              onClick={() => onAddComment(post.id, '')}
              className`
                text-green-400
                text-sm
                flex items-center gap-1
                hover:text-green-300
                transition-colors
              `
              aria-label="Comment"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.041 17.942A5.997 5.997 0 0 0 6 22a5.991 5.991 0 0 0 3.677-1.858l-1.51 2.072A3.988 3.988 0 0 1 17 17.962c0-2.058-.577-3.898-1.683-5.548l1.753-2.411a5.986 5.986 0 0 0-1.88-2.536l-1.766 2.33a3.988 3.988 0 0 1-2.728.737H5.708l-1.736-2.308a5.987 5.987 0 0 0-2.758.248l-1.828.615z" />
              </svg>
              {post.comments}
            </button>
            <span className="text-green-400 ml-2">({post.comments})</span>
          </div>
        </div>
      </article>
    )
  )
}

interface CreatePostModalProps {
  onCreate: (e: React.FormEvent, title: string, content: string, category: string) => void
  onClose: () => void
  visible: boolean
}

function CreatePostModal({ onCreate, onClose, visible }: CreatePostModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(postCategories[0])
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm hidden" id="modal-root">
      {visible && (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl w-full max-w-2xl m-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              Close
            </button>

            <h2 className="text-2xl font-bold text-center pb-4 border-b border-gray-600">Create Post</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                onCreate(e, title, content, category)
                setOpen(false)
                setTitle('')
                setContent('')
              }}
            >
              <div className="grid grid-cols-1 gap-4 pb-4">
                <label className="text-sm text-gray-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className`
                    px-3 py-2
                    rounded
                    bg-gray-700 text-white
                    border-transparent
                    hover:bg-gray-600
                  `
                >
                  {postCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's on your mind?"
                  className`
                    w-full
                    py-2
                    rounded
                    bg-gray-700
                    text-white
                    placeholder-gray-400
                    outline-none
                    transition-colors
                    hover:bg-gray-600
                  `
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={3}
                  className`
                    w-full
                    py-2
                    rounded
                    bg-gray-700
                    text-white
                    placeholder-gray-400
                    outline-none
                    resize-none
                    transition-colors
                    hover:bg-gray-600
                  `
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}