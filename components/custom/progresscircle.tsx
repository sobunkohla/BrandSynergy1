'use client'

import { requirements } from '../../assets/data'


export default function ProgressCircle() {
    let counter = 0;
   let  percent = 0;
   let  completeInt = 0;
    requirements.map(requirement => requirement.complete && completeInt++);
    percent = Math.floor((completeInt/requirements.length) * 100);
    completeInt = Math.floor(472 - (472 * (completeInt/requirements.length)));
    
  return (
    <div>
    <div className="w-40 h-40 relative ">
        <div className="h-full w-full p-5 rounded-[50%] shadow-md">
            <div className="h-[120px] w-[120px] rounded-[50%] flex items-center justify-center shadow-inner">
                <div id="number" className="font-light ">
                  <span className="font-bold">
                  { percent }%
                    </span> 
                </div>
            </div>
        </div>
    
    <svg className="absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
         <defs>
            <linearGradient id="GradientColor">
               <stop offset="0%" stop-color="#e91e63" />
               <stop offset="100%" stop-color="#673ab7" />
            </linearGradient>
         </defs>
         <circle cx="80" cy="80" r="70" id="circle" style={{ strokeDashoffset : `${ completeInt}px`}} stroke-linecap="round" />
 </svg>
 </div>
    </div>
  )
}
