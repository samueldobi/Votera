import React from 'react'
import Button from '../Components/Button'

const Hero = () => {
  return (

    <div className="bg-gray-50 py-10 sm:py-32">
    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h2 className="orange-color text-center text-base/7 font-semibold">Vote, Decide, Empower</h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
        Votera makes online voting easy, secure, and accessible
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        {<Button text= "Create Poll" href= "/vote" />}
        {<Button text= "Register" href= "/register" />}
      </div>
      <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
        <div className="relative lg:row-span-2">
          <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                Secure Voting
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                All votes are encrypted and tamper-proof.
              </p>
            </div>
            <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
              <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                <img
                  className="size-full object-cover object-top"
                  src="images/secure-voting.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
        </div>
        <div className="relative max-lg:row-start-1">
          <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Fast & Easy</p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
              Vote in seconds from your phone or laptop.
              </p>
            </div>
            <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
              <img
                className="w-full max-lg:max-w-xs"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                alt=""
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
        </div>
        <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
          <div className="absolute inset-px rounded-lg bg-white"></div>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Live Results</p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                See transparent, real-time results once you vote.
              </p>
            </div>
            <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
              <img
                className="h-[min(152px,40cqw)] object-cover"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                alt=""
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
        </div>
        <div className="relative lg:row-span-2">
          <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
              Accessible Anywhere
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
              Perfect for schools, teams, and communities globally.
              </p>
            </div>
            <div className="relative min-h-[30rem] w-full grow">
              {/* <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                  <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                    <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                      NotificationSetting.jsx
                    </div>
                    <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                  </div>
                </div>
                <div className="px-6 pt-6 pb-14"></div>
              </div> */}
              <img
                className="h-[min(152px,40cqw)] object-cover"
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                alt=""
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Hero