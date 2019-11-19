import React, { Component, RefObject } from "react";
import Modal from "../Modal";
import BackgroundImageStore from "../../store/BackgroundImageStore";
import Spinner from "../Spinner";

export interface Props {
  id: string;
  initialBackgroundImage: string;
  onSaveSelection: (backgroundImage: string) => void;
}

interface State {
  backgroundImage: string;
  asyncOperationOccurring: boolean;
}

export default class EditableWorkCard extends Component<Props, State> {
  backgroundImageSelectElement: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      backgroundImage: props.initialBackgroundImage,
      asyncOperationOccurring: false
    };
    this.backgroundImageSelectElement = React.createRef();
  }

  _uploadBackgroundImage = async () => {
    const { current: input } = this.backgroundImageSelectElement;
    if (input) {
      const { files } = input;
      if (files && files.length > 0) {
        this.setState({ asyncOperationOccurring: true });
        try {
          await BackgroundImageStore.instance().uploadFile(files[0]);
          this.forceUpdate();
        } catch (err) {
          // TODO: Handle error
          console.error(err);
        } finally {
          this.setState({ asyncOperationOccurring: false });
        }
      }
    }
  };

  render() {
    const { id, onSaveSelection } = this.props;
    const { backgroundImage: selectedBackgroundImage, asyncOperationOccurring } = this.state;

    return (
      <Modal id={id}>
        <h2 className="uk-modal-title">Select Image</h2>
        {asyncOperationOccurring === true
          ? <Spinner ratio={2} />
          : <div
            className="uk-padding uk-child-width-1-2"
            uk-grid="masonry: true"
            style={{
              maxHeight: "45vh",
              overflowY: "scroll"
            }}
          >
            {BackgroundImageStore.instance().backgroundImages.map(backgroundImage => {
              const isSelected: boolean = selectedBackgroundImage === backgroundImage;

              return <div key={backgroundImage}>
                <img
                  src={backgroundImage}
                  alt={backgroundImage}
                  style={{
                    border: isSelected ? "3px solid #222222" : ""
                  }}
                  onClick={() => {
                    this.setState({ backgroundImage });
                  }}
                />
                {isSelected &&
                  <h3
                    className="uk-background-secondary"
                    style={{
                      color: "#FFFFFF",
                      marginTop: 0,
                      textAlign: "center"
                    }}
                  >
                    Selected
                </h3>
                }
              </div>
            })}
          </div>
        }
        <div className="uk-margin-top uk-button-group uk-margin-top">
          <button
            className="uk-button uk-button-secondary uk-button-small"
            uk-toggle={`target: #${id}`}
            onClick={() => onSaveSelection(selectedBackgroundImage)}
          >
            Save Selection
          </button>
          <button
            className="uk-button uk-button-secondary uk-button-small"
            onClick={() => {
              const { current: input } = this.backgroundImageSelectElement;
              if (input) {
                input.click();
              }
            }}
          >
            Upload New Background Image
          </button>
          <button
            className="uk-button uk-button-danger uk-button-small"
            uk-toggle={`target: #${id}`}
          >
            Cancel
          </button>
          <input
            ref={this.backgroundImageSelectElement}
            type="file"
            accept="image/*"
            hidden={true}
            onChange={this._uploadBackgroundImage}
          />
        </div>
      </Modal>
    );
  }
}
