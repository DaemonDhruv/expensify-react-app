const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true, // this will tell the server that we have client side routing and server will always serve index.js
            publicPath: '/dist/' // Dev server serves everything from in memory. And by defualt it serves all the assets from the public dir. So we need to tell it via this property to serve all assets from public/dist/
        }
    }
}