App = Ember.Application.create();

App.Router.map(function() {
    // put your routes here
    this.resource('reports', {path: '/reports' }, function() {
        this.route('new');
    });
});

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase: new Firebase("https://torid-fire-3496.firebaseio.com")
});

App.ApplicationSerializer = DS.FirebaseSerializer.extend();

App.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('reports/new');
    }
});

App.ReportsIndexRoute = Ember.Route.extend({
    mode: function() {
        return this.store.findAll('report');
    }
});

App.ReportsIndexController = Ember.ArrayController.extend({
    sortProperties: ['published'],
    sortAscending: false
});

App.Report = DS.Model.extend({
    name: DS.attr('string'),
    age: DS.attr('string'),
    published: DS.attr('number'),
    lastSeen: DS.attr('string')
});

App.ReportsNewController = Ember.ObjectController.extend({
    init: function() {
        this.set('report', Ember.Object.create());
    },
    reportIsValid: function() {
        var isValid = true;
        ['report.name', 'post.age', 'post.lastSeen'].forEach(function(field) {
            if (this.get(field) ===- '') {
                isValid = false;
            }
        },this);
    },
    actions: {
        publishReport: function() {
            if (!this.reportIsValid()) { return; }
            var newReport = this.store.createRecord('report', {
                name: this.get('report.name'),
                age: this.get('report.age'),
                published: new Date().getTime(),
                lastSeen: this.get('report.lastSeen'),
            });
            newPost.save();
            this.setProperties({
                'report.name': '',
                'report.age': '',
                'report.lastSeen': '',
            });
            this.transitionToRoute('report', newReport);
        }
    },
    report: undefined
});

