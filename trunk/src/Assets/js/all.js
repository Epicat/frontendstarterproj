(function (document, FastClick) {
	'use strict';

	if ('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function () {
			FastClick.attach(document.body);
		}, false);
	}

})(document, window.FastClick);

/*https://github.com/louisremi/jquery-smartresize*/
(function($) {
var $event = $.event,
  $special,
  resizeTimeout;
  $special = $event.special.debouncedresize = {
  setup: function() {
    $( this ).on( "resize", $special.handler );
  },
  teardown: function() {
    $( this ).off( "resize", $special.handler );
  },
  handler: function( event, execAsap ) {
    // Save the context
    var context = this,
      args = arguments,
      dispatch = function() {
        // set correct event type
        event.type = "debouncedresize";
        $event.dispatch.apply( context, args );
      };
    if ( resizeTimeout ) {
      clearTimeout( resizeTimeout );
    }
    execAsap ?
      dispatch() :
      resizeTimeout = setTimeout( dispatch, $special.threshold );
  },
  threshold: 150
};
})(jQuery);