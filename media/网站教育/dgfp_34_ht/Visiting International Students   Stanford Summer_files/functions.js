/**
 * Functionality specific to Adaptive Path.
 *
 * Provides helper functions to enhance the theme experience.
 */

var $ = jQuery;
var emailfilter = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;

var scrollToOffset = -58;
var ajaxLoading = 0;
var ajaxEmptyResults = 0;
var hash;
var $blogList;
var $optionSets;
var $optionLinks;


var courseSearch = 0;
var courseSearchText = '';
var courseSearchDept = '';
var courseSpecialProgram = '';
var courseSearchUnits = '';
var courseSearchDay = '';
var courseSearchTime = '';

var searchText = '';

var curpage = 1;
var ajaxURL = '';


var weburl = get_hostname(document.location.href);
if (weburl.indexOf("localhost") >= 0 || weburl.indexOf("preview.futurescape.in") >= 0) weburl += '/stanford';


$(window).load(function(){
  
  if($('#blogPageMenu').length > 0){
    // Categories Navigation Click
    $optionSets = $('#categories_nav');
    $optionLinks = $optionSets.find('a');

    $optionLinks.bind('click', function(){
      var $this = $(this);
      if ( $this.hasClass('selected') ) return false;

      var $optionSet = $this.parents('.option-set');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');

      var selector = $this.attr('data-filter');
      $blogList.isotope({filter: selector});
  //      $blogList.isotope({ layoutMode: 'masonry', filter: selector } );

      $('#blog-list .item').removeClass('item-top');
      if(selector == '*') {
        $('#blog-list .item:lt(3)').addClass('item-top');
      } else {
        $('#blog-list '+selector+':lt(3)').addClass('item-top');
      }
    });
  }
  

  $blogList = $('#blog-list .col-12');
  if($blogList.length > 0){
    $blogList.imagesLoaded( function(){
      $blogList.isotope({
        itemSelector : '.item'
      });
    });
    
    //    $blogList.imagesLoaded( function(){
    //      $blogList.isotope({
    //        itemSelector : '.item'
    //      }, function() {
    //        var urlLocation = window.location.href.split('#');
    //        var catFilter = urlLocation[1];
    //
    //        if(catFilter!=null && catFilter!=''){
    //          $optionSets.find('a.nav-'+catFilter).trigger('click');
    //        } else {
    //          if($blogList.length > 0){
    //            $optionSets.find('a.nav-all').addClass('selected');
    //          }
    //        }
    //
    //      });
    //    });
  }
});

( function( $ ) {
	var body    = $( 'body' ),
	    _window = $( window );
      
      
	( function() {
      if($('.interlink').length > 0){
        $('.interlink').each(function(){
          var $item = $(this);
          var $link = $('a',$item);
          
          $link.click(function(e){
            var href = $(this).attr('href').split('#');
            scrollToElement($('a[name='+href[1]), 1000, scrollToOffset);
            e.preventDefault();
          });
        });
      }
    
    
    if($('.bxslider').length > 0){
      $bannerSlider = $('.bxslider').bxSlider({
        'auto': true,
        'pause': 8000,
        'speed': 1000,
        'onSliderLoad': function(currentIndex){
          currentIndex = currentIndex+1;
          var currSlide = $('.bxslider li').eq(currentIndex);
          var slideCaption = $('.slide-caption',currSlide).html();
          var slideCircleTextImg = $('.slide-circle-text',currSlide).html();
          $('.slider-caption-wrapper .caption').empty().append(slideCaption).fadeIn(1000);

          if(slideCircleTextImg==''){
            $('.slider-circle-wrapper .slider-circle, .slider-dotted-path').hide();
          } else {
            $('.slider-dotted-path').fadeIn(600);
            $('.slider-circle-wrapper .slider-circle').empty().append(slideCircleTextImg).fadeIn(800);
          }
        },
        'onSlideBefore': function($slideElement, oldIndex, newIndex){
          $('.slider-circle-wrapper .slider-circle img').fadeOut();
          $('.slider-caption-wrapper .caption').fadeOut();
        },
        'onSlideAfter': function($slideElement, oldIndex, newIndex){
          var slideCaption = $('.slide-caption',$slideElement).html();
          var slideCircleTextImg = $('.slide-circle-text',$slideElement).html();
          $('.slider-caption-wrapper .caption').empty().append(slideCaption).fadeIn(1000);

          if(slideCircleTextImg==''){
            $('.slider-dotted-path').hide();
            $('.slider-circle-wrapper .slider-circle').hide();
          } else {
            $('.slider-dotted-path').fadeIn(600);
            $('.slider-circle-wrapper .slider-circle').empty().append(slideCircleTextImg).fadeIn(1000);
          }
        }
      });

      $(window).resize(function() {
        $bannerSlider.reloadSlider();
      });

    }
    
    
    
    $('.entry-content').children(":first").css({'margin-top': 0});
    
//    if($('#enrich-your-perspective').length > 0) {
//      $('#enrich-your-perspective .entry-content').animate({
//        'opacity': 1,
//        'padding-left': 160
//      }, 400)
//    }



    if($('#searchfaq').length > 0){
      $.ui.autocomplete.prototype._renderItem = function (ul, item) {
        item.label = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
        
      return $("<li></li>")
        .data("item.autocomplete", item)
        .append("<a><strong>" + item.label + "</strong><br />"+ item.value+"</a>")
        .appendTo(ul);
      };

      $("#faq-search").autocomplete({
        source: $('#faq-search').parents('form').attr('rel')+'&term='+$('#faq-search').val(),
        minLength: 4,
        select: function(event, ui) {
          var url = ui.item.id;
          if(url != '#') {
            location.href = url;
          }
        },
        html: true,
        open: function(event, ui) {
          $(".ui-autocomplete").css("z-index", 1000);
        }
      });
    
    
      $('#searchfaq').submit(function(){
        if($('#faq-search').hasClass('error_input')){
          $('#faq-search').removeClass('error_input');
        }
        
        if($('#faq-search').val().replace(/^\s*|\s*$/g,"") == "") {
          $('#faq-search').addClass('error_input');
          return false;
        }
        
        return true;
      });
    }


    $(window).bind('load', function() {
      if(window.location.hash) {
        hash = window.location.hash.replace(/^.*#/, '');
        if ($('#'+hash).length > 0) {
          scrollToElement($('#'+hash), 600, -120);
        } else if ($('.'+hash).length > 0) {
          scrollToElement($('.'+hash), 600, scrollToOffset);
        } else if ($('.section-'+hash).length > 0) {
          scrollToElement($('.section-'+hash), 600, scrollToOffset);
        }
        
      }
    });
    
    
    if($(".circled-icon").length > 0) {
      $(".circled-icon").each(function() {
        var $item = $(this);
        var $icon = $(".icon", $item);
        
        var docViewTop = $(window).scrollTop() + $(window).height();
        var contentTop = $icon.offset().top;
        if(docViewTop > contentTop) {
          $icon.addClass('active');
        }
        
        $(window).scroll(function() {
          if($icon.hasClass('active')) return;
          var docViewTop = $(window).scrollTop() + $(window).height();
          var contentTop = $icon.offset().top;
          if(docViewTop > contentTop) {
            $icon.addClass('active');
          }
        });
        
      });
    }
    
    
    
    $('[href="#newsletter"]').click(function() {
      newsletterDialog.dialog('open');
    })
    
    if($('#newsletter-dialog').length > 0){
      var newsletterDialog = $("#newsletter-dialog").dialog({
        autoOpen: false,
        width: '640px',
        height: 'auto',
        closeOnEscape: true,
        draggable: false,
        resizable: false,
        modal: true,
        position: {my: 'center', at: 'center', of: $(window)}
      });
      
      var options_newsletter = {
        beforeSubmit:  showNewsletterRequest,
        success: showNewsletterResponse
      };
      $('#form-newsletter').submit(function() {
        $(this).ajaxSubmit(options_newsletter);
        return false;
      });
    }

    $('.stanford-form .field').each(function() {
      var $this = $(this);
      if($('.ph-text', $this).length > 0) {
        $this.on('click', function() {
          $('.ph-text', $this).hide();
          $('.txtbox', $this).focus();
        });

        $('.txtbox', $this).on('focus', function() {
          if ($(this).val() == "") {
            $('.ph-text', $this).hide();
          }
        });

        $('.txtbox', $this).on('blur', function() {
          if ($(this).val() == "") {
            $('.ph-text', $this).show();
          }
        });
      }
    });
    
    if($('#form-contact').length > 0){
      var options_contact = {
        beforeSubmit:  showContactRequest,
        success: showContactResponse
      };
      $('#form-contact').submit(function() {
        $(this).ajaxSubmit(options_contact);
        return false;
      });
    }
    
    
    
    
    
    if ($(".twitter-feed").length > 0) {
      String.prototype.parseURL = function() {
        return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
          return url.link(url);
        });
      };

      function parseDate(str) {
        var v=str.split(' ');
        var d = new Date(Date.parse(v[2]+" "+v[1]+", "+v[3]+" "+v[4]+" UTC"));
        return new Date(Date.parse(v[2]+" "+v[1]+", "+v[3]+" "+v[4]+" UTC"));
      }

      var $container = $(".twitter-feed");
      var username = "StanfordSS";
      var num = 1;

      var url = weburl + '/twitter-proxy.php?u='+username+'&num='+num;
      
      $.getJSON( url, function( data ) {
        $.each( data, function( index, item ) {
          tweet = item.text;
          $container.empty().append('<p>'+tweet.parseURL()+'</p>');
          
          var $item = $('.twitter-feed');
          var $feed = $('p', $item)
        
          padTop = parseInt((($item.height() - 43) - $feed.height()) / 2);
          $feed.css({'padding-top': padTop})
          $feed.animate({
            'opacity': 1
          });
          
        });
      });
    }
    
    
    
    if($('.skip-to-content a').length > 0) {
      $('.skip-to-content a').on('click', function(e) {
        e.preventDefault();
        scrollToElement($('#content'), 600, scrollToOffset);
      });
    }
    
    if($('.back-to-top a').length > 0) {
      $('.back-to-top a').on('click', function(e) {
        e.preventDefault();
        scrollToElement($('#page'), 600, scrollToOffset);
      });
    }
    
    
    $(document).bind('click', function(e) {
      var $clicked = $(e.target);
      if ($clicked.parents('#searchform-header').length > 0){
//          Do nothing
      } else {
        $("#searchform-header").stop().animate({'width':38}, 300).removeClass('on');
      }
    });
    
    
  
    /* Programs specific script */

    // Sidebar Programs Accordian
    /*if($('.widget-menu-nav').length > 0){
      $('.widget-menu-nav > ul > li').each(function() {
        var $this = $(this);
        var $toggleBtn = $('<span class="icon-toggle"></span>');
        var $toggleItem = $('ul', $this);
        
        if($this.hasClass('current_page_item') || $this.hasClass('current_page_ancestor')) {
          $toggleBtn.addClass('on');
        }
        $this.append($toggleBtn);

        $toggleBtn.on('click', function(e) {
          e.preventDefault();
          if($toggleItem.length > 0) {
            if($toggleBtn.hasClass('on')){
              $toggleItem.slideUp(300);
              $toggleBtn.removeClass('on');
            } else {
              $toggleItem.slideDown(300);
              $toggleBtn.addClass('on');
            }
          }
        })
      });*/
      
      
      // Third Level Nav in Sidebar
//      $('.widget-program-nav > ul > li > ul > li').each(function(){
//        $item = $(this).not('.current_page_item, .current_page_ancestor');
//        $('ul',$item).hide();
//      });
      
      if($('.program-nav').length > 0){
        $('.program-nav > li > ul > li.menu-item-has-children').each(function() {
          var $this = $(this);
          var $toggleBtn = $('<span class="icon-toggle"></span>');
          var $toggleItem = $('ul', $this);

          if($this.hasClass('current_page_item') || $this.hasClass('current_page_ancestor')) {
            $toggleBtn.addClass('on');
          }
          $this.append($toggleBtn);

          $toggleBtn.on('click', function(e) {
            e.preventDefault();
            if($toggleItem.length > 0) {
              if($toggleBtn.hasClass('on')){
                $toggleItem.slideUp(300);
                $toggleBtn.removeClass('on');
              } else {
                $toggleItem.slideDown(300);
                $toggleBtn.addClass('on');
              }
            }
          })
        });
      }
      


    if($('.video-box').length > 0) {
      $('.video-box').each(function() {
        var $item = $(this);
        var $btnPlay = $('.icon-play-video', $item);
        var $itemVideo = $('.video-embed', $item);

        $btnPlay.click(function(e) {
          e.preventDefault()
          
          $itemVideo.fadeIn().addClass('video-loading').empty().append('<iframe width="414" height="236" src="//www.youtube.com/embed/'+$item.attr('data-video')+'?autoplay=1" frameborder="0" allowfullscreen></iframe>');
          
//          $itemVideo.fadeIn().addClass('video-loading').empty().append('<iframe src="//player.vimeo.com/video/'+$item.attr('data-video')+'?title=0&amp;byline=0&amp;portrait=0&amp;color=910f28&amp;autoplay=1" width="414" height="236" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        });
      });
    }
    
    
    
    if($('.table-expenses').length > 0) {
      $('.table-expander').each(function() {
        $('.table-expander').css({
          top: ($('.expand-table').position().top - 15)
        }).show();

        $('.table-expander').click(function(e) {
          e.preventDefault();
          $(this).fadeOut();
          $('.expand-table').hide();
          $('.hide-me').fadeIn();
        });
      });
      
      
      $('.table-expenses .has-tooltip').each(function() {
        var $item = $(this);
        if($item.hasClass('tr')) {
          var $parent = $item;
        }
        else {
          var $parent = $item.parent('tr');
        }
        var $tooltip = $('.tooltip', $item);
        $tooltip.css({'cursor': 'default'});
        var attr = $item.attr('data-hc');
        if (typeof attr !== 'undefined' && attr !== false) {
          var $headerCol = $('td.'+attr);
        } else {
          var $headerCol = $('td.alignright', $parent);
        }
        
        
        $item.css({'cursor': 'pointer'});
        
        $item.hover(function() {
          $tooltip.css({'top': $item.position().top}).show();
          if($item.hasClass('tr')) {
            $('td', $item).not($headerCol).addClass('fill-bg');
          } else {
            $item.addClass('fill-bg');
          }
          
          $headerCol.addClass('hover-bg');
        }, function() {
          
          if($item.hasClass('tr')) {
            $('td', $item).not($headerCol).removeClass('fill-bg');
          } else {
            $item.removeClass('fill-bg');
          }
          $headerCol.removeClass('hover-bg');
          $tooltip.hide();
        });
      });
    }
    
    
    
    
/* C O U R S E S */
    $('.course-filter-dd').fancyfields();

    if ($('.courses_filters').length > 0) {
      if($('.courses_filters').hasClass('active')){ 
        $('.courses_filters').addClass('on');
      }
      
      $('.courses_filters h3').bind('click', function(){
        var $item = $(this);
        var $parent = $item.parent('.courses_filters');
        
        if($parent.hasClass('on')){
          $('.filter_options',$parent).slideUp();
          $item.stop().animate({'margin-top': 15}, 300, function() {
            $parent.removeClass('on');
          });
        } else {
          $('.filter_options',$parent).slideDown();
          $item.stop().animate({'margin-top': 0}, 300, function() {
            $parent.addClass('on');
          });
        }
      });
      
//      $('.courses_filters h3').hover(function(){
//        $(".courses_filters .hline").effect( "bounce", {direction: 'down', times:3}, 300 );
//      }, function(){
//        //Do Nothing
//      });
      
      $('.courses li a').each(function(){
        var $item = $(this);
        
        $item.bind('click', function(e){
          e.preventDefault();
          
          var $parent = $(this).parent('li');
          if($('ul',$parent).length > 0){
            if($parent.hasClass('on')){
              $('ul',$parent).slideUp();
              $parent.removeClass('on');
            } else {
              $('ul',$parent).slideDown();
              $parent.addClass('on');
            }
          } else{
            return false;
          }
          
        });
      });
    }
    
    
    if($('#courses-search-results').length > 0) {
      var $coursesSearchResults = $('#courses-search-results');
      var $coursesList = $('#courses-list');
      function initCourseSearch() {
        courseSearch = 0;
        courseSearchText = '';
        courseSearchDept = '';
        courseSearchUnits = '';
        courseSearchDay = '';
        courseSearchTime = '';
        courseSpecialProgram = '';

        if($('#txt_search_text').val().replace(/^\s*|\s*$/g,"") != "") {
          courseSearch = 1;
          courseSearchText = $('#txt_search_text').val();
        }

        if($('#cmb_department').val().replace(/^\s*|\s*$/g,"") != ""){
          courseSearch = 1;
          courseSearchDept = $('#cmb_department').val();
        }
        
        if($('#cmb_programs').val().replace(/^\s*|\s*$/g,"") != ""){
          courseSearch = 1;
          courseSpecialProgram = $('#cmb_programs').val();
        }
        
        if($('#cmb_units').val().replace(/^\s*|\s*$/g,"") != ""){
          courseSearch = 1;
          courseSearchUnits = $('#cmb_units').val();
        }

        if($('#cmb_day').val().replace(/^\s*|\s*$/g,"") != ""){
          courseSearch = 1;
          courseSearchDay = $('#cmb_day').val();
        }

        if($('#cmb_time').val().replace(/^\s*|\s*$/g,"") != ""){
          courseSearch = 1;
          courseSearchTime = $('#cmb_time').val();
        }
        ajaxURL = $('#courses-searchform').attr('action');
      }
      
      function getCourseResults() {
        $coursesSearchResults.append('<div class="ajax-loader"><span>Loading More</span></div>');
        jQuery.post( ajaxURL, {
          'section' : 'courses', 
          'search_text' : courseSearchText,
          'department' : courseSearchDept,
          'special_program': courseSpecialProgram,
          'units' : courseSearchUnits,
          'day' : courseSearchDay,
          'time' : courseSearchTime,
          'curpage' : curpage
        },function(response) {
          if (response!='') {
            $coursesSearchResults.append(response);
            ajaxLoading = 0;
          } else {
            
            if(curpage==1) {
              $coursesSearchResults.append('<p class="no-results">There are currently no courses available that match these filters.</p>');
            }
            
            courseSearch = 0;
            ajaxLoading = 0;
          }
          $('.ajax-loader').remove();
        });
      }
      
      
      if($coursesSearchResults.hasClass('active')) {
        initCourseSearch();
        if(courseSearch==1) {
          $coursesList.hide();
        } else {
          $coursesSearchResults.css({'min-height': 0});
          $coursesList.show();
        }
      }
      
      $(window).scroll(function(){
        if (courseSearch==1 && ajaxLoading==0) {
          var docViewTop = $(window).scrollTop();
          var docViewBottom = docViewTop + $(window).height();
          var contentTop = $('#courses-list').offset().top;

          if( (contentTop <= docViewBottom)){
            ajaxLoading = 1;
            curpage++;
            getCourseResults();
          }
        }
      });

      if($('#courses-searchform').length > 0) {
        $('#courses-searchform').submit(function(e) {
          e.preventDefault();

          if(ajaxLoading==1) return false;
          initCourseSearch();
          $coursesSearchResults.empty().css({'min-height': 150});
          
          if(courseSearch==1) {
            ajaxLoading = 1;
            curpage = 1;
            $coursesList.hide();
            getCourseResults();
          } else {
            $coursesSearchResults.css({'min-height': 0});
            $coursesList.show();
          }
          return false;
        });
      }
    }
    
    
    
    if($('.team-member').length > 0) {
      $('.team-member').each(function() {
        var $item = $(this);
        var $overlay = $('.member-overlay', $item);
        $overlay.css({'opacity': 1, 'top': 0, 'left': -300}).show();
        
        $item.hover(function() {
          $item.addClass('mouseover');
          $overlay.stop().animate({
            'left': 0
          });
        }, function() {
          $item.removeClass('mouseover');
          $overlay.stop().animate({
            'left': -300
          });
        });
      });
    }



    $('.header-image').each(function(){
      var $this = $(this); // assigning the object
      var imgH = $this.attr('data-height');
      var containerH = $this.height();
      
      $(window).scroll(function() {
        var docViewTop = $(window).scrollTop();
        var contentTop = $this.offset().top;
        
        var yPos = ((docViewTop) / $this.data('speed'));
        if(yPos <= 0) yPos=0;
        // Move the background
        $($this).css({'top': yPos});
      });
    });
    
    
    $('.banner-middle .banner-image').each(function(){
      var $this = $(this); // assigning the object
      var imgH = $this.attr('data-height');
      var containerH = $this.height();
      
      $(window).scroll(function() {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + ($(window).height() * 0.6);
        var contentTop = $this.offset().top;
      
        var yPos = -((docViewBottom-contentTop) / $this.data('speed'));
        if(yPos >= 0) yPos=0;
        if(yPos < (containerH - imgH)) yPos = containerH-imgH;
        $($this).css({'top': yPos});
      });
    });
    
    // Home page Scrolling text
    if($('.entry-content .scrolling-text').length > 0){
      $('.entry-content .scrolling-text').each(function(){
        var $this = $(this); // assigning the object
        var containerH = $this.height();
        
        $(window).scroll(function() {
          var docViewTop = $(window).scrollTop();
          var docViewBottom = docViewTop + ($(window).height());
          var contentTop = ($this.offset().top + 0);

          if(docViewBottom > contentTop){
            var yPos = -((docViewBottom-contentTop) / 2);
            console.log(yPos);
            if(yPos < containerH ) yPos = -(yPos);
            if(yPos >= 168) yPos=168;
            
            $this.css({ 'left': yPos+'px' });
          } else {
            $this.css({'left': '0px'});
          }
          
        });
      });
    }
    
    
    $('.footer-image').each(function(){
      var $this = $(this); // assigning the object
      var imgH = $this.attr('data-height');
      var containerH = $this.height();
      
      $(window).scroll(function() {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + ($(window).height() * 0.6);
        var contentTop = $this.offset().top;
        
        var yPos = -((docViewBottom-contentTop) / $this.data('speed'));
        if(yPos >= 0) yPos=0;
        if(yPos < (containerH - imgH)) yPos = containerH-imgH;

        // Move the background
        $('img', $this).css({'top': yPos});
//        $('img', $this).css({ 'top': -100 });
      });
    });
   
   
    
    if($('#faqs-accordion').length > 0) {
      if(window.location.hash) {
        hash = window.location.hash.replace(/^.*#/, '');
        var $item = $('.'+hash);
        $item.addClass('on');
        $('.item-content', $item).slideDown();
      }
    }
    
    if($('.course-departments').length > 0) {
      if(window.location.hash) {
        hash = window.location.hash.replace(/^.*#/, '');
        var $item = $('.'+hash);
        $item.addClass('on');
        $('.item-content', $item).slideDown();
      }
    }
    
    
    $(window).scroll(function(){  
      if ($('#blog-list').length > 0 && ajaxLoading==0) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var contentTop = $('.site-footer').offset().top;
        
        if( (contentTop <= docViewBottom)){
          $('#blog-list').append('<div class="ajax-loader"><span>Loading More</span></div>');
          ajaxLoading = 1;
          curpage = curpage+ 1;
          loadArticles(curpage);
        }
      }
    }); 
    
    function loadArticles(curpage){
      var ajax_posturl = $('.load-more-articles').attr('rel');
      var cat = $('.load-more-articles').attr('data-cat');
      var cat_id = null;
      if(cat){ cat_id = cat; }
      
      jQuery.post( ajax_posturl, {
        'curpage' : curpage,
        'section' : 'articles',
        'category' : cat_id 
      },function(response) {
        if (response!='') {
          $('.ajax-loader').remove();
          var $newEls = $(response);
          
          $existingItems = $('.item a').$blogList;
          $blogList.append( $newEls ).isotope( 'insert', $newEls);
          $('.item a', $blogList).not($existingItems).each(function() {
            var $this = $(this);
            var $parent = $this.parents('.item');
            var $parentIMG = $('.item-thumb', $parent);
            var $overlay = $('.overlay', $parentIMG);

            if($parentIMG.length > 0) {
              $this.hover(function() {
                $('.topbar', $parentIMG).stop().animate({'top': 0}, 300);
                $parent.addClass('mouseover');
                $overlay.addClass('mouseover');
              }, function() {
                $('.topbar', $parentIMG).stop().animate({'top': -6}, 300);
                $parent.removeClass('mouseover');
                $overlay.removeClass('mouseover');
              });
            }
          });
          
          ajaxLoading = 0;
        }
      });
    }
    
    
    
    
    
    
    
    
    
    if($('.accordion').length > 0){
      $('.accordion').each(function() {
        var $this = $(this);
        var $items = $('.accordion-item', $this);
        var $parent = $this.parents('#courses-list');
        
        $items.each(function() {
          var $item = $(this);
          $('.item-title', $item).click(function() {
            if($item.hasClass('on')) {
              $item.toggleClass('on');
              $('.item-content', $item).slideToggle();
            } else {
              
              if($parent.length > 0) {
                $curActive = $('.on', $parent);
              } else {
                $curActive = $('.on', $this);
              }
              $curActive.removeClass('on')
              $('.item-content', $curActive).slideToggle();
              $item.toggleClass('on');
              $('.item-content', $item).slideToggle();
            }
          });
        });
      });
    }
    
    
    $("#searchform-header").submit(function() {
      if($("#searchform-header").hasClass("on")) {
        if($('#s_header').val().replace(/^\s*|\s*$/g,"") == "") {
          return false;
        }
      } else {
        $("#searchform-header").addClass("on");
        return false;
      }
    });
    
    $("#searchsubmit-header").hover(function() {
      if($("#searchform-header").hasClass("on")) {
//        $("#searchform-header").stop().animate({'width':42}, 200);
      } else {
        $("#searchform-header").stop().animate({'width':42}, 200);
      }
    }, function() {
      if($("#searchform-header").hasClass("on")) {
//        $("#searchform-header").stop().animate({'width':42}, 200);
      } else {
        $("#searchform-header").stop().animate({'width':38}, 200);
      }
    });
    
    $("#searchsubmit-header").click(function(e) {
      if($("#searchform-header").hasClass("on")) {
//        
      } else {
        $("#searchform-header").stop().animate({'width':382}, 600, function() {
          $("#searchform-header").addClass('on')
        });
      }
    });
    
    
    if($('#search-results').length > 0) {
      ajaxURL = $('#search-results').attr('rel');
      section = $('#search-results').attr('data-section');
      if(section=='faq_search'){
        searchText = $('#faq-search').val();
      } else{
        searchText = $('#s_header').val();
      }
      
      
      function getSearchResults() {
        $('#search-results').append('<div class="ajax-loader"><span>Loading More</span></div>');
        jQuery.post( ajaxURL, {
          'section' : section, 
          'search_text' : searchText,
          'curpage' : curpage
        },function(response) {
          if (response!='') {
            $('#search-results').append(response);
            ajaxLoading = 0;
          } else {
            ajaxEmptyResults = 1;
            ajaxLoading = 0;
          }
          $('.ajax-loader').remove();
        });
      }
      
      $(window).scroll(function(){
        if (ajaxEmptyResults==0 && ajaxLoading==0) {
          var docViewTop = $(window).scrollTop();
          var docViewBottom = docViewTop + $(window).height();
          var contentTop = $('.site-footer').offset().top;

          if( (contentTop <= docViewBottom)){
            ajaxLoading = 1;
            curpage++;
            getSearchResults();
          }
        }
      });
    }
   
    if($('#courses-searchform').length > 0) {
      $('#courses-searchform').submit(function(e) {
        e.preventDefault();

        if(ajaxLoading==1) return false;
        initCourseSearch();

        if(courseSearch==1) {
          $('#courses-search').empty();
          ajaxLoading = 1;
          curpage = 1;
          getCourseResults();
          
        } else {
          $('#courses-search').empty();
        }
        return false;
      });
    }
    
    
    $.fn.equalizeHeights = function(){
      return this.height( Math.max.apply(this, $(this).map(function(i,e){return $(e).height()}).get() ) )
    }
    
    $(window).bind('load', function() {
      $('.equal-col').equalizeHeights();

      if($('#faq-categories').length > 0) {
        $('#faq-categories .row').each(function() {
          $('.desc', $(this)).equalizeHeights();
        });
      }
    
      $('#home-widgets .col-4').equalizeHeights();
      $("#experience-stanford .item").equalizeHeights();
      $(".page-apply .content-col").equalizeHeights();
      $(".programs-list .program-item").equalizeHeights();
    })
    
    
    if($('.programs-list').length > 0){
      $('.program-item a').each(function() {
        var $this = $(this);
        var $parent = $this.parents('.program-item');
        var $parentIMG = $('.item-thumb', $parent);
        var $overlay = $('.overlay', $parentIMG);
        
        if($parentIMG.length > 0) {
          $this.hover(function() {
            $('.topbar', $parentIMG).stop().animate({'top': 0}, 300);
            $parent.addClass('mouseover');
            $overlay.addClass('mouseover');
          }, function() {
            $('.topbar', $parentIMG).stop().animate({'top': -6}, 300);
            $parent.removeClass('mouseover');
            $overlay.removeClass('mouseover');
          });
        }
      });
    }
    
    
    
    if($('#blog-list').length > 0){
      $('#blog-list .item a').each(function() {
        var $this = $(this);
        var $parent = $this.parents('.item');
        var $parentIMG = $('.item-thumb', $parent);
        var $overlay = $('.overlay', $parentIMG);
        
        if($parentIMG.length > 0) {
          $this.hover(function() {
            $('.topbar', $parentIMG).stop().animate({'top': 0}, 300);
            $parent.addClass('mouseover');
            $overlay.addClass('mouseover');
          }, function() {
            $('.topbar', $parentIMG).stop().animate({'top': -6}, 300);
            $parent.removeClass('mouseover');
            $overlay.removeClass('mouseover');
          });
        }
      });
    }
    
    
    
    if($('.circled-icon').length > 0) {
      $('.circled-icon').each(function() {
        var $item = $(this);
        $('a', $item).each(function() {
          $(this).hover(function() {
            $('a', $item).addClass('mouseover');
          }, function() {
            $('a', $item).removeClass('mouseover');
          });
        });
      });
    }
    
    
    
    //Custom drop downs for events and album (photos)
    $(".selectBox").each(function() {
      $(this).hide();

      var source = $(this);
      var selected = source.find("option[selected]");
      var options = $("option", source);

      var source_container = $(this).parents(".selectBox-container");
      $(source_container).append('<dl class="dropdown"></dl>')
      $(".dropdown", source_container).append('<dt><a href="javascript:void();"><span class="'+$(selected).attr('class')+'">' + selected.text() +
          '</span><span class="value">' + selected.val() +
          '</span></a></dt>')
      //$(".dropdown", source_container).append('<dd><ul></ul></dd>')
      $(".dropdown", source_container).append('<dd><div class="dropdown_scrollPane" rel="0"><ul></ul></div></dd>');

      options.each(function(){
        $(".dropdown dd ul", source_container).append('<li><a href="javascript:void();" class="'+$(this).attr('class')+'">' +
          $(this).text() + '<span class="value">' +
          $(this).val() + '</span></a></li>');
      });

      $(".dropdown dt a", source_container).click(function() {
        dropdown_options = $(".dropdown dd ul", source_container);
        $(".dropdown dd ul").not(dropdown_options).hide();
        $(dropdown_options).toggle();
        scrollPane = $('.dropdown_scrollPane',source_container);
              if ($(scrollPane).attr('rel')==0) {
                  $(scrollPane).attr('rel',1);
                  $('ul', scrollPane).jScrollPane({
                    verticalGutter:0
                  });
              }
        return false;
      });

      $(".dropdown dd ul li a", source_container).click(function() {
        var text = $(this).html();
        // $(".dropdown dt a", source_container).html(text);
        $(".dropdown dt a", source_container).html('<span class="'+$(this).attr('class')+'">' + text + '</span>');
        $(".dropdown dd ul", source_container).hide();

        var source = $(".selectBox", source_container);
        source.val($(this).find("span.value").html())

        if($(source).attr("id") == "selectEventType") {
          event_category =source.val();
          $('#frm_event_search #event_start_date').val('')
          $('#frm_event_search #event_end_date').val('')
          $('#frm_event_search #start_date').removeClass('active');
          $('#frm_event_search #end_date').removeClass('active');
          $('.cell span').removeClass('selected');
          curpage = 1;
          load_events();
        }


        if($(source).attr("id") == "selectAlbum") {
          gallery_id =source.val();
          load_photo_gallery(gallery_id);
        }
        return false;
      });					
    });

    $(document).bind('click', function(e) {
      var $clicked = $(e.target);
      if (! $clicked.parents().hasClass("dropdown")){
        $(".dropdown dd ul").hide();
      }
    });
	} )();

  
  
  function ulAccordian($item){
    $item.each(function(){
      var $item = $(this);
      
      $item.bind('click', function(e){
        e.preventDefault();

        var $parent = $(this).parent('li');
        if($('ul',$parent).length > 0){
          if($parent.hasClass('on')){
            $('ul',$parent).slideUp();
            $parent.removeClass('on');
          } else {
            $('ul',$parent).slideDown();
            $parent.addClass('on');
          }
        } else{
          return false;
        }

      });
    });
  }
  
  
} )( jQuery );




function get_hostname(url) {
  var m = ((url||'')+'').match(/^http:\/\/[^/]+/);
  return m ? m[0] : null;
}


function showNewsletterRequest(formData, jqForm, options) {
  var isValid = true;
  $('.field',jqForm).removeClass('error_input');
  $('.required',jqForm).each(function(){
    var $field = $(this);
    var $parent = $field.parent('.field');
    if($field.val().replace(/^\s*|\s*$/g,"")==""){
      $parent.addClass('error_input');
      isValid = false;
    }
  });

  if(isValid && emailfilter.test($("#txt-email",jqForm).val())==false){
    var $parent = $("#txt-email",jqForm).parent('.field');
    $parent.addClass('error_input');
    $("#txt-email",jqForm).focus();
    isValid = false;
  }
  if(isValid){
    $('.ajax-loader',jqForm).fadeIn();
  }
  return isValid;
}

function showNewsletterResponse(responseText, statusText, xhr, $form){
  $('.ajax-loader',$form).fadeOut();
 
  if (statusText==" success" || statusText=="success"){
    if (responseText == 'success'){
      $('#newsletter-dialog .page-title').empty().append('Thank You!');
      $('#newsletter-dialog .dialog-content').empty().append('<div class="highlighted-text">Your email address has been added to our newsletter.</div>');
      return false;
    } else if(responseText == 'save failed'){
      $('.error-msg').empty().append('Error in newsletter submission.').show();
    } else {
      $('.error-msg').empty().append(responseText).show();
    }
  }
}


function showContactRequest(formData, jqForm, options) {
  var isValid = true;
  $('.field',jqForm).removeClass('error_input');
  $('.status-msg').empty();
  
  $('.required',jqForm).each(function(){
    var $field = $(this);
    var $parent = $field.parent('.field');
    if($field.val().replace(/^\s*|\s*$/g,"")==""){
      $parent.addClass('error_input');
      isValid = false;
    }
  });

  if(isValid && emailfilter.test($("#txt-email",jqForm).val())==false){
    var $parent = $("#txt-email").parent('.field');
    $parent.addClass('error_input');
    $("#txt-email").focus();
    isValid = false;
  }
  
  if($('#recaptcha_response_field').val().replace(/^\s*|\s*$/g,"")==""){
    $('#recaptcha_response_field').addClass('captcha_err');
    isValid = false;
  }
  if(isValid){
    $('#form-contact .ajax-loader').fadeIn();
  }
  return isValid;
}

function showContactResponse(responseText, statusText, xhr, $form){
  if (statusText==" success" || statusText=="success"){
    $('#form-contact .ajax-loader').fadeOut();
    scrollToElement($('.entry-content'), 600, 0);
    
    if (responseText == 'success'){
      $('#recaptcha_response_field').removeClass('captcha_err');
      $('#form-contact')[0].reset();
      $('#form-contact .txtbox').each(function(){
        $(this).focus();
      });
      $('.status-msg').empty().append('Thank you! Your message has been sent.');
      return false;
    } else if(responseText == 'invalid_captcha'){
      $('.status-msg').empty().append('Invalid captcha key.');
      $('#recaptcha_response_field').addClass('captcha_err');
      return false;
    } else if(responseText == 'save failed'){
      $('.status-msg').empty().append('Error in contact submission.');
      return false;
    } else {
      $('.status-msg').empty().append(responseText);
    }
  }
}

function scrollToElement(selector, time, verticalOffset, callback) {
  time = typeof(time) != 'undefined' ? time : 500;
  verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
  element = $(selector);
  offset = element.offset();
  offsetTop = offset.top + verticalOffset;
  t = ($(window).scrollTop() - offsetTop);
  if (t <= 0) t *= -1
  t = parseInt(t * .5);
  if (t < time) t=time
  if (t > 1500) t=1500
  $('html, body').animate({
    scrollTop: offsetTop
  }, t, 'easeInOutCirc', callback);
}