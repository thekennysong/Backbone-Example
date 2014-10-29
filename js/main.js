//allow us to extend Backbone.Model
var Book = Backbone.Model.extend({
    initialize: function(){ //gets called when Book is called
           this.setIsOnSale();
    },
    setIsOnSale: function(){
            if(this.get('price') < this.get('listPrice')){
                this.set('isOnSale', true);
            }//making it dynamic
            else{
                this.set('isOnSale', false);
            }
    }
}); //will be stored on prototype of book, same as below (class oriented programming)
//var Book = function(){}
//    Book.prototype.someMethod = function(){}
var BookView = Backbone.View.extend({
    template: Handlebars.compile($('#book-template').html()),  //not backbone specific, compile handlebars template
    render: function(){
        var data = this.model.toJSON();
        var html = this.template(data); //saving onto template on Backbone view
        this.$el.html(html); //binding element of book
        //same as....
        //this.el.innerHTML = html;
    }
}); //giving it extra functionality

var book = new Book({ //what if want to create function on top of model?
    title: "You don't know JS",
    author: 'Kyle Simpson',
    image: 'images/ydkjs_scope-and-closures.jpg',
    price: 15.81,
    listPrice: 19.99
}); //creating a new instance of a book
//use .get() to get particular properties within object
//use .set() to set particular properties
//book.toJSON() will get properties right away, when you want to do client-side templating

//often called an ItemView
var view = new BookView({
    model: book, //expecting particular backbone model
    el: '#book' //find element that matches this id and bind to it, rather than binding to existing element

})

view.render(); //this render method is empty by default, must create custom render method
//$('body').prepend(view.el); //creates views in memory and injecting into body

//****************************
//Reviews
//****************************

var Review = Backbone.Model.extend({});

//when take backbone view, called an ItemView vs CollectionView
var ReviewCollection = Backbone.Collection.extend({
   //must know what type of collection it is managing
    model: Review //when create new instance of Review Collection, will take each of objects and be part of ReviewCollection
});

var reviewsCollection = new ReviewCollection(reviewsData);
//rendering a single review model
var ReviewItemView = Backbone.View.extend({
    template: Handlebars.compile($('#review-template').html()),

    render: function(){
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
    }
});

//rendering a collection of models, called collection view
var ReviewsView = Backbone.View.extend({
    render: function(){
        //collection is not an array, so we use each, looping through all, each have a review
        this.collection.each(function(model){
            var view = new ReviewItemView({
               model: model
            });

            view.render();
            //must append to reviewsView element
            this.$el.append(view.el);

        }, this);

        //loop over the collection
        //for each model, create a new ReviewItemView, view that manages a single review
        //render ReviewView
    }
});

var reviewsView = new ReviewsView({
    collection: reviewsCollection,
    el:'#reviews'
});
reviewsView.render();
