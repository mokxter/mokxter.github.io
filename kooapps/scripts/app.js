App = Ember.Application.create();

App.Router.map(function(){
	this.resource("helloworld");
	this.resource("about");
});
