import { useEffect, useState } from "react";

export default function useFetchHook(url:string){
     const [data,setData] = useState(null)
     const [isLoading,setIsLoading] = useState(false)
     const [error,setError] = useState("")
     useEffect(()=>{
        const fetchData = async()=>{
            setIsLoading(true)
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                  }
                  const result = await response.json();
                  setData(result);
            } catch (error) {
                setError("Try Later,Error fetching")
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchData()
     },[url])
     return {data,isLoading,error}
}