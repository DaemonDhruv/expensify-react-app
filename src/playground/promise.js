const getData = new Promise((resolve, reject) => {
    const oneOrZero = Math.round(Math.random());
    console.log(oneOrZero);
    // Consider setTimeout() as making DB call, which takes 5 seconds to get data from DB, either there is data or not
    setTimeout(() => {
        // If data
        if(oneOrZero) {
            resolve({
                uname: 'Dhruv',
                age: 24
            })
        } else {
            reject({
                error: 'no data'
            });
        }
    }, 5000);
});

console.log('before');

getData.then(({uname, age}) => {
    console.log(`${uname} is of age ${age}`);
    return 'Hello'
    // This is call promise chaning
}).then((dataFromPreviousThen) => {
    console.log('Second then running with data from previous data: ' + dataFromPreviousThen)
}).catch(({error}) => {
    console.log(error);
});

console.log('after');