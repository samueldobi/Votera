import React from 'react'

const Sharelink = ({pollId}) => {

  return (
    <div className="mt-4 flex flex-col items-center">
                    <p className="font-semibold">Share this link with others:</p>
                    {/* <p className="text-[#e65c00] break-all"> */}
                    <div className="flex items-center space-x-2">
                      <input 
                       type='text'
                       readOnly
                       value ={`${window.location.origin}/votepage/${pollId}`}
                        className="border px-2 py-1 flex-center w-64"
                        onFocus={e => e.target.select()} // auto‑select when clicked
                       />
                         <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/votepage/${pollId}`);
                        alert("Link copied to clipboard!");
                      }}
                      className="bg-[#e65c00] text-white px-4 py-1 rounded"
                    >
                      Copy
                    </button>
                      </div>
                    
                    
                    {/* </p> */}
                  </div>
  )
}

export default Sharelink