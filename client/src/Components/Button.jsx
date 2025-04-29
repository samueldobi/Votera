import React from 'react'

const Button = ({text, href, onClick}) => {
  return (
    <>
        <a
            href={href}
            onClick={onClick}
            className="vote-now-btn rounded-md  bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
            {text}
          
        </a></>
  )
}

export default Button