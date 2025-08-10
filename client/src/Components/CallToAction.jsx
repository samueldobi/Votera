import {CtaIcon} from '../assets/SvgIcons'
import Button from './Button'
export default function CallToAction() {
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex justify-center lg:gap-x-20 lg:px-24 lg:pt-0">
          <CtaIcon/>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto py-32 px-2">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              Make Every Vote Count with Votera
            </h2>
            <p className="mt-6 text-lg/8 text-pretty text-gray-300">
             Join a new era of digital democracy — fast, secure, and accessible voting from anywhere, anytime.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 ">
                {<Button text= "Get Started" href= "/vote" />}
                {<Button text= "Register" href= "/Register"  className=""/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
