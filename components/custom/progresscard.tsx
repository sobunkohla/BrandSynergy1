import React from 'react'

export default function ProgressCard({ item } : {
  item: {
    title: string;
    number: string;
    icon: JSX.Element;
}
}) {
  return (
    <div className="flex bg-white py-8 rounded-xl w-full max-w-[300px] px-12 justify-between mt-4">
        <div className="flex gap-4">
          <button
            type="button"
            
            className="text-2xl bg-orange-100 rounded-lg p-4 hover:drop-shadow-xl"
          >
            {item.icon}
          </button>
          <div>
            <p className="text-md font-semibold ">{item.title}</p>
            
        <h1 className={`text-orange-600 text-xl font-bold`}>{item.number}</h1>
          </div>
        </div>
      </div>
  )
}
