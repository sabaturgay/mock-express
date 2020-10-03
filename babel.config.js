
    module.exports = function (api) {
      api.cache(true)
      return {
	"presets": [
		[
			"@babel/preset-env",
			{
				"targets": {
					"node": "current"
				}
			}
		],
		"@babel/preset-typescript"
	],
	"plugins": [
		[
			"module-resolver",
			{
				"extensions": [
					".js",
					".jsx",
					".es",
					".es6",
					".mjs",
					".ts",
					".tsx"
				],
				"alias": {
					"@assets": "./src/assets",
					"@utils": "./src/utils",
					"@root": "./src",
					"@machine": "./src/machine",
					"@store": "./src/machine/store",
					"@constants": "./src/constants",
					"@type": "./src/type",
					"unitx": "unitx/cjs"
				}
			}
		],
		"@babel/plugin-proposal-nullish-coalescing-operator",
		"@babel/plugin-proposal-optional-chaining",
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-proposal-object-rest-spread",
		"@babel/plugin-proposal-numeric-separator"
	]
}
    }
    