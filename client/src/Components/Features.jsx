import {  ClockIcon,PlusCircleIcon, ViewfinderCircleIcon, StarIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Create or Join an Election.',
    description:
      'Set up a new election or join one using your access code.',
    icon: PlusCircleIcon,
  },
  {
    name: 'View Candidates',
    description: 'Explore candidate profiles, manifestos, and campaign promises.',
    icon: ViewfinderCircleIcon,
  },
  {
    name: 'Cast Your Vote',
    description: 'Make your selection securely in just a few clicks',
    icon: StarIcon,
  },
  {
    name: 'See the Results',
    description: 'Watch the outcome unfold transparently, in real-time.',
    icon: ClockIcon,
  },
]

export default function Features() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-[#e65c00]">Voting Made Easy</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                How Votera Works
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Votera makes participating in elections simple and secure. Whether you're organizing a vote or casting your ballot, our platform guides you through every step with ease. Here's how it works:
              </p>
              <div className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <p className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-7 text-[#e65c00]" />
                      {feature.name}
                    </p><br/>
                    <p className="inline">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}
