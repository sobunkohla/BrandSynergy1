import { PersonalDev } from "@prisma/client";

export function req (PersonalDev:PersonalDev|null ) {
    let requirements = {
        followers : {
          name:'followers',
          number : '1000',
          complete :false
        },
        Posts : {
          name:'posts',
          number : '100',
          complete :false
        },
        leads : {
          name:'leads',
          number : '4',
          complete :false
        },
        Colaborations : {
          name:'collaborations',
          number : '2',
          complete :false
        },
      };
  
      if ( PersonalDev?.level === 'Beginner') {
        requirements = {
          followers : {
            name:'followers',
            number : '1000',
            complete :false
          },
          Posts : {
            name:'posts',
            number : '100',
            complete :false
          },
          leads : {
             name:'leads',
            number : '4',
            complete :false
          },
          Colaborations : {
            name:'collaborations',
            number : '2',
            complete :false
          },
        };
      }
  
   if (PersonalDev?.level === 'Online Presence') {
       requirements = {
        followers : {
          name:'followers',
          number : '15000',
          complete :false
        },
        Posts : {
          name:'posts',
          number : '400',
          complete :false
        },
        leads : {
           name:'leads',
          number : '10',
          complete :false
        },
        Colaborations : {
          name:'collaborations',

          number : '5',
          complete :false
        },
      };
    }
     if (PersonalDev?.level === 'Content Creation') {
      requirements = {
        followers : {
          name:'followers',
          number : '200000',
          complete :false
        },
        Posts : {
          name:'posts',
          number : '800',
          complete :false
        },
        leads : {
           name:'leads',
          number : '55',
          complete :false
        },
        Colaborations : {
          name:'collaborations',
          number : '9',
          complete :false
        },
      };
    }  if (PersonalDev?.level === 'Networking and Engagement') {
       requirements = {
        followers : {
          name:'followers',
          number : '600000',
          complete :false
        },
        Posts : {
          name:'posts',
          number : '1200',
          complete :false
        },
        leads : {
           name:'leads',
          number : '195',
          complete :false
        },
        Colaborations : {
          name:'collaborations',
          number : '9',
          complete :false
        },
      };
    }    if (PersonalDev?.level === 'Thought Leadership'){
       requirements = {
        followers : {
          name:'followers',
          number : '1000000',
          complete :false
        },
        Posts : {
          name:'posts',
          number : '3200',
          complete :false
        },
        leads : {
           name:'leads',
          number : '700',
          complete :false
        },
        Colaborations : {
          name:'collaborations',
          number : '29',
          complete :false
        },
      };
    } 

     // Function to convert a string to a number, or return 0 if it's not a valid number
function toNumber(value: string) {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? 0 : parsedValue;
  }
  
  // Check if the user's attributes meet the requirements
  if (PersonalDev && PersonalDev.followers && toNumber(PersonalDev.followers) >= parseInt(requirements.followers.number)) {
    requirements.followers.complete = true;
  }
  if (PersonalDev && PersonalDev.posts && toNumber(PersonalDev.posts) >= parseInt(requirements.Posts.number)) {
    requirements.Posts.complete = true;
  }
  if (PersonalDev && PersonalDev.leads && toNumber(PersonalDev.leads) >= parseInt(requirements.leads.number)) {
    requirements.leads.complete = true;
  }
  if (PersonalDev && PersonalDev.colaborations && toNumber(PersonalDev.colaborations) >= parseInt(requirements.Colaborations.number)) {
    requirements.Colaborations.complete = true;
  }
    
   
    return requirements
}