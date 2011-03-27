/**
 * HTSlides
 * ---------
 *  
 * This file contains default mechanics for working with presentation.
 * It creates presentation from element #presentation, adds functionality to arrow keys 
 * and saves current slide number to URL (and is able to reopen at that slide)  
 *
 */

$(function(){ 

  var hash_regexp = new RegExp("^#slide=([0-9]+)$");
  // Get current slide number from query string
  var nslide = location.hash.replace( hash_regexp, "$1" );
  if( isNaN(nslide) )
    nslide = 1;
        
  /* Create presentation */
  presentation = $( "#presentation" ).presentation( {firstSlide: nslide} );
  
  /* When key is pressed… */
  $(document).keydown(function(e){
    // If it is right arrow key, move to next slide
    if (e.keyCode == 39) {   
      presentation.nextSlide();
      location.hash = "#slide="+presentation.currentSlideNumber;
      return false;
    }
    // If it is right left key, move to previous slide
    if (e.keyCode == 37) {
      presentation.prevSlide();
      if( presentation.currentSlideNumber > 1 )
        location.hash = "#slide="+presentation.currentSlideNumber;
      else
        location.hash = "";
      return false;
    }
    // If it is up arrow key, move to first slide
    if (e.keyCode == 38) {
      presentation.moveToSlide(1);
      location.hash = "";
      return false;
    }
  });  
  
  /* Links to slides */
  $( 'a[href^="#slide="]' ).click( function( ){
    //var hash_regexp = new RegExp("^#slide=([0-9]+)$");
    // Get current slide number from query string
    var nslide = $(this).attr('href').replace( hash_regexp, "$1" );
    if( !isNaN(nslide) )
      presentation.moveToSlide( nslide );                          
      
            
    return false;
  });
  
});  