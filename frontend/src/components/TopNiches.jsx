const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Software Development",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the latest industry standards.",
    },
    {
      id: 2,
      service: "Web Development",
      description:
        "Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and scalable websites.",
    },
    {
      id: 3,
      service: "Data Science",
      description:
        "Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
    },
    {
      id: 4,
      service: "Cloud Computing",
      description:
        "Secure and scalable cloud computing solutions, including migration, storage, and cloud-native application development.",
    },
    {
      id: 5,
      service: "Cybersecurity",
      description:
        "Robust cybersecurity services to protect digital assets, prevent cyber threats, and ensure compliance with security regulations.",
    },
    {
      id: 6,
      service: "Mobile App Development",
      description:
        "Custom mobile app development for iOS and Android, delivering user-friendly and high-performance mobile solutions.",
    },
  ];

  return (
    <section className="services">
      <h3>Top Niches</h3>
      <div className="grid">
        {services.map((element) => {
          return (
            <div className="card" key={element.id}>  
              <h4>{element.service}</h4>  
              <p>{element.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopNiches;
