import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Navbar from "../../components/cms/Navbar";
import EditableWorkCard from "../../components/cms/EditableWorkCard";
import Work, { WorkSnapshot } from "../../lib/Work";
import WorkStore from "../../store/WorkStore";

interface Props extends RouteComponentProps {}

interface State {
  work: Array<Work>;
  workBeingEdited: Array<string>;
}

class WorkPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      work: WorkStore.instance().work,
      workBeingEdited: []
    };
  }

  async componentDidMount() {
    try {
      const work = await WorkStore.instance().getAll();
      this.setState({ work });
    } catch (err) {
      console.error(err);
    }
  }

  _createWork = async () => {
    const { workBeingEdited } = this.state;
    try {
      const newWorkId = await WorkStore.instance().create({ date: new Date().getTime() });
      workBeingEdited.push(newWorkId);
      this.setState({
        work: WorkStore.instance().work,
        workBeingEdited
      });
    } catch (err) {
      console.error(err);
    }
  };

  _updateWork = async (id: string, data: WorkSnapshot) => {
    const { workBeingEdited } = this.state;
    try {
      await WorkStore.instance().update(id, data);
      this.setState({
        work: WorkStore.instance().work,
        workBeingEdited: workBeingEdited.filter(_id => _id !== id)
      });
    } catch (err) {
      console.error(err);
    }
  };

  _deleteWork = async (id: string) => {
    const { work, workBeingEdited } = this.state;
    try {
      const workToDelete = work.find(work => work.id === id);
      if (workToDelete) {
        const shouldDelete = window.confirm(
          `Are you certain that you want to delete "${workToDelete.title}"?`
        );
        if (!shouldDelete) {
          return;
        }
        await WorkStore.instance().delete(id);
        this.setState({
          work: WorkStore.instance().work,
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
