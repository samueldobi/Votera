import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Field, Label, Switch } from '@headlessui/react'

const Contact = () => {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface-background py-section-padding px-margin-mobile">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-14 h-14 bg-accent-orange-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">mail</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-on-background">Contact our team</h1>
          <p className="text-lg text-on-surface-variant mt-3">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-8 md:p-10 shadow-sm">
          <form action="#" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold text-on-background mb-1.5">
                  First name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-lg bg-surface-subtle border border-outline-variant px-4 py-3 text-on-background placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold text-on-background mb-1.5">
                  Last name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-lg bg-surface-subtle border border-outline-variant px-4 py-3 text-on-background placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-on-background mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-lg bg-surface-subtle border border-outline-variant px-4 py-3 text-on-background placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone-number" className="block text-sm font-semibold text-on-background mb-1.5">
                Phone number
              </label>
              <div className="flex rounded-lg bg-surface-subtle border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden">
                <div className="grid shrink-0 grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-none py-3 pl-4 pr-8 text-on-background bg-transparent outline-none text-sm"
                  >
                    <option>NG</option>
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                  <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-on-surface-variant" />
                </div>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  placeholder="123-456-7890"
                  className="block min-w-0 grow py-3 pr-4 pl-2 text-on-background placeholder:text-on-surface-variant outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-on-background mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-lg bg-surface-subtle border border-outline-variant px-4 py-3 text-on-background placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                placeholder="Tell us how we can help..."
                defaultValue=""
              />
            </div>

            <Field className="flex gap-x-4">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-checked:bg-primary-container"
                >
                  <span className="sr-only">Agree to policies</span>
                  <span className="size-4 transform rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-checked:translate-x-3.5" />
                </Switch>
              </div>
              <Label className="text-sm text-on-surface-variant">
                By selecting this, you agree to our{' '}
                <a href="#" className="text-primary font-semibold hover:underline underline-offset-4">
                  privacy&nbsp;policy
                </a>
                .
              </Label>
            </Field>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary-container text-white font-semibold rounded-lg hover:opacity-90 transition-all text-center"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
