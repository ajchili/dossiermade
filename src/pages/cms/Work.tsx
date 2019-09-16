import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Navbar from "../../components/cms/Navbar";
import EditableWorkCard from "../../components/cms/EditableWorkCard";
import Work, { WorkSnapshot } from "../../lib/Work";

interface Props extends RouteComponentProps {}

interface State {
  work: Array<Work>;
  workBeingEdited: Array<string>;
}

class WorkPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      work: [],
      workBeingEdited: []
    };
  }

  async componentDidMount() {
    try {
      let work = await Work.getAll();
      this.setState({ work });
    } catch (err) {
      console.error(err);
    }
  }

  _createWork = async () => {
    const { work, workBeingEdited } = this.state;
    try {
      let newWork = await Work.create({ date: new Date().getTime() });
      work.unshift(newWork);
      workBeingEdited.push(newWork.id);
      this.setState({
        work,
        workBeingEdited
      });
    } catch (err) {
      console.error(err);
    }
  };

  _updateWork = async (id: string, data: WorkSnapshot) => {
    const { work, workBeingEdited } = this.state;
    try {
      let workToBeUpdated = work.find(work => work.id === id);
      if (workToBeUpdated) {
        await workToBeUpdated.update(data);
        this.setState({
          work,
          workBeingEdited: workBeingEdited.filter(_id => _id !== id)
        });
      } else {
        throw new Error("Specified work does not exist!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  _deleteWork = async (id: string) => {
    const { work, workBeingEdited } = this.state;
    try {
      let workToDelete = work.find(work => work.id === id);
      if (workToDelete) {
        const shouldDelete = window.confirm(
          `Are you certain that you want to delete "${workToDelete.title}"?`
        );
        if (!shouldDelete) {
          return;
        }
        await workToDelete.delete();
        this.setState({
          work: work.filter(work => work.id !== id),
          workBeingEdited: workBeingEdited.filter(_id => _id !== id)
        });
      } else {
        throw new Error("Specified work does not exist!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { work, workBeingEdited } = this.state;
    return (
      <div>
        <Navbar />
        <button
          className="uk-button uk-margin-top uk-margin-left"
          onClick={this._createWork}
        >
          Add
        </button>
        <div
          className="uk-padding uk-child-width-1-2@s uk-child-width-1-3@m"
          uk-grid={"masonry: true"}
        >
          {work.map((work: Work) => (
            <div key={work.id}>
              <EditableWorkCard
                work={work}
                isEditing={workBeingEdited.includes(work.id)}
                onEdit={() => {
                  if (!workBeingEdited.includes(work.id)) {
                    workBeingEdited.push(work.id);
                    this.setState({ workBeingEdited });
                  }
                }}
                onCancelEditing={() => {
                  if (workBeingEdited.includes(work.id)) {
                    this.setState({
                      workBeingEdited: workBeingEdited.filter(
                        id => id !== work.id
                      )
                    });
                  }
                }}
                onDelete={() => this._deleteWork(work.id)}
                onSave={(data: WorkSnapshot) => this._updateWork(work.id, data)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(WorkPage);
