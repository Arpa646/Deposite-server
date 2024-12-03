import express from 'express';


import { UserRoutes } from '../modules/Registration/user.route';





const router=express.Router()



const modulerRoutes=[

    {
        path:'/auth',
        route:UserRoutes,
        
    },
   
   
   
   
 
   
 
]

modulerRoutes.forEach(route=>router.use(route.path,route.route))

export default router