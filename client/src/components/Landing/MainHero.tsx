import { Link } from "react-router-dom";

const MainHero = () => {
  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-[3.75rem] md:leading-[5rem]">
          <span className="block xl:inline">Nail Your</span>{" "}
          <span className={`block text-primary xl:inline`}>Next Interview</span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
        A comprehensive platform for job seekers to explore interview experiences shared by others, gain valuable insights, and contribute their own stories.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <button className="px-4 py-2 rounded-md border bg-primary  sm:text-xl sm:px-6 sm:py-3  text-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
              <Link to={`/login`}>
              Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;
