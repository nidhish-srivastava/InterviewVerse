import { Suspense, lazy, useEffect } from "react";
import Features from "../components/Landing/Features";
import Header from "../components/Landing/Header";
import MainHero from "../components/Landing/MainHero";
import MainHeroImage from "../components/Landing/MainHeroImage";
import { useTrackerContext } from "../context/context";
import { url } from "../utils";
const InterviewTrackExplore = lazy(()=>import("./InterviewTrackExplore"))
const Canvas = lazy(()=>import("../components/Landing/Canvas"))
const LazyShow = lazy(()=> import("../components/Landing/LazyShow"))
const Footer = lazy(()=> import("../components/Landing/Footer"))

function Landing() {
  const { loggedInUser, setLoggedInUser, setIsAuthenticated,setIsLoading,isLoading } = useTrackerContext();

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${url}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setLoggedInUser({ username: data.username, id: data._id });
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [setLoggedInUser, setIsAuthenticated]);

  if (isLoading) {
    // While loading, show a loading indicator or skeleton UI
    return <div></div>;
  }

  return (
    <>
    {
      loggedInUser ? (
        // If logged in, show the dashboard
        <Suspense>
          <InterviewTrackExplore/>
        </Suspense>
      ) : (
        // If not logged in, show the landing page
        <div className={`bg-background grid gap-y-16 overflow-hidden`}>
          <div className={`relative bg-background`}>
            <div className="max-w-7xl mx-auto">
              <div
                className={`relative z-10 pb-8 p-4 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-64`}
              >
                <Header />
                <MainHero />
              </div>
            </div>
            <MainHeroImage />
          </div>
          <Suspense>
          <Canvas />
          </Suspense>
          <Suspense>
          <LazyShow>
            <>
              <Features />
              {/* <Canvas /> */}
            </>
          </LazyShow>
          </Suspense>
          <Footer/>
        </div>
      )
    }
    </>
  )
}

export default Landing;