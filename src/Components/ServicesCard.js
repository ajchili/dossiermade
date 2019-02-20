import React, { Component } from "react";
import Card from "./Card";

class ServicesCard extends Component {
  render() {
    return (
      <Card
        title="OUR SERVICES"
        content={
          <div>
            <p>Videography for:</p>
            <ul>
              <li>Automotive Interests</li>
              <li>Events (Music, Competition, etc.)</li>
              <li>Personal Projects</li>
              <li>Short Films</li>
            </ul>
            <p>Photography for:</p>
            <ul>
              <li>Automotive Interests</li>
              <li>Architecture & Landscape</li>
              <li>Personal Projects</li>
              <li>Portraits</li>
            </ul>
            <p>For more information, feel free to contact us below.</p>
          </div>
        }
      />
    );
  }
}

export default ServicesCard;
