import Hero from "../components/Hero";

function Home() {
  return (
    <>
      <Hero />
      <section className="features-section">
        <h2 className="features-heading">Take control of your interview journey.</h2>
        <div className="features-container">
          <FeatureCard
            title="Search and Learn"
            description="Explore interview experiences shared by other users and gain valuable insights."
          />
          <FeatureCard
            title="Track Your Progress"
            description="Create organized tracks for each interview process and stay on top of your preparations."
          />
          <FeatureCard
            title="Stay Organized"
            description="Keep a clear record of your interviews, notes, and feedback for efficient review and analysis."
          />
          <FeatureCard
            title="Share Your Knowledge"
            description="Contribute to a community of fellow interviewees by sharing your own experiences and insights."
          />
        </div>
      </section>
   <Footer/>
    </>
  );
}

export default Home;

const FeatureCard = ({  title, description }) => {
  return (
    <div className="feature-card">
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

const Footer = () =>{
  return(
    <footer className="footer">
    <div className="footer-content">
      <p>&copy; 2024 Interview Tracker | Developed by Nidhish </p>
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/nidhish-srivastava/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://twitter.com/Nidhish_30" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://github.com/nidhish-srivastava" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  </footer>
  )

}