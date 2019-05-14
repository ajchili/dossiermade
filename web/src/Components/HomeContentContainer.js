import React, { Component } from "react";
import Card from "./Card";

class HomeContentContainer extends Component {
  render() {
    const { backgroundColor, cardContent, id } = this.props;

    return (
      <div
        id={id}
        className={
          backgroundColor === "light"
            ? "uk-background-muted"
            : "uk-background-secondary"
        }
      >
        <div style={styles.content}>{cardContent}</div>
      </div>
    );
  }
}

HomeContentContainer.defaultProps = {
  backgroundColor: "light",
  cardContent: (
    <div>
      <div className="uk-visible@m uk-child-width-1-2" uk-grid="true">
        <Card
          title="ABOUT US"
          content={
            <p>
              Dossier Made a collective media production group based between
              Washington, D.C. and Baltimore, Maryland. We have the resources
              and availability to expand from metropolitan Philidelphia to
              Southern Virginia. Arrangements can also be made to travel further
              along the east coast and to other North American Locations.
            </p>
          }
        />
        <Card
          title="OUR VISION"
          content={
            <p>
              To construct a showcase for anyone who’s desire is to display what
              they want, when they want, wherever they want. Currently, we are
              dedicated to the automotive performance and aesthetic communities,
              with room to venture into many different avenues and fields of
              interest.
              <br />
              <br />
              We have the equipment and experience to forge visuals that match
              and exceed your vision, allowing you to be the producer of your
              imagination. With our keen eye for detail, it is our calling to
              make sure you receive what you need.
            </p>
          }
        />
      </div>
      <div className="uk-hidden@m uk-child-width-1-1" uk-grid="true">
        <Card
          title="ABOUT US"
          content={
            <p>
              Dossier Made a collective media production group based between
              Washington, D.C. and Baltimore, Maryland. We have the resources
              and availability to expand from metropolitan Philidelphia to
              Southern Virginia. Arrangements can also be made to travel further
              along the east coast and to other North American Locations.
            </p>
          }
        />
        <Card
          title="OUR VISION"
          content={
            <p>
              To construct a showcase for anyone who’s desire is to display what
              they want, when they want, wherever they want. Currently, we are
              dedicated to the automotive performance and aesthetic communities,
              with room to venture into many different avenues and fields of
              interest.
              <br />
              <br />
              We have the equipment and experience to forge visuals that match
              and exceed your vision, allowing you to be the producer of your
              imagination. With our keen eye for detail, it is our calling to
              make sure you receive what you need.
            </p>
          }
        />
      </div>
    </div>
  ),
  id: null
};

const styles = {
  content: {
    marginLeft: "15%",
    marginRight: "15%",
    paddingTop: "7.5vh",
    paddingBottom: "7.5vh"
  }
};

export default HomeContentContainer;
