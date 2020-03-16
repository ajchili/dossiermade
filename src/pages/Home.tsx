import React, { Component } from "react";
import Lander from "../components/HomeLander";
import Navbar from "../components/dmm/Navbar";
import AboutCard from "../components/AboutCard";
import ContactCard from "../components/ContactCard";
import ContentContainer from "../components/ContentContainer";
import ServicesCard from "../components/ServicesCard";
import { Work } from "../lib/firebase";
import WorkStore from "../store/WorkStore";
import WorkShowcaseContainer from "../components/dmm/WorkShowcaseContainer";

interface State {
  showVideo: boolean;
  work: Array<Work>;
}

class Home extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showVideo: false,
      work: []
    };
  }

  async componentDidMount() {
    try {
      let work = await WorkStore.instance().getRecent(3);
      this.setState({ work });
    } catch (err) {
      // Ignore error
    }
  }

  render() {
    const { showVideo, work } = this.state;
    return (
      <div>
        <Lander id="lander" showVideo={showVideo} />
        <Navbar />
        <ContentContainer
          id="work"
          cardContent={<WorkShowcaseContainer work={work} />}
        />
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
