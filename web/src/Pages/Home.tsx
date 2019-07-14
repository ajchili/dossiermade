import React, { Component } from "react";
import Lander from "../Components/HomeLander";
import Navbar from "../Components/HomeNavbar";
import AboutCard from "../Components/AboutCard";
import ContactCard from "../Components/ContactCard";
import ContentContainer from "../Components/ContentContainer";
import ServicesCard from "../Components/ServicesCard";
import WorkCard from "../Components/WorkCard";

class Home extends Component {
  render() {
    return (
      <div>
        <Lander id="lander" />
        <Navbar />
        <ContentContainer id="work" cardContent={<WorkCard />} />
        <ContentContainer id="about" cardContent={<AboutCard />} />
        <ContentContainer id="services" cardContent={<ServicesCard />} />
        <ContentContainer
          id="contact"
          backgroundColor="dark"
          cardContent={<ContactCard />}
        />
      </div>
    );
  }
}

export default Home;
