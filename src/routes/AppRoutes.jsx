import {Route, Routes} from "react-router-dom";
import Home from "../views/Home";
import SignUp from "../views/SignUp";
import Login from "../views/Login";
const AppRoutes = (props) => {
    return (
        
            <Routes>
                <Route path='/' element={<Home user={props.user}/>}/>
                <Route path='/login' element={<Login user={props.user} setUser={props.setUser}/>} />
                <Route path='/signup' element={<SignUp/>}/>
            </Routes>
    );

   
}
export default AppRoutes;