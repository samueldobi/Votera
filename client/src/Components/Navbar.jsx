import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import useCurrentUser from '../hooks/useCurrentUser'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Vote', href: '/vote' },
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/register' },
  { name: 'Contact', href: '/contact' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const { currentUser } = useCurrentUser()
  const location = useLocation()

  const userNavigation = [
    { name: `Hello ${currentUser}`, href: '#' },
    { name: 'Dashboard', href: '#' },
    { name: 'Sign out', href: null },
  ]

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, null, { withCredentials: true })
      localStorage.removeItem('userToken')
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full navbar">
      <Disclosure as="nav" className="w-full bg-surface-container-lowest border-b border-outline-variant">
        <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto">
          <div className="flex h-16 md:h-20 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="shrink-0">
                <span className="text-xl md:text-2xl font-bold text-primary">Votera</span>
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? 'text-primary bg-accent-orange-muted'
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-subtle',
                      'rounded-lg px-4 py-2 text-sm font-medium transition-all'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                className="relative rounded-full p-2 text-on-surface-variant hover:text-primary hover:bg-surface-subtle transition-all"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="size-5" />
              </button>

              <Menu as="div" className="relative">
                <MenuButton className="relative flex items-center rounded-full text-sm focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant hover:border-primary transition-all">
                    <span className="text-sm font-medium text-on-surface-variant">
                      {currentUser ? currentUser.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/5 border border-outline-variant focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      {item.name === 'Sign out' ? (
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-subtle hover:text-on-background transition-all"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          className={classNames(
                            item.name.startsWith('Hello')
                              ? 'text-primary font-semibold border-b border-outline-variant'
                              : 'text-on-surface-variant hover:bg-surface-subtle hover:text-on-background',
                            'block px-4 py-2.5 text-sm transition-all'
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>

            <div className="flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-lg p-2 text-on-surface-variant hover:text-primary hover:bg-surface-subtle transition-all">
                <Bars3Icon className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden border-t border-outline-variant">
          <div className="space-y-1 px-3 pt-3 pb-4">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? 'text-primary bg-accent-orange-muted'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-subtle',
                  'block rounded-lg px-4 py-2.5 text-base font-medium transition-all'
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>

          <div className="border-t border-outline-variant pt-4 pb-6 px-3">
            <div className="flex items-center gap-3 px-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant">
                <span className="text-base font-medium text-on-surface-variant">
                  {currentUser ? currentUser.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-on-background">{currentUser || 'Guest'}</div>
                <div className="text-xs text-on-surface-variant">Account</div>
              </div>
              <button
                type="button"
                className="ml-auto rounded-full p-2 text-on-surface-variant hover:text-primary transition-all"
              >
                <BellIcon className="size-5" />
              </button>
            </div>

            <div className="space-y-1">
              {userNavigation.map((item) =>
                item.name === 'Sign out' ? (
                  <DisclosureButton
                    key={item.name}
                    onClick={handleLogout}
                    as="button"
                    className="w-full text-left block rounded-lg px-4 py-2.5 text-base font-medium text-on-surface-variant hover:text-primary hover:bg-surface-subtle transition-all"
                  >
                    {item.name}
                  </DisclosureButton>
                ) : (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.name.startsWith('Hello')
                        ? 'text-primary font-semibold'
                        : 'text-on-surface-variant hover:text-primary',
                      'block rounded-lg px-4 py-2.5 text-base font-medium transition-all'
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                )
              )}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}
