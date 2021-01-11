// import moment from 'moment' -> won't work here, because recursively
// call this mock file

// We will use requireActual to import the original moment.js library
const moment = require.requireActual('moment');

// We are setting time to a specific point in time "0" if timestamp not provided.
export default (timestamp = 0) => {
    return moment(timestamp);
}