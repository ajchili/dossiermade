import React, { Component } from "react";
import Work, { WorkSnapshot } from "../../lib/Work";

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
  showVideo: boolean;
}

export default class EditableWorkCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: props.work.title || "",
      description: props.work.description || "",
      url: props.work.url || "",
      date: props.work.date ? new Date(props.work.date) : new Date(),
      backgroundImage: props.work.backgroundImage || "",
      showVideo: false
    };
  }

  _getTitleLengthError = (): JSX.Element | null => {
    const { title } = this.state;
    if (title.length > 30) {
      return (
        <span className="uk-text-small uk-text-danger">Title is too long!</span>
      );
    } else if (title.length >= 25) {
      return (
        <span className="uk-text-small uk-text-warning">
          Title is becoming too long!
        </span>
      );
    }
    return null;
  };

  render() {
    const {
      work,
      isEditing,
      onDelete = () => console.log("Delete action missing!"),
      onEdit = () => console.log("Edit action missing!"),
      onCancelEditing = () => console.log("Cancel edit action missing!"),
      onSave = () => console.log("Save action missing!")
    } = this.props;
    const { showVideo } = this.state;

    return (
      <div className="uk-card uk-card-body uk-card-default">
        {!isEditing ? (
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, padding: 10 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {showVideo && (
                  <iframe
                    title="video"
                    src={work.url.replace("watch?v=", "embed/")}
                    width="100%"
                    height={275}
                  />
                )}
                <img
                  src={work.backgroundImage}
                  alt={work.backgroundImage}
                  height={275}
                  hidden={showVideo}
                  style={{
                    flex: 2,
                    maxHeight: 275
                  }}
                />
                <div style={{ flex: 2 }}>
                  <span className="uk-h2">{work.title}</span>
                  <br />
                  <span className="uk-h4">
                    {new Date(work.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="uk-margin-top uk-button-group">
                  <button
                    className="uk-button uk-button-secondary uk-button-small"
                    onClick={onEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="uk-button uk-button-secondary uk-button-small"
                    onClick={() => this.setState({ showVideo: !showVideo })}
                  >
                    {showVideo ? "Hide" : "Show"} Video
                  </button>
                  <button
                    className="uk-button uk-button-danger uk-button-small"
                    onClick={onDelete}
                  >
                    Delete
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
            <div className="uk-margin-top uk-button-group">
              <button
                className="uk-button uk-button-secondary uk-button-small"
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
              <button
                className="uk-button uk-button-danger uk-button-small"
                onClick={onCancelEditing}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {!work.shouldDisplayPublicly && (
          <div className="uk-alert-warning" uk-alert="true">
            <span>
              This work will not be displayed publicly. In order for this work
              to be displayed, it must have a <strong>title</strong>,{" "}
              <strong>URL</strong>, and a <strong>Background Image URL</strong>!
            </span>
          </div>
        )}
      </div>
    );
  }
}
