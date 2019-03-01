import React from 'react';

class MyTimerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamAmount: props.teamAmountDefault,
        }
        this.onSubmitTeamAmount = this.onSubmitTeamAmount.bind(this);
    }

    onChangeTeamAmount(amount) {
        this.setState({teamAmount: amount});
    }

    onSubmitTeamAmount(event) {
        event.preventDefault();
        this.props.onSubmitTeamAmount(this.state.teamAmount);
    }

    milliToSec(milli) {
        return milli * 1.0 / 1000
    }

    render() {
        return (
            <div>
                <h1>My Timer</h1>
                <form onSubmit={this.onSubmitTeamAmount}>
                    <h3>Number of teams</h3>
                    <input type="number" value={this.state.teamAmount} onChange={e => this.onChangeTeamAmount(parseInt(e.target.value))}></input>
                    <button type="submit" value="Submit">Submit</button>
                </form>
                <h1>{this.milliToSec(this.props.timeNow).toFixed(1)}</h1>
                <button type="button" 
                    onClick={this.props.onClickTimerButton}
                    disabled={!this.props.teamAmount}
                >
                    {!this.props.isRunning ? "Start" : "Stop"}
                </button>
                { this.props.teamTime && this.props.teamTime.length > 0 &&
                <>
                    <h2>Team List:</h2>
                    <ol>
                        {this.props.teamTime.map( (time,index) => 
                            <li key={index}>{this.milliToSec(time).toFixed(1)} Seconds</li>
                        )}
                    </ol>
                </>
                }
            </div>
        );
    }
}

export default MyTimerView;