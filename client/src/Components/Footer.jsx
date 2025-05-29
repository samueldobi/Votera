import React from 'react'
import { GithubIcon } from '../assets/SvgIcons';
import { Xicon } from '../assets/SvgIcons';

const Footer = () => {
  const socialLinks = [
    { 
      name: 'X',
      icon: (
        <Xicon/>
      ),
    },
    { 
      name: 'GitHub',
      icon: (
        <GithubIcon/>
      ),
    },
  
  ];

  const solutions = ['Marketing', 'Analytics', 'Automation', 'Commerce', 'Insights'];
  const support = ['Submit ticket', 'Documentation', 'Guides'];
  const company = ['About', 'Blog', 'Jobs', 'Press'];
  const legal = ['Terms of service', 'Privacy policy', 'License'];

  return (
    <footer className="footer bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12  md:flex md:items-center md:justify-between lg:px-8">
        <div className=" md:max-w-md lg:max-w-lg">
          <div className="">
            <img
              alt="Company name"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&amp;shade=500"
              className="h-8 w-auto"
            />
            <p className="mt-2 text-sm text-gray-300">
              Vote. Decide. Empower
            </p>
            <div className="mt-8 flex space-x-6">
              {socialLinks.map((social) => (
                <a key={social.name} href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
               {/* Footer links */}
        <div className="">
             {/* Footer Links */}
             <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {solutions.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {support.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {company.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {legal.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Footer links */}
    
        
      </div>

      {/*  */}
          <div className="mt-12 ml-5 mr-5 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between text-center">
          <p className="text-sm text-gray-400 r">© 2025 Innova Digital, Inc. All rights reserved.</p>
        </div>
      {/*  */}
    </footer>
  );
}

export default Footer