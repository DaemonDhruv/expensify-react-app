import moment from 'moment'
import filtersReducer from '../../reducers/filters';

test('should setup defualt filter values', () => {
    // @@INIT is the defualt action that redux calls it reducers with for the first time
    const stateFilters = filtersReducer(undefined, { type: '@@INIT' });
    expect(stateFilters).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const stateFilters = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(stateFilters.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const dummyFilters = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const stateFilters = filtersReducer(dummyFilters, {type: 'SORT_BY_DATE'});
    expect(stateFilters.sortBy).toBe('date');
});

test('should set text filter to provided text', () => {
    const stateFilters = filtersReducer(undefined, { 
        type: 'SET_TEXT_FILTER',
        text: 'e'
    });
    expect(stateFilters.text).toBe('e');
});

test('should set startDate filter', () => {
    const stateFilters = filtersReducer(undefined, {
        type: 'SET_START_DATE',
        startDate: moment(0).valueOf()
    })
    expect(stateFilters.startDate).toBe(moment(0).valueOf());
});

test('should set endDate filter', () => {
    const stateFilters = filtersReducer(undefined, {
        type: 'SET_END_DATE',
        endDate: moment(0).valueOf()
    });
    expect(stateFilters.endDate).toBe(moment(0).valueOf());
})