import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Navbar from "../../components/cms/Navbar";
import Spinner from "../../components/Spinner";
import EditableWorkCard from "../../components/cms/EditableWorkCard";
import { Work } from "../../lib/firebase";
import WorkStore from "../../store/WorkStore";

interface Props extends RouteComponentProps { }

interface State {
  work: Array<Work>;
  workBeingEdited: Array<string>;
  filter: string;
  asyncOperationOcurring: boolean;
}

class WorkPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      work: [],
      workBeingEdited: [],
      filter: "",
      asyncOperationOcurring: true
    };
  }

  async componentDidMount() {
    this._refresh();
  }

  _refresh = async () => {
    this.setState({ work: [], asyncOperationOcurring: true });
    try {
      const work = await WorkStore.instance().getAll();
      this.setState({ work });
    } catch (err) {
      // TODO: Handle error
      console.error(err);
    } finally {
      this.setState({ asyncOperationOcurring: false });
    }
  }

  _createWork = async () => {
    const { workBeingEdited } = this.state;
    this.setState({ asyncOperationOcurring: true });
    try {
      const newWorkId = await WorkStore.instance().create();
      workBeingEdited.push(newWorkId);
      this.setState({
        work: WorkStore.instance().work,
        workBeingEdited
      });
    } catch (err) {
      // TODO: Handle error
      console.error(err);
    } finally {
      this.setState({ asyncOperationOcurring: false });
    }
  };

  _updateWork = async (updatedWork: Work) => {
    const { workBeingEdited } = this.state;
    this.setState({ asyncOperationOcurring: true });
    try {
      await WorkStore.instance().update(updatedWork);
      this.setState({
        work: WorkStore.instance().work,
        workBeingEdited: workBeingEdited.filter(_id => _id !== updatedWork.id)
      });
    } catch (err) {
      // TODO: Handle error
      console.error(err);
    } finally {
      this.setState({ asyncOperationOcurring: false });
    }
  };

  _deleteWork = async (id: string) => {
    const { work, workBeingEdited } = this.state;
    this.setState({ asyncOperationOcurring: true });
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
      // TODO: Handle error
      console.error(err);
    } finally {
      this.setState({ asyncOperationOcurring: false });
    }
  };

  render() {
    const { work, workBeingEdited, filter, asyncOperationOcurring } = this.state;
    return (
      <div>
        <Navbar />
        <button
          className="uk-button uk-margin-top uk-margin-left"
          onClick={this._createWork}
        >
          Add
        </button>
        <button
          className="uk-button uk-button-primary uk-margin-top uk-margin-left"
          onClick={this._refresh}
        >
          Refresh
        </button>
        <div className="uk-search uk-search-default">
          <input
            className="uk-search-input uk-margin-top uk-margin-left"
            type="search"
            placeholder="Filter by Title"
            value={filter}
            onChange={e => this.setState({ filter: e.target.value })}
          />
        </div>
        {asyncOperationOcurring === true && <Spinner backgroundColor="dark" ratio={3} />}
        <div
          className="uk-padding uk-child-width-1-2@s uk-child-width-1-3@m"
          uk-grid={"masonry: true"}
        >
          {work.filter((work: Work) => {
            const _filter = filter.toLowerCase().trim();
            const title = work.title.toLowerCase().trim();
            return _filter.length === 0 || title.includes(_filter);
          }).map((work: Work) => (
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
                onSave={(updatedWork: Work) => this._updateWork(updatedWork)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(WorkPage);
