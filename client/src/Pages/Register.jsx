import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NewRegister from '../Components/Vote-Components/Registered/NewRegister'
import AlertBox from '../Components/Vote-Components/AlertBox'

const Register = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [registerForm, setRegisterForm] = useState({ email: '', username: '', password: '' })
  const [newUsername, setNewUsername] = useState('')
  const [registered, setRegistered] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleChange = (e) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${apiUrl}/signup`, registerForm, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token)
      }
      setNewUsername(registerForm.username)
      setRegisterForm({ email: '', username: '', password: '' })
      setRegistered(true)
    } catch (error) {
      const errors = error.response?.data?.errors
      if (errors) {
        if (errors.email) setEmailError(typeof errors.email === 'string' ? errors.email : errors.email.message || 'Try another email')
        if (errors.username) setUsernameError(typeof errors.username === 'string' ? errors.username : errors.username.message || 'Try another username')
        if (errors.password) setPasswordError(typeof errors.password === 'string' ? errors.password : errors.password.message || 'Minimum length is 6 characters')
      }
    }
  }

  if (registered) {
    return <NewRegister text={newUsername} />
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-margin-mobile py-stack-lg bg-surface-background">
      <div className="w-full max-w-md">
        <div className="bg-white border border-outline-variant rounded-xl p-8 md:p-10 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-accent-orange-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">how_to_vote</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-on-background">Create your account</h1>
            <p className="text-on-surface-variant mt-2">Join Votera and start voting today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-on-background mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={registerForm.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="block w-full rounded-lg bg-surface-subtle border border-outline-variant px-4 py-3 text-on-background placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="you@example.com"
              />
              {emailError && (
                <div className="mt-2">
                  <AlertBox text={emailError} />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-on-background mb-1.5">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={registerForm.username}
                onChange={handleChange}
                required
                autoComplete="username"
                className="block w-full rounded-lg bg-surface-subtle border border-outline-variant px-4 py-3 text-on-background placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="Choose a username"
              />
              {usernameError && (
                <div className="mt-2">
                  <AlertBox text={usernameError} />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-on-background mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={registerForm.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="block w-full rounded-lg bg-surface-subtle border border-outline-variant px-4 py-3 text-on-background placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="Min. 6 characters"
              />
              {passwordError && (
                <div className="mt-2">
                  <AlertBox text={passwordError} />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary-container text-white font-semibold rounded-lg hover:opacity-90 transition-all text-center"
            >
              Register
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-on-surface-variant">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline underline-offset-4">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
