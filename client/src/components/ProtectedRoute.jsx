import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children,role}) =>{
    const {user} = useSelector((state)=> state.auth);

    if(!user){
        return <Navigate to="/login" replace/>
    }
    if(role.includes(user.role)){
        return children
    }

}

export default ProtectedRoute