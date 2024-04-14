
const MainHero = () => {
  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-[3.75rem] md:leading-[5rem]">
          <span className="block xl:inline">Nail Your</span>{' '}
          <span className={`block text-primary xl:inline`}>
            Next Interview
          </span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
        A solution to all the techies and non-techies giving countless interviews and unable to keep a track of them.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <span
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 cursor-pointer md:text-lg md:px-10`}
            >
              Get Started
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;