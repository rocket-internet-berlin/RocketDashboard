import React, {Component} from 'react';
import { connect } from 'react-redux';

class WeekNumber extends Component {
    static defaultProps = {
        weekNumber: {
            number: 0
        }
    };

    render() {
        return (
            <div className="WeekNumber widget">
                <div className="WeekNumber-title widget-title">Week</div>
                <div className="WeekNumber-number widget-number">{this.props.weekNumber.number}</div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    weekNumber: state.weekNumber
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekNumber);
