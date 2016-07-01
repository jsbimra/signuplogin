/**
 * Represents a test function.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Test2(title, author) {
}

/**
* Defining documentation using jsDoc
*/
/**
* jQuery document ready function to initialze the code once DOM is ready
* @external "jQuery"
* @see {@link http://docs.jquery.com/ The jQuery API}
*/
$(function(){

	/** 
	* Invoking Bootstrap Carousel on dom element with class called .carousel 
	* @external "bootstrap"
	*/
	$('.carousel').carousel({
		  interval: false
	});

	/** 
		*Looping on each carousel item  
	*/
	$('.carousel .item').each(function() {
	    var next = $(this).next();
	    if (!next.length) {
	        next = $(this).siblings(':first');
	    }
	    next.children(':first-child').clone().appendTo($(this));

	    /** Cloning siblings element after next element */
	    for (var i=0;i<5;i++) {
			next=next.next();
			if (!next.length) {
				next = $(this).siblings(':first');
			}
			next.children(':first-child').clone().appendTo($(this));
		}
	});

});