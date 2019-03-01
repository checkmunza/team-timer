import React from 'react';
import MyTimerView from './my-timer-view';

class MyTimer extends React.Component {
    constructor(props) {
        super(props);
        this.teamAmountDefault = 2;
        this.timeLimit = 15000;
        this.state = {
            teamAmount: undefined,
            teamTime: [],
            isRunning: false,
            timeNow: 0,
            currentTeam: undefined,
        }
        
        this.handleTimerButton = this.handleTimerButton.bind(this);
        this.handleSetTeamAmount = this.handleSetTeamAmount.bind(this);
    }

    componentWillUnmount() {
        this.stopTimer();
    }
 
    startTimer() {
        this.setState({timeNow: 0, isRunning: true});
        this.timerID = setInterval(
            () => this.updateTime(100),
            100
        );
        
    }

    stopTimer() {
        this.setState({isRunning: false});
        if (this.timerID) {
            clearInterval(this.timerID);
        }
        let newTeamTime = this.state.teamTime.slice();
        newTeamTime[this.state.currentTeam] = newTeamTime[this.state.currentTeam] + this.state.timeNow;
        this.setState((state, props) => {
            return {
                teamTime: newTeamTime,
                currentTeam: (state.currentTeam + 1) % state.teamAmount,
            }
        });
    }

    updateTime(interval) {
        this.setState((state, props) => {
            return { timeNow: state.timeNow + interval }
        });
        if (this.state.timeNow >= this.timeLimit) {
            this.stopTimer();
        }
    }

    handleTimerButton() {
        if (!this.state.isRunning) {
            this.startTimer();
        } else {
            this.stopTimer();
        }
    }

    handleSetTeamAmount(amount) {
        this.setState({
            teamAmount: amount,
            currentTeam: 0,
            teamTime: Array(amount).fill(0),
        });
    }

    render() {
        return (
            <MyTimerView
                isRunning={this.state.isRunning}
                teamTime={this.state.teamTime}
                timeNow={this.state.timeNow}
                teamAmountDefault={this.teamAmountDefault}
                teamAmount={this.state.teamAmount}
                onClickTimerButton={this.handleTimerButton}
                onSubmitTeamAmount={this.handleSetTeamAmount}
            />
        );
    }
}

export default MyTimer;
