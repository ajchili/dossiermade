import React, { Component } from "react";
import Lander from "../Components/HomeLander";
import Navbar from "../Components/HomeNavbar";
import ContactCard from "../Components/ContactCard";
import ContentContainer from "../Components/HomeContentContainer";
import ServicesCard from "../Components/ServicesCard";
import WorkCard from "../Components/WorkCard";

class Home extends Component {
  render() {
    return (
      <div>
        <Lander id="lander" />
        <Navbar />
        <ContentContainer id="about" />
        <ContentContainer id="work" cardContent={<WorkCard />} />
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
