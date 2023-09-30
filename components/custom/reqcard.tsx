import { FaCheckCircle} from 'react-icons/fa'

export default function ReqCard({ req } : { req : {
  complete:boolean,
  number:string,
  name:string,
}}) {
  return (
    <div>
        <div className={`card px-10 w-full  min-w-[200px] relative rounded-xl py-10 shadow-md ${ req.complete ? 'bg-green-300' : ''}`}>
            {
                req.complete && (<>
                <FaCheckCircle className="text-green-500 text-2xl absolute top-2 left-2" />
                </>)
            }
            <div className="">
                <h2 className=" font-bold text-md">{req.number}</h2>
                <p className="text-sm max-w-[400px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">{req.name}</p>
            </div>
        </div>
    </div>
  )
}
