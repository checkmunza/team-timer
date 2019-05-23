import React from 'react';

class MyTimerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamAmount: props.teamAmountDefault,
            showTeamAmountForm: true,
        }
        this.onSubmitTeamAmount = this.onSubmitTeamAmount.bind(this);
        this.toggleTeamAmountForm = this.toggleTeamAmountForm.bind(this);
    }

    onChangeTeamAmount(amount) {
        this.setState({teamAmount: amount});
    }

    onSubmitTeamAmount(event) {
        event.preventDefault();
        this.setState({ showTeamAmountForm: false});
        this.props.onSubmitTeamAmount(this.state.teamAmount);
    }

    toggleTeamAmountForm() {
        this.setState((state, props) => {
            return {
                showTeamAmountForm: !state.showTeamAmountForm,
            }
        });
    }

    milliToSec(milli) {
        return milli * 1.0 / 1000;
    }

    render() {
        return (
            <div className="container" style={{maxWidth: '360px'}}>
                <h1 className="font-weight-bold mt-5">My Timer</h1>
                { this.state.showTeamAmountForm &&
                    <form onSubmit={this.onSubmitTeamAmount}>
                        <div className="form-group">
                            <label>Number of teams</label>
                            <input type="number" className="form-control" value={this.state.teamAmount} onChange={e => this.onChangeTeamAmount(parseInt(e.target.value))}></input>
                        </div>
                        <button type="submit" className="btn btn-block btn-primary" value="Submit">Submit</button>
                    </form>
                }
                <hr className="" />
                { this.props.teamTime && this.props.teamTime.length > 0 &&
                    <>
                    <div className="my-3">
                        <h1 className="text-center display-3">{`${this.milliToSec(this.props.timeNow).toFixed(1)}`}</h1>
                        <form>
                            <fieldset disabled={!this.props.teamAmount}>
                                <button type="button" 
                                    onClick={this.props.onClickTimerButton}
                                    className={`btn btn-block mt-4 ${!this.props.isRunning ? "btn-success" : "btn-danger"}`}
                                >
                                    {!this.props.isRunning ? "Start" : "Stop"}
                                </button>
                                <div className="form-row mt-2">
                                    <div className="col">
                                        <button type="button"
                                            className="btn btn-outline-secondary btn-block btn-sm"
                                            onClick={this.props.onClickSelectPrevTeam}
                                        >
                                            Prev
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button type="button"
                                            className="btn btn-outline-secondary btn-block btn-sm"
                                            onClick={this.props.onClickSelectNextTeam}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <hr />
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Total Time (seconds)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.teamTime.map( (time,index) =>
                            <tr key={index} className={index === this.props.currentTeam ? "table-active" : ""}>
                                <th scope="row">{index + 1}</th>
                                <td>{this.milliToSec(time).toFixed(1)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <button type="button" 
                        onClick={this.toggleTeamAmountForm}
                        className={`btn btn-block my-3 btn-secondary btn-sm`}
                    >
                        Toggle Form
                    </button>
                </>
                }
            </div>
        );
    }
}

export default MyTimerView;