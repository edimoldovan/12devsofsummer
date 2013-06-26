/*jslint browser:true */
/*jslint nomen:true */
/*global App, Ember, DS, console*/

var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.store = DS.Store.create({
	adapter: "DS.FixtureAdapter"
});

App.Post = DS.Model.extend({
	title: DS.attr("string"),
	url: DS.attr("string"),
	channel: DS.attr("string"),
	body: DS.attr("string")
});

App.Post.FIXTURES = [
	{
		id: 1,
		title: "First Post",
		url: "first-post",
		channel: "hobby",
		body: "This is my first post!"
	},
	{
		id: 2,
		title: "Second Post",
		url: "second-post",
		channel: "work",
		body: "This is my second post!"
	},
	{
		id: 3,
		title: "Third Post",
		url: "third-post",
		channel: "work",
		body: "This is my third post!"
	},
	{
		id: 4,
		title: "Fourth Post",
		url: "fourth-post",
		channel: "hobby",
		body: "This is my fourth post!"
	}
];

App.Channel = DS.Model.extend({
	title: DS.attr("string"),
	channel: DS.attr("string"),
	url: DS.attr("string")
});

App.Channel.FIXTURES = [
	{
		id: 1,
		title: "Home",
		channel: "Home",
		url: ""
	},
	{
		id: 2,
		title: "Hobby",
		url: "hobby"
	},
	{
		id: 3,
		title: "Work",
		url: "work"
	}
];

App.Router.map(function() {
	"use strict";
	this.route("channelr", {path: "/:url"});
	this.route("postr", {path: "/:channel/:url"});
});

App.IndexRoute = Ember.Route.extend({
	setupController: function(controller) {
		"use strict";
		controller.set("channels", App.Channel.find());
		controller.set("posts", App.Post.find());
	}
});

App.ChannelrRoute = Ember.Route.extend({
	serialize: function(model) {
		"use strict";
		return {
			url: model.get("url")
		};
	},
	setupController: function(controller, model) {
		"use strict";
		var url = model.get("url");

		console.log(model);
		
		controller.set("channels", App.Channel.find());
		controller.set("posts", App.store.filter(
			App.Post, function(data) {
				if (url === "") {
					return true;
				} else if (data.get("channel") === url) {
					return true;
				}
			})
		);
	}
});

App.PostrRoute = Ember.Route.extend({
	serialize: function(model) {
		"use strict";

		return {
			channel: model.get("channel"),
			url: model.get("url")
		};
	},
	setupController: function(controller, model) {
		"use strict";
		controller.set("channels", App.Channel.find());
		controller.set("post", model);
	}
});












