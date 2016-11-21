/*
 *  jquery-boilerplate - v4.0.0
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
;( function( $, window, document, undefined ) {

  "use strict";

    var pluginName = "searchPlugin",
      defaults = {
        searchInput : ['#top-search-input'],
        form        : ['.search-form'],
        searchLabel : ['.search-form__label'],
        searchInner : ['.search-form__inner'],
        body        : ['body'],
        breakpoint  : 650,
        isActive    : 'is-active',
        openClassName : 'search-is-open'
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
        this.bindTriggers();
        this.resize();
      },
      bindTriggers: function() {
        var $searchLabel  = $(this.settings.searchLabel[0]),
            $searchInner  = $(this.settings.searchInner[0]),
            $searchInput  = $(this.settings.searchInput[0]),
            $body         = $(this.settings.body[0]),
            breakpoint    = this.settings.breakpoint,
            isActive      = this.settings.isActive,
            openClassName = this.settings.openClassName;
            self = this;
        $searchLabel.on('click', function(event) {
          if( $(window).width() < breakpoint ) {
            event.preventDefault();
            event.stopPropagation();
            if(self.isOpen()) {
              self.close();
            } else {
              self.open();
            }
          }
        });
        $searchLabel.on('touchend', function (e) {
          e.stopPropagation();
        });
        $searchInner.on('click', function (e) {
          e.stopPropagation();
        });
        $searchInner.on('touchend', function (e) {
          e.stopPropagation();
        });
        $body.on('touchend', function() {
          if(self.isOpen()) {
            self.close();
          }
        });
        $searchInput.on('focus', function () {
          setTimeout(function() {
            $searchInner.addClass(isActive);
          }, 200);
        });
        $searchInput.on('blur', function () {
          $searchInner.removeClass(isActive);
          $body.removeClass(openClassName);
        });
      },
      resize: function() {
        var breakpoint    = this.settings.breakpoint,
            $body         = $(this.settings.body[0]);
        //$(window).on('switchbreakpoint', function(){
        $(window).on('debouncedresize', function () {
          if( $(window).width() < breakpoint ) {
            self.close();
          }
        });
      },
      isOpen: function() {
        var $body = $(this.settings.body[0]),
            openClassName = this.settings.openClassName;
        return $body.hasClass(openClassName);
      },
      open: function() {
        var $body = $(this.settings.body[0]),
            openClassName = this.settings.openClassName,
            $searchInput = $(this.settings.searchInput[0]);
        $body.addClass(openClassName);
        $searchInput.focus();
      },
      close: function() {
        var $body = $(this.settings.body[0]),
            openClassName = this.settings.openClassName,
            $searchInput = $(this.settings.searchInput[0]);
        $searchInput.blur();
        $body.removeClass(openClassName);
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