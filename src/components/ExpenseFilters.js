import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export class ExpenseFilters extends React.Component {
    state = {
        calendarFocused: null
    }


    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }


    onFocusChange = (calendarFocused) => {
        this.setState(() => ({
            calendarFocused
        }))
    }


    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
    }


    onSortChange = (e) => {
        //There is a weird bug here... dispatch is so fast.. it
        if (e.target.value === 'date') {
            this.props.sortByDate();
        } else if (e.target.value === 'amount') {
            this.props.sortByAmount();
        }
    }


    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input 
                            className="text-input" 
                            placeholder="Search expenses" 
                            type="text" 
                            value={this.props.filters.text} 
                            onChange={this.onTextChange} />
                    </div>


                    <div className="input-group__item">  
                        <select className="select" value={this.props.filters.sortBy} onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>


                    <div className="input-group__item">                       
                        {/* Learn more at: https://github.com/airbnb/react-dates#daterangepicker */}
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false} />
                    </div>
                </div>
            </div>
        );
    }
};


const mapStateToProps = (state) => ({
    filters: state.filters
}); // Along with filters, dispatch() method also gets passed to ExpenseFilters component


const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())
});


// connect() is working as a middleware between parent component and child component. 
// connect() is injecting data from in between to the child component in it's props
// connect() is also providing methods in the props which will take away data and put into the store

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFilters);