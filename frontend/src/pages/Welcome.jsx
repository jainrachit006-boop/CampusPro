import { React, useState } from 'react'
import { Search, User, Shield, GraduationCap, Building } from 'lucide-react'

const roleOptions = [
  { 
    value: 'student', 
    label: 'Student', 
    description: 'Submit complaints, view community posts, upvote/downvote',
    icon: User,
    color: 'from-blue-500 to-blue-600'
  },
  { 
    value: 'admin', 
    label: 'Administrator', 
    description: 'View and resolve complaints, moderate community posts',
    icon: Shield,
    color: 'from-red-500 to-red-600'
  },
]

export default function WelcomePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showOverview, setShowOverview] = useState(false)

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    setShowOverview(true)
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Campus Intelligence</h1>
          <p className="text-gray-300 text-lg max-w-md">AI-assisted Campus Complaint Management and Operational Intelligence System</p>
          
          <div className="mt-10 space-y-4">
            {roleOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleRoleSelect(option.value)}
                className`
                  cursor-pointer
                  px-8 py-4
                  border-2 border-transparent rounded-3xl
                  bg-gradient-from-indigo-600 hover:border-indigo-300 hover:bg-indigo-900
                  transition-all duration-300
                  ${option.color}
                `
              >
                <div className="flex items-center gap-3 mb-2">
                  <option.icon className="w-6 h-6" />
                  <span className="font-medium">{option.label}</span>
                </div>
                <p className="text-sm text-indigo-200">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Route based on selected role
  const routes = {
    student: '/student',
    admin: '/admin',
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 left-0 right-0 bg-gray-800/80 backdrop-blur-lg border-b border-gray-700/50 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Campus Intelligence</h1>
          {selectedRole && (
            <span className="text-sm text-gray-300">
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} mode
            </span>
          )}
        </div>
      </nav>

      <main className="pt-24">
        {showOverview && selectedRole === 'student' && (
          <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Welcome, Student</h2>
            <p className="text-gray-300 text-base mb-8">
              Submit complaints about campus facilities, browse the community feed, and 
              engage with fellow students. Use the navigation to explore everything Campus 
              Intelligence has to offer.
            </p>
            <div className="flex gap-3">
              <a
                href="/complaints"
                className`
                  flex-1
                  px-6 py-3
                  rounded-2xl
                  bg-indigo-600 hover:bg-indigo-500
                  transition-colors
                  text-white
                  font-medium
                `
              >
                Submit a Complaint
              </a>
              <a
                href="/community"
                className`
                  flex-1
                  px-6 py-3
                  rounded-2xl
                  bg-purple-600 hover:bg-purple-500
                  transition-colors
                  text-white
                  font-medium
                `
              >
                Community Feed
              </a>
            </div>
          </div>
        )}

        {showOverview && selectedRole === 'admin' && (
          <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Welcome, Administrator</h2>
            <p className="text-gray-300 text-base mb-8">
              View and resolve complaints, moderate community posts, and monitor campus 
              operations. Use the dashboard to maintain campus safety and engagement.
            </p>
            <div className="flex gap-3">
              <a
                href="/complaints"
                className`
                  flex-1
                  px-6 py-3
                  rounded-2xl
                  bg-indigo-600 hover:bg-indigo-500
                  transition-colors
                  text-white
                  font-medium
                `
              >
                Complaints Dashboard
              </a>
              <a
                href="/admin/community-moderation"
                className`
                  flex-1
                  px-6 py-3
                  rounded-2xl
                  bg-red-600 hover:bg-red-500
                  transition-colors
                  text-white
                  font-medium
                `
              >
                Community Moderation
              </a>
            </div>
          </div>
        )}

        {!showOverview && selectedRole && (
          <div className="absolute top-64 left-1/2 -translate-x-1/2 text-center">
            <p className="text-gray-400 text-sm">
              Select your role above to continue
            </p>
          </div>
        )}
      </main>
    </div>
  )
}