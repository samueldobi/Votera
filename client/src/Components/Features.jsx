const steps = [
  {
    number: 1,
    title: 'Create Your Election',
    description: 'Securely confirm your identity using government-grade authentication and set up your ballot in minutes.',
  },
  {
    number: 2,
    title: 'Invite Voters',
    description: 'Review clear, accessible ballot options tailored to your organization and distribute access securely.',
  },
  {
    number: 3,
    title: 'Cast Encrypted Votes',
    description: 'Each selection is instantly encrypted and submitted to the secure ledger with full transparency.',
  },
  {
    number: 4,
    title: 'Verify & Audit Results',
    description: 'Receive real-time results and unique tracking IDs to verify every vote was counted correctly.',
  },
]

const Features = () => {
  return (
    <section className="py-section-padding px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-[1.2] mb-12 lg:mb-16">
            How it Works
          </h2>
          <div className="space-y-10 lg:space-y-12">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-stack-lg">
                <span className="text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold text-primary leading-none shrink-0">
                  {step.number}
                </span>
                <div>
                  <h4 className="text-xl md:text-2xl font-semibold mb-2">{step.title}</h4>
                  <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-subtle p-stack-lg rounded-xl border border-outline-variant">
          <div className="bg-white rounded-lg shadow-sm border border-outline-variant overflow-hidden">
            <div className="p-stack-md border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-surface-subtle">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                Official Ballot: 2024 General
              </span>
              <span className="text-xs font-bold text-primary">● SECURE SESSION</span>
            </div>
            <div className="p-stack-lg space-y-stack-lg">
              <div>
                <h5 className="font-semibold text-on-background mb-stack-md">Select your representative</h5>
                <div className="space-y-stack-md">
                  {[
                    { name: 'Sarah J. Miller', party: 'Democratic Alliance' },
                    { name: 'Marcus Chen', party: 'Civic Progress Party' },
                    { name: 'Elena Rodriguez', party: 'Independent' },
                  ].map((candidate, i) => (
                    <label
                      key={candidate.name}
                      className={`flex items-center p-stack-md border rounded-lg cursor-pointer transition-all ${
                        i === 0
                          ? 'border-primary bg-accent-orange-muted'
                          : 'border-outline-variant hover:bg-surface-subtle'
                      }`}
                    >
                      <input
                        type="radio"
                        name="candidate"
                        defaultChecked={i === 0}
                        className="h-5 w-5 text-primary border-outline focus:ring-primary shrink-0"
                      />
                      <div className="ml-stack-md">
                        <p className="font-semibold text-sm sm:text-base">{candidate.name}</p>
                        <p className="text-xs sm:text-sm text-on-surface-variant">{candidate.party}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="pt-stack-md">
                <button className="w-full py-4 bg-primary-container text-white font-semibold rounded-lg uppercase tracking-widest shadow-sm hover:opacity-90 transition-all text-sm sm:text-base">
                  Submit Final Ballot
                </button>
                <p className="text-center text-xs sm:text-sm text-on-surface-variant mt-stack-md italic">
                  By clicking, you confirm this selection is final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
