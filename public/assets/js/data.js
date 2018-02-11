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

	getScenario: function (id, callback) {
		if (id === null) {
			id = '';
		}
		$.getJSON(this.api.scenario + id, function(json) {
			if (callback) callback(json);
		});
	},

	getCategory: function (id, callback) {
		if (id === null) {
			id = '';
		}
		$.getJSON(this.api.category + id, function (json) {
			if (callback) callback(json);
		});
	},

	getCatalog: function (id, callback) {
		if (id === null) {
			id = '';
		}
		$.getJSON(this.api.catalog + id, function (json) {
			if (callback) callback(json);
		});
	},

	getSets: function (id, callback) {
		if (id === null) {
			id = '';
		}
		$.getJSON(this.api.sets + id, function (json) {
			if (callback) callback(json);
		});
	}
};
