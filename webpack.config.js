var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'                      // ******* Place the extracted css into a new file called main.css 
});

module.exports = {
    entry: './src/js/app.js',                // ******* starting point for depenedency graph ***********************
    output: {
        path: path.resolve(__dirname, 'dist'),     // ****** for getting the absolute path because webpack needs it 
        filename: 'bundle.js',
        // publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,                  // ****** All .js files
                use: [
                    {
                        loader: 'babel-loader',    // Use the babel loader to transpile the code
                        options: {
                            presets: ['es2015']    // the ES2015 preset converts es6 to es5
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({             // This plugin gets the output of the sass and css loader
                    use: ['css-loader', 'sass-loader']   // they convert the sass to css
                })
            },
            {
                test: /\.html$/,                         // our index.html file is given to the html loader
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,                    // our images 
                use: [
                    {
                        loader: 'file-loader',           // the file loader takes the image file and creates a new image file 
                                                         // of the same name and extension and places it in the img folder under dest/
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [                                           // Here we initialize the plugins
        extractPlugin,
        new HtmlWebpackPlugin({                          // creates a new html file based on an template
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'])                 // cleanup the folder
    ]
};
