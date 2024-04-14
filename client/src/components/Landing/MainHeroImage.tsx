
const MainHeroImage = () => {
  return (
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full"
        src={"/hero.jpg"}
        alt="happy team image"
        loading="lazy"
      />
    </div>
  );
};

export default MainHeroImage;