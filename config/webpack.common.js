const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(filename => filename.endsWith('.pug')); // Для html без pug оставить .html

module.exports = {
	entry: {
		app: PATHS.src,
	},

	output: {
		filename: `${PATHS.assets}js/[name].[contenthash].js`,
		path: PATHS.dist,
		clean: true,
		publicPath: '/',
	},
	// target: "web",
	optimization: {
		// runtimeChunk: "single",
		moduleIds: 'deterministic',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},

	module: {
		rules: [
			{
				test: /\.pug$/i,
				use: ['pug-loader'], // 'pug-plain-loader'
			},
			{
				test: /\.m?js$/,
				include: PATHS.src,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: `${PATHS.assets}img/[name].[ext]`,
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65,
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: `${PATHS.assets}fonts/[name][hash][ext]`,
				},
			},
		],
	},
	resolve: {
		alias: {
			src: PATHS.src,
		},
	},
	plugins: [
		new FaviconsWebpackPlugin({
			logo: './src/assets/img/icon.svg',
			inject: true,
		}),
		new CopyPlugin({
			patterns: [
				// { from: "css", to: "css" },
				{ from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
				{ from: `${PATHS.src}/static`, to: '' },
			],
		}),
		...PAGES.map(
			page =>
				new HtmlWebpackPlugin({
					template: `${PAGES_DIR}/${page}`,
					filename: `./${page.replace(/\.pug/, '.html')}`, // Для html без pug оставить просто ${page}
				}),
		),
	],
};
