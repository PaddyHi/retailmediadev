import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Dashboard from './components/Dashboard';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Show loading state while Auth0 is initializing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="text-gray-600 font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Modern Sidebar */}
      <aside className="hidden md:flex md:flex-col w-80 bg-white border-r border-gray-200 shadow-sm min-h-screen">
        {/* Header */}
        <div className="flex items-center px-6 py-5 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-xl border border-gray-200 shadow-sm">
              <img 
                src="/favicon.png" 
                alt="Project 01 Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Project 01</h1>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        {isAuthenticated && user && (
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={user.picture || '/default-avatar.png'} 
                    alt={user.name || 'User Avatar'} 
                    className="w-14 h-14 rounded-full border-3 border-white shadow-md object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/default-avatar.png';
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {user.name || 'User'}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {user.email || ''}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-6 py-6">
          <div className="space-y-2">
            <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl border border-indigo-100">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
              </svg>
              Dashboard
            </a>
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          {isAuthenticated ? (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-full flex justify-center">
                <LogoutButton />
              </div>
              <div className="text-center pt-1">
                <p className="text-xs text-gray-400">© 2024 retailmedia.dev</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-full flex justify-center">
                <LoginButton />
              </div>
              <div className="text-center pt-1">
                <p className="text-xs text-gray-400">© 2024 retailmedia.dev</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Message */}
      <div className="md:hidden flex items-center justify-center flex-1 p-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full border border-gray-200 shadow-lg flex items-center justify-center">
            <img 
              src="/favicon.png" 
              alt="Project 01 Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Desktop Required</h2>
          <p className="text-gray-600 max-w-sm">
            This application is optimized for desktop viewing. Please visit us from a larger screen for the best experience.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="hidden md:flex md:flex-1 md:flex-col overflow-hidden">
        {isAuthenticated ? <Dashboard /> : (
          <div className="flex-1 flex">
            <div className="p-10 text-align-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Project 01</h2>
              <p className="text-gray-600 mb-8">Please sign in to access your dashboard</p>
              <LoginButton />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;