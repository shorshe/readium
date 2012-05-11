Readium.Views.ViewerApplicationView = Backbone.View.extend({
	el: 'body',

	uiVisible: false,

	initialize: function() {
		this.model.on("change:full_screen", this.toggleFullscreen, this);
		
		// the book's pages
		this.paginator = new Readium.Models.Paginator({book: _book});

		// the little overlay
		this.navWidget = new Readium.Views.NavWidgetView({model: _book});
		this.navWidget.render();

		// the top bar
		this.toolbar = new Readium.Views.ToolbarView({model: _book});
		this.toolbar.render();

		this.model.on("change:has_toc", this.init_toc, this);

		this.addGlobalEventHandlers();

	},

	toggleFullscreen: function() {
		if(this.model.get("full_screen")) {
			document.documentElement.webkitRequestFullScreen();	
		}
		else {
			document.webkitCancelFullScreen();				
		}
	},

	addGlobalEventHandlers: function() {
		var book = this.model;
		window.onresize = function(event) {
			book.trigger("repagination_event");
		}

		$(document).keydown(function(e) {
			if(e.which == 39) {
				book.nextPage();
			}
							
			if(e.which == 37) {
				book.prevPage();
			}
		});
	},

	render: function() {
		// right now we dont do anything but 
		// convention is to return this from render
		return this; 
	},

	init_toc: function() {
		if( this.model.get("has_toc") ) {
			var toc_item = this.model.getToc();			
			this.toc = toc_item.TocView();
			toc_item.fetch();

		}
	}
});