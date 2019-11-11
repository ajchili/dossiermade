import React, { Component } from "react";
import BackgroundImageSetterModal from "./BackgroundImageSetterModal";
import { Work } from "../../lib/firebase";

export interface Props {
  work: Work;
  isEditing: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  onCancelEditing?: () => void;
  onSave?: (updatedWork: Work) => void;
}

interface State {
  title: string;
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
    const { backgroundImage, showVideo } = this.state;

    return (
      <div className="uk-card uk-card-body uk-card-default">
        <BackgroundImageSetterModal
          id={`selectImage${work.id}`}
          initialBackgroundImage={work.backgroundImage}
          onSaveSelection={(backgroundImage: string) => {
            onSave({
              id: work.id,
              title: this.state.title,
              url: this.state.url,
              date: this.state.date.getTime(),
              backgroundImage: backgroundImage
            });
            this.setState({ backgroundImage });
          }}
        />
        <div
          style={{
            width: "100%",
            textAlign: "center",
            margin: "0 auto"
          }}
        >
          <img
            src={backgroundImage}
            alt={backgroundImage}
            hidden={isEditing ? false : showVideo}
            style={{
              maxWidth: "100%",
              maxHeight: 275
            }}
          />
        </div>
        {showVideo && (
          <iframe
            title="video"
            src={work.url.replace("watch?v=", "embed/")}
            width="100%"
            height={275}
          />
        )}
        {!isEditing ? (
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, padding: 10 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
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
                  {work.url.length > 0 && <button
                    className="uk-button uk-button-secondary uk-button-small"
                    onClick={() => this.setState({ showVideo: !showVideo })}
                  >
                    {showVideo ? "Hide" : "Show"} Video
                  </button>}
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
                className="uk-input uk-margin-top"
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
              <button
                className="uk-button uk-button-secondary uk-button-small uk-margin-top"
                uk-toggle={`target: #selectImage${work.id}`}
              >
                Select Background Image
              </button>
              <div className="uk-margin-top uk-button-group">
                <button
                  className="uk-button uk-button-secondary uk-button-small"
                  onClick={() =>
                    onSave({
                      id: work.id,
                      title: this.state.title,
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
                  onClick={() => {
                    this.setState({ backgroundImage: work.backgroundImage })
                    onCancelEditing();
                  }}
                >
                  Cancel
              </button>
              </div>
            </div>
          )}
        {!(work.title.length > 0 && work.url.length > 0 && work.backgroundImage.length > 0) && (
          <div className="uk-alert-warning" uk-alert="true">
            <span>
              This work will not be displayed publicly. In order for this work
              to be displayed, it must have a <strong>title</strong>,{" "}
              <strong>URL</strong>, and a <strong>Background Image</strong>!
            </span>
          </div>
        )}
      </div>
    );
  }
}
