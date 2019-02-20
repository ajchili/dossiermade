import React, { Component } from "react";

class Card extends Component {
  render() {
    const { backgroundColor, content, title } = this.props;

    return (
      <div
        className={`uk-card uk-card-body ${
          backgroundColor === "light" ? "uk-card-hover" : "uk-card-default"
        }`}
      >
        <p className="uk-h1">{title}</p>
        {content}
      </div>
    );
  }
}

Card.defaultProps = {
  backgroundColor: "light",
  title: "Title",
  content: (
    <p>
      Dossier Made a collective media production group based between Washington,
      D.C. and Baltimore, Maryland. We have the resources and availability to
      expand from metropolitan Philidelphia to Southern Virginia. Arrangements
      can also be made to travel further along the east coast and to other North
      American Locations.
    </p>
  )
};

export default Card;
