import { FaCalendarCheck, FaCheckSquare, FaHandshake, FaUsers } from "react-icons/fa"

 

 
 export const requirements = [
    {
        title: 'Build a website',
        description: 'Build a website',
        recommendations: 'none',
        complete: true, 
    },
    {
        title: '550 followers',
        description: 'bulding your audience',
        recommendations: 'none',
        complete: true, 
    },
    {
        title: 'Multi-platforms',
        description: 'grow your reach by growing   on at least 4 platforms',
        recommendations: 'none',
        complete: false, 
    },
    {
        title: 'Content strategy',
        description: 'stick to a consistent content strategy',
        recommendations: 'none',
        complete: false, 
    }
]

export const MainProgress = [
    {
        title: 'Followers',
        number: '5000',
        icon: <FaUsers/>,
        
    },
    {
        title: 'posts',
        number: '30',
        icon: <FaCalendarCheck/>,
        
    },
    {
        title: 'Leads',
        number: '200',
        icon: <FaCheckSquare/>,
        
    },
    {
        title: 'Colaborations',
        number: '2',
        icon: <FaHandshake/>,
        
    },

]