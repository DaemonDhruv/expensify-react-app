import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export { firebase, db as default };


/*
const intervalId = setInterval( () => {
    db.ref('expenses').push({
        description: 'Rent',
        note: '',
        amount: 44,
        createdAt: 0
    })
}, 5000)

setTimeout( () => {
    clearInterval(intervalId);
}, 16000);


// Events: 
// value
// child_changed
// child_added
// child_removed

const showValueChange = db.ref('expenses').on('value', (snapshot) => {
    const expenses = [];
    snapshot.forEach((childSnapshot) => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        })
    });
    console.log(expenses);
}, (e) => {
    console.log('Error: ' + e);
});



// ref() is the reference to a part in our database. Like in a relational DB we have table names.
// In firebase's noSQL db we have references.
// If no reference is provided to ref(), it will refer to the root of the DB.

// set() does not have to take an object. We can pass any thing to it and it will overwrite it.
db.ref().set({
    name: 'Dhruv Bindoria',
    age: '24',
    isSingle: true,
    location: {
        city: 'Mumbai',
        country: 'India'
    }
});

// Modifying age only
db.ref('age').set(22);

// Modifying city
db.ref('location/city').set('Ujjain');

// Adding new attributes
db.ref('attributes').set({
    height: 175,
    weight: 77
})

// Fetching data once
// .once() takes in only one argument 'eventType'
db.ref().once('value')
    .then((snapshot) => {
        const val = snapshot.val(); // Extracting the data object
        console.log(val);
    }).catch((error) => {
        console.log('Error fetching data: ' + error);
    })

// Setting up subscription to receive data whenever it changes in the DB
// .on() returns the callback function.
const onValueChange = db.ref().on('value', (snapshot) => { 
    console.log(snapshot.val())
}, (e) => {
    console.log('Error: ' + e);
})

// To unsubscribe
// db.ref().off(onValueChange);

// Removing age from root object
db.ref('age')
    .remove()
    .then((data) => {
        console.log('removed');
    })
    .catch((error) => {
        console.log('returned error: ' + error);
    })

// Updating name and isSingle
db.ref()
    .update({
        name: 'Dhruv N. Bindoria',
        isSingle: false
    })

// Using update to add, modify and remove

db.ref()
    .update({
        age: 24,
        job: 'Software Developer', // Putting non-existent properties will add them to the DB
        isSingle: null, // Setting null will remove data
        name: 'Dhruv Bindoria', // Putting existing properties will modify them
        'location/city': 'Mumbai'
    });

// Note to update location (nested object) a reference needs to be provided from the root else the whole object will 
// be changed ie it will delect non-existing properties

*/