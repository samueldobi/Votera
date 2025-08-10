import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import axios from "axios"
import useCurrentUser from '../hooks/useCurrentUser';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Vote', href: '/vote', current: false },
  { name: 'Login', href: '/login', current: false },
  { name: 'Register', href: '/register', current: false },
  { name: 'Contact', href: '/contact', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  // import backend api url
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const location = useLocation();

  const userNavigation = [
    { name: `Hello ${currentUser}`, href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: null },
  ]

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${apiUrl}/logout`, null, { withCredentials: true })
      localStorage.removeItem('userToken')
      navigate('/');
      console.log(response)
    } catch (err) {
      console.log(err)
    }
    console.log('button has been clicked')
  }

  return (
    <>
      <div className="w-full navbar">
        <Disclosure as="nav" className="w-full bg-gray-800">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <Link to='/'>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 text-3xl font-extrabold tracking-wide">
                      Votera
                    </p>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => {
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          aria-current={location.pathname === item.href ? 'page' : undefined}
                          className={classNames(
                            location.pathname === item.href ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {currentUser ? currentUser.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {item.name === 'Sign out' ? (
                            <button
                              onClick={handleLogout}
                              className="w-full text-left block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              {item.name}
                            </button>
                          ) : (
                            <a
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                  className={classNames(
                    location.pathname === item.href ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {currentUser ? currentUser.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">{currentUser || 'Guest'}</div>
                  <div className="text-sm font-medium text-gray-400">user@example.com</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) =>
                  item.name === 'Sign out' ? (
                    <DisclosureButton
                      key={item.name}
                      onClick={handleLogout}
                      as="button"
                      className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </DisclosureButton>
                  ) : (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
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
    </>
  )
}