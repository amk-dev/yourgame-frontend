// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
// 	.BundleAnalyzerPlugin

const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
	// configureWebpack: {
	// 	plugins: [new BundleAnalyzerPlugin()],
	// },
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					purgecss({
						content: [`./public/**/*.html`, `./src/**/*.vue`],
						defaultExtractor(content) {
							const contentWithoutStyleBlocks = content.replace(
								/<style[^]+?<\/style>/gi,
								''
							)
							return (
								contentWithoutStyleBlocks.match(
									/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
								) || []
							)
						},
						safelist: {
							standard: [
								/-(leave|enter|appear)(|-(to|from|active))$/,
								/^(?!(|.*?:)cursor-move).+-move$/,
								/^router-link(|-exact)-active$/,
								/data-v-.*/,
							],
							deep: [/.*nprogress.*/],
						},
					}),
					require('autoprefixer'),
				],
			},
		},
	},
}
