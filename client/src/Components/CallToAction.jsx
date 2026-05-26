import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <section className="mb-section-padding px-margin-mobile">
      <div className="max-w-container-max mx-auto bg-accent-orange-muted border border-outline-variant rounded-xl p-8 md:p-section-padding text-center">
        <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight mb-stack-md">
          Ready to modernize your elections?
        </h2>
        <p className="text-lg md:text-xl text-on-surface-variant mb-stack-lg max-w-2xl mx-auto leading-relaxed">
          Join hundreds of organizations already using Votera to power their democratic processes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-stack-md">
          <Link
            to="/vote"
            className="px-8 py-4 bg-primary-container text-white font-semibold rounded-lg hover:opacity-90 transition-all text-center"
          >
            Get Started Now
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 border border-primary text-primary font-semibold rounded-lg hover:bg-white transition-all text-center"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
