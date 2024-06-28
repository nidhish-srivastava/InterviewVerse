import { Suspense, lazy } from 'react';

const Lottie = lazy(() => import('lottie-react'));

type LottieAnimationLoaderProps = {
  animationData : any
}

function LottieAnimationLoader({animationData}:LottieAnimationLoaderProps) {
  return (
    <Suspense>
    <Lottie animationData={animationData} />
    </Suspense>
  )
}

export default LottieAnimationLoader