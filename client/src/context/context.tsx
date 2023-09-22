import { createContext,useContext,useState } from "react";
import { FormData } from "../pages/Create";
// import { useLocalStorage } from "../utils/hook/useLocalStorage";

type TrackerContextProviderProps = {
    children : React.ReactNode
}

type userCre = {
    username :  string
    id ?: string
  }

type TrackerContextTypes = {
   loggedInUser : userCre | null
   setLoggedInUser : React.Dispatch<React.SetStateAction<userCre | null>>
   isAuthenticated : boolean | null
   setIsAuthenticated : React.Dispatch<React.SetStateAction<boolean | null>>
   singlePostObj : FormData | null
   setSinglePostObj : React.Dispatch<React.SetStateAction<FormData | null>>
}

const TrackerContext = createContext({} as TrackerContextTypes)

export const useTrackerContext = () => useContext(TrackerContext)

export const TrackerContextProvider = ({children} : TrackerContextProviderProps) =>{
  const [loggedInUser,setLoggedInUser] = useState<userCre | null>(null)
  const [isAuthenticated,setIsAuthenticated] = useState<boolean | null>(false)
  const [singlePostObj,setSinglePostObj] = useState<FormData | null>(null)
//   const [singlePostObj,setSinglePostObj] = useLocalStorage<FormData | null>("TRACKS",null)
  
    return(
        <TrackerContext.Provider value={{
            loggedInUser,setLoggedInUser,
            setIsAuthenticated,isAuthenticated,
            singlePostObj,setSinglePostObj
        }}>
            {children}
        </TrackerContext.Provider>
    )
}