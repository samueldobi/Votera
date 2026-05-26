import { useState } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from '../Components/Vote-Components/AlertBox'
import { useRedirectAfterAuth } from '../hooks/useRedirectAfterAuth'
import apiClient from '../utils/Config'

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const redirectAfterAuth = useRedirectAfterAuth('/')
  const [loginError, setLoginError] = useState('')

  const handleChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await apiClient.post(`${apiUrl}/login`, loginForm, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token)
      }
      redirectAfterAuth()
    } catch (error) {
      setLoginError(error.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-margin-mobile py-stack-lg bg-surface-background">
      <div className="w-full max-w-md">
        <div className="bg-white border border-outline-variant rounded-xl p-8 md:p-10 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-accent-orange-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">how_to_vote</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-on-background">Welcome back</h1>
            <p className="text-on-surface-variant mt-2">Sign in to your Votera account</p>
          </div>

          {loginError && (
            <div className="mb-6">
              <AlertBox text={loginError} />
            </div>
          )}

          <form onSubmit={handleLogin} onChange={handleChange} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-on-background mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-lg bg-surface-subtle border border-outline-variant px-4 py-3 text-on-background placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-on-background">
                  Password
                </label>
                <a href="#" className="text-sm text-primary hover:underline underline-offset-4">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-lg bg-surface-subtle border border-outline-variant px-4 py-3 text-on-background placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary-container text-white font-semibold rounded-lg hover:opacity-90 transition-all text-center"
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-on-surface-variant">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline underline-offset-4">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
