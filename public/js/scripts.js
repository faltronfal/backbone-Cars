// Backbone Model

var Blog = Backbone.Model.extend({
	defaults: {
		name: '',
		year: '',
		engine: ''
	}
});

// Backbone Collection

var Blogs = Backbone.Collection.extend({});



// instantiate a Collection

var blogs = new Blogs();

// Backbone View for one blog

var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
	events: {
		'click .edit-blog': 'edit',
		'click .update-blog': 'update',
		'click .cancel': 'cancel',
		'click .delete-blog': 'delete'
	},
	edit: function() {
		$('.edit-blog').hide();
		$('.delete-blog').hide();
		this.$('.update-blog').show();
		this.$('.cancel').show();

		var name = this.$('.name').html();
		var year = this.$('.year').html();
		var engine = this.$('.engine').html();

		this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
		this.$('.year').html('<input type="text" class="form-control year-update" value="' + year + '">');
		this.$('.engine').html('<input type="text" class="form-control engine-update" value="' + engine + '">');
	},
	update: function() {
		this.model.set('name', $('.name-update').val());
		this.model.set('year', $('.year-update').val());
		this.model.set('engine', $('.engine-update').val());
	},
	cancel: function() {
		blogsView.render();
	},
	delete: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone View for all blogs

var BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append((new BlogView({model: blog})).render().$el);
		});
		return this;
	}
});

var blogsView = new BlogsView();

$(document).ready(function() {
	$('.add-blog').on('click', function() {
		var blog = new Blog({
			name: $('.name-input').val(),
			year: $('.year-input').val(),
			engine: $('.engine-input').val()
		});
		$('.name-input').val('');
		$('.year-input').val('');
		$('.engine-input').val('');
		console.log(blog.toJSON());
		blogs.add(blog);
	})
})