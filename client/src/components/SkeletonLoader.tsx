import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

type props = {
    isLoading : boolean
}

function SkeletonLoader({isLoading} : props) {
  return (
    <div style={{width : "80%",margin : "0 auto"}}>
    {
      isLoading ? <div className="skeleton-loading">
        <Skeleton count={5}/>
        </div> : null
    }
    </div>
  )
}

export default SkeletonLoader