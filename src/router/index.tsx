import { 
    createBrowserRouter, 
    createRoutesFromElements,
    Route,
    RouterProvider 
} from "react-router-dom";

import {
    SignIn,
    SignUp,
    Dashboard,
    Teachers
} from "@modules"
import App from "../App";

const Index =()=>{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route index element={<SignIn/>}/>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="main/*" element={<Dashboard/>}>
                    <Route path="" element={<Teachers/>}/>
                </Route>
            </Route>
        )
    )
    return <RouterProvider router={router}/>
}
export default Index