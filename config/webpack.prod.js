const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const { extendDefaultPlugins } = require("svgo");

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/',
};

// to deploy GH-pages publicPath should be started from project name, live reload path = './'

module.exports = merge(common, {
	mode: 'production',
	output: {
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: true,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					'css-loader',
					'postcss-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}styles/[name].css`,
		}),
		new CssMinimizerPlugin(),
		// new ImageMinimizerPlugin({
		//   test: /\.(png|jpe?g|gif)$/i,
		//   deleteOriginalAssets: false,
		//   filename: `${PATHS.assets}img/webp/[name].webp`,
		//   minimizerOptions: {
		//     plugins: [["imagemin-webp", { quality: 50 }]],
		//   },
		// }),
		// new ImageMinimizerPlugin({
		//   minimizerOptions: {
		//     plugins: [
		//       ["gifsicle", { interlaced: true }],
		//       // lossless
		//       // ["jpegtran", { progressive: true }],
		//       // ["optipng", { optimizationLevel: 7 }],
		//       // lossy
		//       ["mozjpeg", { quality: 50 }],
		//       ["pngquant", { quality: [0.7, 0.9] }],
		//       [
		//         "svgo",
		//         {
		//           plugins: extendDefaultPlugins([
		//             {
		//               name: "removeViewBox",
		//               active: false,
		//             },
		//             {
		//               name: "addAttributesToSVGElement",
		//               params: {
		//                 attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
		//               },
		//             },
		//           ]),
		//         },
		//       ],
		//     ],
		//   },
		// }),
		// new ImageMinimizerPlugin({
		//   test: /\.(png|jpe?g|gif)$/i,
		//   deleteOriginalAssets: false,
		//   filename: `${PATHS.assets}img/avif/[name].[hash].avif`,
		//   minimizerOptions: {
		//     plugins: ["imagemin-avif"],
		//   },
		// }),
	],
});
