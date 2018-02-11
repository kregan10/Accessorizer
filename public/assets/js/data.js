/**
 * Loads data necessary for the views.
 * 
 * TODO: Add secondary parameters for parsing
 * single item/result requests.
 */
var data = {
	api: {
		scenario: "info/",
		category: "info/category/",
		catalog: "info/catalog/",
		sets: "info/bundle/"
	},

	getScenario: function (callback) {
		$.getJSON(this.api.scenario, function(json) {
			if (callback) callback(json);
		});
	},

	getCategory: function (callback) {
		$.getJSON(this.api.category, function (json) {
			if (callback) callback(json);
		});
	},

	getCatalog: function (callback) {
		$.getJSON(this.api.catalog, function (json) {
			if (callback) callback(json);
		});
	},

	getSets: function (callback) {
		$.getJSON(this.api.sets, function (json) {
			if (callback) callback(json);
		});
	}
};