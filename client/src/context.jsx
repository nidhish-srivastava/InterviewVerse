import React, { useContext,createContext, useState } from "react";

const TrackerContext = createContext()

export const useTrackerContext = () =>{
    return useContext(TrackerContext)
}

export const TrackerContextProvider = ({children}) =>{
    const [idContext,setIdContext] = useState("")
    const [state,setState] = useState(false)
    const [t,setT] = useState("")
    const [d,setD]=  useState("")
    const [m,setM] = useState("")
    const [s,setS] = useState("")

    const final = {
        idContext,setIdContext,
        state,setState,
        t,setT,
        m,setM,
        d,setD,
        s,setS,
        baseUrl
    }
    return(
        <TrackerContext.Provider value={final}>
            {children}
        </TrackerContext.Provider>
    )
}