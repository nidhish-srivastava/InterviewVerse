const features = [
  {
    name : "Search and Learn",
    description : "Explore interview experiences shared by other users and gain valuable insights.",
    icon : "https://illustrations.popsy.co/red/engineer.svg"
  },
  {
    name : "Track your Progress",
    description : "Create organized tracks for each interview process and stay on top of your preparations.",
    icon : "https://illustrations.popsy.co/red/home-office.svg"
  },
  {
    name : "Share your Knowledge",
    description : "Contribute to a community of fellow interviewees by sharing your own experiences and insights.",
    icon : "https://illustrations.popsy.co/red/communication.svg"
  },
  {
    name: "Explore User Profiles",
    description: "Visit profiles of other users to discover their interview experiences, tracks, and contributions to the community.",
    icon: "https://illustrations.popsy.co/red/shaking-hands.svg"
  }
  
]

const Features = () => {
  return (
    <div className={`pt-6 pb-24 bg-background`} id="features">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-4xl sm:text-6xl leading-8 font-extrabold tracking-tight text-primary text-center ">
            Features
          </div>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features?.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div
                    className={`flex items-center justify-center rounded-md bg-background text-tertiary `}
                  >
                    <img
                      className={`inline-block h-96 w-96 rounded-full`}
                      src={feature.icon}
                      alt={feature.name}
                    />
                  </div>
                  <p className="ml-16 text-2xl leading-6 font-bold text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-[1.1rem] text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;