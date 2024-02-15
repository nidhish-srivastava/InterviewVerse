import { PropsWithChildren, useEffect } from "react"
import { useTrackerContext } from "../context/context"
import { useNavigate } from "react-router-dom"

function ProtectedRoute({children} : PropsWithChildren<{}>) {
    const {loggedInUser,isAuthenticated} = useTrackerContext()
    const navigate = useNavigate( )
    useEffect(()=>{
        if( loggedInUser == null || isAuthenticated==false){
            navigate('/login',{replace : true})
        }
    },[navigate,loggedInUser,isAuthenticated])
  return (
    <>
    {children}
    </>
  )
}

export default ProtectedRoute