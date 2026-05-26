import { Link } from 'react-router-dom'

const NewRegister = ({ text }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-margin-mobile py-stack-lg bg-surface-background">
      <div className="w-full max-w-md">
        <div className="bg-white border border-outline-variant rounded-xl p-8 md:p-10 shadow-sm text-center">
          <div className="w-16 h-16 bg-accent-orange-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-4xl">how_to_vote</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-on-background mb-2">Congratulations!</h1>

          {text && (
            <p className="text-xl md:text-2xl font-semibold text-primary mb-2">{text}</p>
          )}

          <p className="text-lg text-on-surface-variant mb-8">
            You have successfully registered!
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px bg-outline-variant flex-1 max-w-12" />
            <span className="material-symbols-outlined text-primary text-base">verified</span>
            <span className="h-px bg-outline-variant flex-1 max-w-12" />
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-container text-white font-semibold rounded-lg hover:opacity-90 transition-all"
          >
            Continue to Login
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewRegister
