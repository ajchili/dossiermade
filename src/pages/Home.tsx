import React, { Component } from "react";
import Lander from "../components/HomeLander";
import Navbar from "../components/dmm/Navbar";
import AboutCard from "../components/AboutCard";
import ContactCard from "../components/ContactCard";
import ContentContainer from "../components/ContentContainer";
import ServicesCard from "../components/ServicesCard";
import Person from "../lib/Person";
import { Work } from "../lib/firebase";
import WorkStore from "../store/WorkStore";
import WorkShowcaseContainer from "../components/dmm/WorkShowcaseContainer";

interface State {
  showVideo: boolean;
  people: Array<Person>;
  work: Array<Work>;
}

class Home extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showVideo: false,
      people: Person.getStaticPeople(),
      work: []
    };
  }

  async componentDidMount() {
    try {
      let work = await WorkStore.instance().getRecent(3);
      this.setState({ work });
    } catch (err) {
      // Ignore error
    } finally {
      this.setState({ showVideo: true });
      setTimeout(async () => {
        try {
          let people = await Person.getAll();
          this.setState({ people });
        } catch (err) {
          // Ignore error
        }
      }, 1500);
    }
  }

  render() {
    const { showVideo, people, work } = this.state;
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
          cardContent={<ContactCard people={people} />}
        />
      </div>
    );
  }
}

export default Home;
