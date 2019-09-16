import React, { Component } from "react";
import Lander from "../components/HomeLander";
import Navbar from "../components/HomeNavbar";
import AboutCard from "../components/AboutCard";
import ContactCard from "../components/ContactCard";
import ContentContainer from "../components/ContentContainer";
import ServicesCard from "../components/ServicesCard";
import WorkCard from "../components/WorkCard";
import Person from "../lib/Person";
import Work from "../lib/Work";

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
      let work = await Work.getRecent(3);
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
          cardContent={
            <WorkCard
              work={work}
              page="home"
            />
          }
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
