/*
 *  jquery-boilerplate - v4.0.0
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
;( function( $, window, document, undefined ) {

  "use strict";

    var pluginName = "breakPoints",
      defaults = {
        small: 550,
        medium: 980,
        xlarge: 1330
      };

    function Plugin ( element, options ) {
      this.element = element;
      this.settings = $.extend( {}, defaults, options );
      this._defaults = defaults;
      this._name = pluginName;
      this.init();
    }

    $.extend( Plugin.prototype, {
      init: function() {
        this.breakpoint = this.getBreakPoint();
        this.eventListeners();
      },
      eventListeners: function() {
        var medium = this.settings.medium,
            small = this.settings.small;    

        $(window).on('debouncedresize', function () {
          var breakpoint = getBreakPoint();
          function getBreakPoint() {
            var width = $(window).width();
            if(width > medium) {
              return 'large';
            } else if(width > small) {
              return 'medium';
            } 
            return 'small';
          }
          console.log('breakpoint switched to: ' + breakpoint);
          if(breakpoint !== breakpoint) {
            breakpoint = breakpoint;
            $(window).triggerHandler('switchbreakpoint');
          }
        });
      },
      getBreakPoint: function() {
        self = this;
        var width = $(window).width();
        if(width > self.settings.medium) {
          return 'large';
        } else if(width > self.settings.small) {
          return 'medium';
        } 
        return 'small';
      }
    } );

    $.fn[ pluginName ] = function( options ) {
      return this.each( function() {
        if ( !$.data( this, "plugin_" + pluginName ) ) {
          $.data( this, "plugin_" +
            pluginName, new Plugin( this, options ) );
        }
      } );
    };

} )( jQuery, window, document );