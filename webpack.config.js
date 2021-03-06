module.exports = {
    entry: './app.js',

    output: {
        // path: 'build',
        filename: 'bundle.js'
    },

    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react'],
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }


        ]
    }
}