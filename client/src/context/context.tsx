import { createContext,useContext,useState } from "react";

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
}

const TrackerContext = createContext({} as TrackerContextTypes)

export const useTrackerContext = () => useContext(TrackerContext)

export const TrackerContextProvider = ({children} : TrackerContextProviderProps) =>{
  const [loggedInUser,setLoggedInUser] = useState<userCre | null>(null)
  const [isAuthenticated,setIsAuthenticated] = useState<boolean | null>(false)

    return(
        <TrackerContext.Provider value={{
            loggedInUser,setLoggedInUser,
            setIsAuthenticated,isAuthenticated
        }}>
            {children}
        </TrackerContext.Provider>
    )
}