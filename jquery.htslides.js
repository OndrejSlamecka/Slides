/**
 * HTSlides
 * ---------
 *  
 * HyperText Slides. 
 * Lightweight jQuery plugin for creating simpliest presentations.
 * 
 * Author: Ondrej Slamecka, http://www.slamecka.cz/, ondrej / slamecka / cz
 * Made: March, 2011
 * Version: 0.4 (Revision 55)
 * Copyright: (c) Ondrej Slamecka 2011  
 * License: New BSD
 *
 */
 
;(function($){

var Presentation = function( presentation, options ){
 
  /***************** Variabiles *****************/

  this.defaultopts = {
    effectspeed : 100,
    firstSlide : 1   
  };
  
  /***************** Methods *****************/
  
  /*-- TRAVERSING METHODS --*/
  // Returns next slide's number
  this.getNextSlide = function()
  {         
    if( this.currentSlideNumber == null )
      this.currentSlideNumber = 0; // we will add 1   
    if( this.currentSlideNumber == this.totalSlides )
      return this.currentSlideNumber;
            
    return this.currentSlideNumber+1;
  } 
  
  // Returns prev slide's number
  this.getPrevSlide = function()
  {         
    if( this.currentSlideNumber == null )
      this.currentSlideNumber = 2; // we will substract 1  
    if( this.currentSlideNumber == 1 )
      return 1; 

    return this.currentSlideNumber -1;       
  }
    
  /*-- PRESENTATION METHODS --*/
  
  /* NEXTSLIDE */
  // Shows one slide further
  this.nextSlide = function( )
  {              
    this.currentSlideNumber = this.getNextSlide();   
    this.moveToSlide( this.currentSlideNumber ); 
  }
  
  /* PREVSLIDE */
  // Shows one slide before
  this.prevSlide = function( )
  {          
    this.currentSlideNumber = this.getPrevSlide();
    this.moveToSlide( this.currentSlideNumber );
  }
  
  this.moveToSlide = function( nSlide ){
    this.$presentationArea.animate( {scrollLeft: window_width * (nSlide -1) } , this.options.effectspeed);    
  }
  
  
  /***************** Constructor *****************/
  
  // Build options  
  this.options = $.extend({}, this.defaultopts, options);
    
  /* Presentation elements */
    var $presentation = $(presentation);
    var $slides = $presentation.children();
    var slides = $slides.get();
    
    // If there's less than one element, it can't be a presentation of course
  	if ( slides.length < 1 ){
  		console.log( slides.length + ' elements? You call it a presentation?!' );
  		return;
  	}  
  	
    // Set presentation display to block
    $presentation.css( { display : 'block' } );
  	
  	
  	// Slides numbers
    this.totalSlides = slides.length;
    this.currentSlideNumber = 1;

  /* Presentation view */
   
    // Window sizes  
    $window = $(window);
    var window_width = $window.width();
    var window_height = $window.height();
        
    // Slides sizes        
    var $slide = $(".slide"); 
    $slide.width( window_width );
    
    var $slide_body = $( ".body", $slide );
    $slide_body.css( "margin-top", (window_height - $slide_body.height()) / 2 );    
    
    // Presentation area
    this.$presentationArea = $("html,body");    
    this.$presentationArea.width( this.totalSlides * window_width );
    
    // Scroll to first slide in case we aren't there
    this.moveToSlide( this.options.firstSlide );
      
};

// Pluginize Presentation class
$.fn.presentation = function( options, returnInstance ){

    var $this = $(this);
    
    // If it already has a presentation
    if( $this.data( 'presentation' ) )
      return;
    
    // Create new presentation
    var presentation = new Presentation( this, options );
    
    // Save data to elements's data
    $this.data( 'presentation' , presentation );
    
    return presentation;   
  
};

})(jQuery);  