const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '..', 'public');
const app = express(); // we are creating an instance of express application
// This is for Heroku. It provides us and enivronment on whiich the PORT number is dynamic.
const port = process.env.PORT || 3000;

// This allows us to config the app and set up middlewares.
app.use(express.static(publicPath)); // We are telling express to serve all assets from the publicPath

// This is a middleware, whenever a request is received from the client or sent back from the server, this function will be invoked.
// It's is invoked by express application and express passess it the request which was received and the response the app is going to send.
// In this way we can modify the response. In our case we want to serve the index.html file only as it is the whole react application.
// We are doing this so that the react app's router can handle the routes. 
// This is similar to what we did in the dev environment by setting historyApiFallback property to true in our webpack config
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// We are starting the server
// We are telling express to serve this app on port 3000, which is a very common port for web apps in dev env
app.listen(port, () => {
    console.log('Server is up!');
});