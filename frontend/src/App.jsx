import { RouterRoutes, RouterLink } from 'react-router-dom'
import { React } from 'react'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import MainContent from '../components/layout/MainContent'
import Dashboard from '../pages/Dashboard'
import Complaints from '../pages/Complaints'
import Priority from '../pages/Priority'
import Analytics from '../pages/Analytics'
import Assistant from '../pages/Assistant'
import Welcome from '../pages/Welcome'
import StudentCommunity from '../pages/StudentCommunity'
import AdminCommunityModeration from '../pages/AdminCommunityModeration'
import './index.css'

const routeElements = {
  '/': Dashboard,
  '/complaints': Complaints,
  '/priority': Priority,
  '/analytics': Analytics,
  '/assistant': Assistant,
}

function App() {
  const [selectedRole, setSelectedRole] = React.useState<'student' | 'admin' | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Welcome
        selectedRole={selectedRole}
        onRoleSelect={(role: 'student' | 'admin') => setSelectedRole(role)}
      />
      <TopBar role={selectedRole} />
      <RouterRoutes>

        <RouterRoute path="/" element={
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              {selectedRole === 'student' ? <StudentCommunity /> : null}
            </MainContent>
          </div>
        } />

        <RouterRoute path="/complaints" element={
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              <Complaints />
            </MainContent>
          </div>
        } />

        <RouterRoute path="/priority" element={
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              <Priority />
            </MainContent>
          </div>
        } />

        <RouterRoute path="/analytics" element={
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              <Analytics />
            </MainContent>
          </div>
        } />

        <RouterRoute path="/assistant" element={
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              <Assistant />
            </MainContent>
          </div>
        } />

        {/* Role-specific routes */}
        <RouterRoute path="/student" element={
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              <StudentCommunity />
            </MainContent>
          </div>
        } />

        <RouterRoute path="/admin" element={
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              <AdminCommunityModeration />
            </MainContent>
          </div>
        } />

      </RouterRoutes>
    </div>
  )
}

export default App