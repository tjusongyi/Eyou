/* :::::::::::::::::::::::::::::::::::::::::::::::::::
	
	GLOBAL SCRIPTS
	
:::::::::::::::::::::::::::::::::::::::::::::::::::*/


// DROPDOWN MENU
function dropDownMenu() {
	
	var dropdownLinks = $(".dropdown-link");
	var dropdownWrapper = $(this).next(".dropdown-wrapper");
	var dropdownSpacer = $("#dropdown-spacer");
	
	//if all dropdown menus are closed
	if ( !($(dropdownLinks).hasClass("selected")) ) {
		$(this).addClass("selected");
		$(dropdownSpacer).animate({
			height: "115"
		}, "fast");
		$(dropdownWrapper).slideDown("fast");
	} 
	//if $(this) dropdown menu is open
	else if ( $(this).hasClass("selected") ) { 
		$(this).removeClass("selected");
		$(dropdownSpacer).animate({
			height: "0"
		}, "fast");
		$(dropdownWrapper).slideUp("fast");
	} 
	//if another dropdown menu is open
	else if ( $(dropdownLinks).not(this).hasClass("selected") ) { 
		$(dropdownLinks).removeClass("selected");
		$(this).addClass("selected");
		$(".dropdown-wrapper").hide();
		$(dropdownWrapper).show();
	}
	
	//don't follow the link
	return false;
}




/* :::::::::::::::::::::::::::::::::::::::::::::::::::
	
	DOM IS LOADED
	
:::::::::::::::::::::::::::::::::::::::::::::::::::*/
$(document).ready(function() {
	//TEMP HACK TO FIX FONTS NOT RENDERING ON CHROME 33.0.1750.117
	$('body')
		.delay(500)
		.queue( 
		function(next){ 
			$(this).css('padding-right', '1px'); 
		}
	);

	//CENTENNIAL CAMPAIGN
	function setCookie(cname,cvalue,exdays) {
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) 
		  {
		  var c = ca[i].trim();
		  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return "";
	}

	function checkCookie() {
		//var centennial_return_visit = getCookie("centennial_return_visit");
		/*if (centennial_return_visit == "yes") {
			//IF RETURN VISIT, DON'T ANIMATE CENTENNIAL BANNER
		} else {
			//setCookie("centennial_return_visit",'yes',1); //SET THE COOKIE
			//ANIMATE THE BANNER
			$('#let-there-be').delay(2000).animate({
			    right: '-335',
			    easing: 'easeInOutExpo'
			});
		}*/

		$('#let-there-be-flyout').delay(800).animate({
		    right: '0',
		    easing: 'easeInOutExpo'
		});

		$('#let-there-be-flyout').delay(7000).animate({
		    right: '-310',
		    easing: 'easeInOutExpo'
		},function() {
    		$(this).removeAttr('style');
			    $("#let-there-be-flyout").hover(function() {
			        $(this).stop().animate({
			            right: '0'
			        }, 500);
			    }, function() {
			        $(this).stop().animate({ right: "-310" }, 500);
			        
			    });
		});
	}

	window.onload = function() {
  		checkCookie(); //CHECK THE CENTENNIAL RETURN VISITOR 
	};
	

	// MAIN NAV
	$(".dropdown-link").bind("click",dropDownMenu); //bind dropdown menu function
	
	$(".close").click(function(){ //close menu
		$('.selected').focus();
		$(".dropdown-link").removeClass('selected');		
		$(this).parents(".dropdown-wrapper").slideUp("fast");
		$("#dropdown-spacer").animate({
    		height: ""
 		}, "fast");
 		
 		return false;
	});

	
	// HOME IMAGE SLIDESHOW
	$('#main-slideshow').flexslider({animationDuration: 400, directionNav: false, controlsContainer: "#main-slideshow"});
		
	
	// FEATURED STORIES CAROUSEL
	$('#featured-stories').tinycarousel({duration: 400});
	
	if ($('#logo a').css('display') == 'block') {
		$('#featured-stories').clone().removeAttr('featured-stories').attr('id','featured-stories-mobile').insertAfter('#featured-stories');
		$('#featured-stories-mobile .overview').width('105%');
	}
	

	// RESPONSIVE VIDEOS
	$('#main-content').fitVids();
	
	
	//::::: FANCYBOX 2.1.5 GALLERIES
	$('.gallery li a').fancybox({
		beforeShow : function() { //ADD ALT TAG TO LIGHTBOX LARGE IMAGE
	        var alt = this.element.find('img').attr('alt');
	        this.inner.find('img').attr('alt', alt);	        
	        this.title = alt;
    	},
    	keys: {
    		next : {
				13 : 'left', // enter
				34 : 'left',   // page down
				39 : 'left', // right arrow
				40 : 'left'    // down arrow
			},
			prev : {
				8  : 'right',  // backspace
				33 : 'right',   // page up
				37 : 'right',  // left arrow
				38 : 'right'    // up arrow
			}
    	},
		helpers: {
			title: null, //HIDE ALT/TITLE FROM BEING DISPLAYED
			overlay : {
				css : {
					'background-image': 'url("../img/fancybox_overlay_ucla.png")' //SET OVERLAY COLOR TO #002256 @ 50% OPACITY
				},
				locked: false //PREVENT PAGE BEHIND LIGHTBOX FROM SCROLLING
			}
		}
	});
	
	
	// DEPARTMENTS & PROGRAMS NAVIGATION
	$('.dept-list-group').each(function(key, value) {
		var letter = $(this).text().toLowerCase();
		$("#dept-list-" + letter).removeClass("dept-list-inactive").addClass("dept-list-active");
	});
	

	// TABLE STRIPING
	$(".stripe").find("tbody tr:odd").addClass("alt");
	
	
	// iOS4 DETECTION TO REMOVE FIXED FOOTER
	if ( /iPad/i.test(navigator.userAgent) ) {
		if ( /OS [2-4]_\d(_\d)? like Mac OS X/i.test(navigator.userAgent) ) {
			$('#page-wrap').css('margin-bottom','-30px');
			$('#footer').css('position','relative');
		}
	}

	//FIX ISSUE WITH YOUTUBE EMBED FLOATING ON TOP OF ALL CONTENT IN IE
	$('iframe').each(function(){
        var url = $(this).attr("src");
        $(this).attr("src",url+"?wmode=transparent");
    });
	
	//STORE USER ID into a COOKIE
	var params = getUrlParam(document.URL);
	if(params !== null && params.uclaid !==null) {
		setCookie('userid',params.uclaid,1000);
		console.log(params.uclaid);
	}
	
});


