import React, { Component } from "react";
import Work, { WorkSnapshot } from "../lib/Work";

export interface Props {
  work: Work;
  isEditing: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  onCancelEditing?: () => void;
  onSave?: (data: WorkSnapshot) => void;
}

interface State {
  title: string;
  description: string;
  url: string;
  date: Date;
  backgroundImage: string;
}

export default class EditableWorkCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: props.work.title || "",
      description: props.work.description || "",
      url: props.work.url || "",
      date: props.work.date ? new Date(props.work.date) : new Date(),
      backgroundImage: props.work.backgroundImage || ""
    };
  }

  _getTitleLengthError = (): JSX.Element | null => {
    const { title } = this.state;
    if (title.length > 30) {
      return <span className="uk-text-small uk-text-danger">
        Title is too long!
      </span>;
    } else if (title.length >= 25) {
      return <span className="uk-text-small uk-text-warning">
        Title is becoming too long!
      </span>;
    }
    return null;
  }

  render() {
    const {
      work,
      isEditing,
      onDelete = () => console.log("Delete action missing!"),
      onEdit = () => console.log("Edit action missing!"),
      onCancelEditing = () => console.log("Cancel edit action missing!"),
      onSave = () => console.log("Save action missing!")
    } = this.props;

    return (
      <div className="uk-card uk-card-body uk-card-default uk-margin-top uk-margin-left uk-margin-right">
        {!isEditing ? (
          <div
            style={{
              display: "flex"
            }}
          >
            <div style={{ flex: 2, padding: 10 }}>
              <iframe
                title="video"
                src={work.url.replace("watch?v=", "embed/")}
                width="100%"
                height="100%"
              />
            </div>
            <div style={{ flex: 1, padding: 10 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  src={work.backgroundImage}
                  alt={work.backgroundImage}
                  height={275}
                  style={{
                    flex: 2,
                    maxHeight: 275
                  }}
                />
                <div
                  style={{
                    maxHeight: 200,
                    overflowY: "scroll",
                    flex: 2
                  }}
                >
                  <p className="uk-h1">{work.title}</p>
                  <p className="uk-h4">
                    {work.description}
                    <br />
                    {new Date(work.date).toLocaleDateString()}
                    <br />
                  </p>
                </div>
                <div className="uk-margin-top" style={{ float: "right" }}>
                  <button
                    className="uk-button uk-button-danger uk-margin-right"
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="uk-button uk-button-secondary"
                    onClick={onEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <input
              className="uk-input"
              type="text"
              placeholder="Title"
              defaultValue={work.title}
              onChange={e => this.setState({ title: e.target.value })}
            />
            {this._getTitleLengthError()}
            <input
              className="uk-input uk-margin-top"
              type="text"
              placeholder="Description"
              defaultValue={work.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
            <input
              className="uk-input uk-margin-top"
              type="date"
              placeholder="Date"
              defaultValue={new Date(work.date).toISOString().slice(0, 10)}
              onChange={e => this.setState({ date: new Date(e.target.value) })}
            />
            <input
              className="uk-input uk-margin-top"
              type="text"
              placeholder="URL"
              defaultValue={work.url}
              onChange={e => this.setState({ url: e.target.value })}
            />
            <input
              className="uk-input uk-margin-top"
              type="text"
              placeholder="Background Image URL"
              defaultValue={work.backgroundImage}
              onChange={e => this.setState({ backgroundImage: e.target.value })}
            />
            <div className="uk-margin-top" style={{ float: "right" }}>
              <button
                className="uk-button uk-button-danger uk-margin-right"
                onClick={onCancelEditing}
              >
                Cancel
              </button>
              <button
                className="uk-button uk-button-secondary"
                onClick={() =>
                  onSave({
                    title: this.state.title,
                    description: this.state.description,
                    url: this.state.url,
                    date: this.state.date.getTime(),
                    backgroundImage: this.state.backgroundImage
                  })
                }
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
