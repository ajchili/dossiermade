import React, { Component } from "react";
import Card from "./Card";

const aboutUs = (
  <p>
    Dossier Made a collective media production group based between Washington,
    D.C. and Baltimore, Maryland. We have the resources and availability to
    expand from metropolitan Philidelphia to Southern Virginia. Arrangements can
    also be made to travel further along the east coast and to other North
    American Locations.
  </p>
);

const ourVisiton = (
  <p>
    To construct a showcase for anyone who’s desire is to display what they
    want, when they want, wherever they want. Currently, we are dedicated to the
    automotive performance and aesthetic communities, with room to venture into
    many different avenues and fields of interest.
    <br />
    <br />
    We have the equipment and experience to forge visuals that match and exceed
    your vision, allowing you to be the producer of your imagination. With our
    keen eye for detail, it is our calling to make sure you receive what you
    need.
  </p>
);

export default class AboutCard extends Component {
  render() {
    return (
      <div>
        <div className="uk-visible@m uk-child-width-1-2" uk-grid="true">
          <Card title="ABOUT US" content={aboutUs} />
          <Card title="OUR VISION" content={ourVisiton} />
        </div>
        <div className="uk-hidden@m uk-child-width-1-1" uk-grid="true">
          <Card title="ABOUT US" content={aboutUs} />
          <Card title="OUR VISION" content={ourVisiton} />
        </div>
      </div>
    );
  }
}
