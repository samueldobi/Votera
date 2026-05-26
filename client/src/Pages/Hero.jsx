import { Link } from 'react-router-dom'

const features = [
  {
    icon: 'verified_user',
    title: 'Secure Voting',
    description: 'Our end-to-end encryption ensures every vote is cast privately and counted exactly as intended.',
    large: true,
    img: '/images/hero-1.png',
  },
  {
    icon: 'public',
    title: 'Global Accessibility',
    description: 'Vote from any device, anywhere in the world.',
    large: false,
    img: '/images/hero-2.png',
  },
  {
    icon: 'analytics',
    title: 'Real-time Auditing',
    description: 'Verify the integrity of results as they come in.',
    large: false,
    img: '/images/hero-3.png',
  },
  {
    icon: 'history_edu',
    title: 'Fast And Easy',
    description: 'Join a new era of digital democracy',
    wide: true,
    img: '/images/hero-4.png',
  },
]

const Hero = () => {
  return (
    <div className="bg-surface-background text-on-surface antialiased">
      <section className="pt-section-padding pb-stack-lg px-margin-mobile md:px-gutter max-w-container-max mx-auto text-center">
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.1] mb-stack-md max-w-4xl mx-auto">
          Next-generation <span className="text-primary">democracy</span> starts here.
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant mb-stack-lg max-w-2xl mx-auto leading-relaxed">
          Secure, transparent, and immutable voting infrastructure for modern governments and organizations worldwide.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-stack-md">
          <Link
            to="/vote"
            className="px-8 py-4 bg-primary-container text-white font-semibold rounded-lg hover:opacity-90 transition-all text-center"
          >
            Launch Election
          </Link>
          <Link
            to="/register"
            className="px-8 py-4 border border-on-background text-on-background font-semibold rounded-lg hover:bg-surface-subtle transition-all text-center"
          >
            View Demo
          </Link>
        </div>
      </section>

      <section className="pb-section-padding px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-md lg:h-[600px]">
          {features.map((f) => {
            if (f.large) {
              return (
                <div
                  key={f.title}
                  className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-xl group cursor-pointer"
                >
                  <img
                    src={f.img}
                    alt={f.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="relative z-10 p-stack-lg flex flex-col justify-end h-full min-h-[300px] lg:min-h-0">
                    <span className="material-symbols-outlined text-white/80 text-3xl mb-3">{f.icon}</span>
                    <h3 className="text-2xl md:text-[30px] font-semibold text-white mb-stack-sm">{f.title}</h3>
                    <p className="text-base md:text-lg text-white/80 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              )
            }
            if (f.wide) {
              return (
                <div
                  key={f.title}
                  className="md:col-span-2 lg:col-span-3 relative overflow-hidden rounded-xl group cursor-pointer min-h-[160px]"
                >
                  <img
                    src={f.img}
                    alt={f.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  <div className="relative z-10 p-stack-lg flex items-center gap-stack-lg h-full flex-col sm:flex-row">
                    <span className="material-symbols-outlined text-white/80 text-3xl shrink-0">{f.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white text-lg mb-1">{f.title}</h4>
                      <p className="text-base text-white/80">{f.description}</p>
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <div
                key={f.title}
                className="relative overflow-hidden rounded-xl group cursor-pointer min-h-[220px]"
              >
                <img
                  src={f.img}
                  alt={f.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div className="relative z-10 p-stack-lg flex flex-col justify-end h-full">
                  <span className="material-symbols-outlined text-white/80 text-2xl mb-2">{f.icon}</span>
                  <h4 className="font-semibold text-white mb-1">{f.title}</h4>
                  <p className="text-sm text-white/80">{f.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Hero
