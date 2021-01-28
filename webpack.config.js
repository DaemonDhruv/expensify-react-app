const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

// cross-env allows to set the NODE_ENV variable on desired value on cross OS platforms

// Setting this Node variable to 'test' if test is present in it or 'production'. 
// If nothing is present in the variable then we want to set it 'develpment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// We have set up these NoDE_ENV variables to work with the type of environment we are running the application in
// test for testing with jest
// development for developing code
// production when deployed
// Note: We don't want webpack to actually pass these NODE_ENV variables to the running client-side javascript
// As this will expose lot of private stuff to public.
// Instead we'd have to pass down the value of these NODE_ENV varialbes manually into client-side bundle.js! Using a webpack plugin.
if(process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}
// We can export a function which will return an object
// We need to specify the build command of webpack in the package.json to call this function and pass the correct argument

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css'); // styles.css is the name of the file in which we want webpact (ExtractTextPlugin) to dump all the css styles in to be loaded into the index.html at runtime.

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }]
        },
        plugins: [
            CSSExtract,
            // DefinePlugin will take and object. It will look of keys in the entire code and replace the key with 
            // the value provided!
            // But it will just replace value and not it's content. For this we need to JSON.stringify it!
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true, // this will tell the server that we have client side routing and server will always serve index.js
            publicPath: '/dist/' // Dev server serves everything from in memory. And by defualt it serves all the assets from the public dir. So we need to tell it via this property to serve all assets from public/dist/
        }
    }
}