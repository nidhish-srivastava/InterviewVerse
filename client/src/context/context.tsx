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
}

const TrackerContext = createContext({} as TrackerContextTypes)

export const useTrackerContext = () => useContext(TrackerContext)

export const TrackerContextProvider = ({children} : TrackerContextProviderProps) =>{
  const [loggedInUser,setLoggedInUser] = useState<userCre | null>(null)

    return(
        <TrackerContext.Provider value={{
            loggedInUser,setLoggedInUser
        }}>
            {children}
        </TrackerContext.Provider>
    )
}