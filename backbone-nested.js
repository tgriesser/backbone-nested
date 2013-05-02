(function(Backbone, View) {

  Backbone.View = View.extend({
   
    // Adds a subview to the current view, which will
    // ensure its removal when this view is removed,
    // or when view.removeSubviews is called
    addSubview: function(view) {
      if (!(view instanceof View)) {
        throw new Error("Subview must be a Backbone.View");  
      }
      (this.subviews || (this.subviews = [])).push(view);
      return view;
    },
    
    // Removes any subviews associated with this view
    // by `addSubview`, which will in-turn remove any
    // children of those views, and so on.
    removeSubviews: function() {
      var children = this.subviews;
      if (!children) return this;
      for (var i = 0, l = children.length; i<l; i++) {
        children[i].remove();
      }
      this.subviews = [];
      return this;
    },

    // Extends the view's remove, by calling `removeSubviews`
    // if any subviews exist.
    remove: function() {
      if (this.subviews) this.removeSubviews();
      return View.prototype.remove.apply(this, arguments);
    }
  });

})(this.Backbone, this.Backbone.View);
