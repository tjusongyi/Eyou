//Universal Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

// Set account and track pageviews
ga('create', 'UA-423028-6', 'auto');
ga('create', 'UA-35157935-1', 'auto', {'name': 'globalTracker'});

ga('send', 'pageview');
ga('globalTracker.send', 'pageview');






// Event tracking calls
// jQuery required for DOM selection
$(function() {

	
	// Default link tracking
	$('a[href]').each(function() {				
		
		var currPageTitle = document.title; // Page title
		var currPagePath = window.location.pathname; // URL path
		var linkURL = $(this).attr('href'); // Hyperlink URL
		var linkText = $(this).text(); // Hyperlink text

		// Outbound link
		if ( linkURL.match(/^https?\:/i) && (!linkURL.match(document.domain)) ) {
			$(this).click(function() {
				var outboundURL = linkURL.replace(/^https?\:\/\//i, ''); // Outbound URL without http(s)
				ga('send', 'event', currPageTitle + ' - (' + currPagePath + ')', 'Click', linkText + ' (' + outboundURL + ')');
			});
		}
		// Email link
		if ( linkURL.match(/^mailto\:/i) ) {
			$(this).click(function() {
				var emailAddress = linkURL.replace(/^mailto\:/i, ''); // Email link without mailto:
				ga('send', 'event', currPageTitle + ' - (' + currPagePath + ')', 'Click - email', linkText + ' (' + emailAddress + ')');
			});
		}
		// Download link
		if ( linkURL.match(/\.(zip|pdf|doc*|xls*|ppt*|mp3)$/i) ) {
			$(this).click(function() {
				var docExtension = linkURL.slice(linkURL.lastIndexOf(".") +1);
				var docPath = linkURL.replace(/^https?\:\/\/(www.)ucla\.edu\//i, ''); // Document file path
				ga('send', 'event', currPageTitle + ' - (' + currPagePath + ')', 'Click - ' + docExtension, linkText + ' (' + docPath + ')');
			});
		}
	
	});
	
	
});





//Parses the Url Query strings and returns an array 
var cid = cid || false;
var getUrlParam = function(url) {
	
	var tmp;
	var tmp_u   = url.split('?');
	
	if(typeof tmp_u[1] === 'undefined') return null;
	
	var tmp_p   = tmp_u[1].split('&');
	var param   = {};
	
	for(var i=0; i<tmp_p.length; i++) {
		
		tmp = tmp_p[i].split('=');
		param[tmp[0]] = tmp[1];
	}
	
	return param;
}

//send ga user id
var sendID = function(id) {
	
	custom_dimension['dimension1'] = id;
	ga('set', 'dimension1', String(id) );
	ga('send', 'event', 'User ID', id);
}

//grab the parameters from the url query string
var params = getUrlParam(document.URL);
	
//if there is an id present in the query string
var custom_dimension = {};
if( params !== null && params.uclaid !== null ) {
	
	sendID(params.uclaid);
} else if ( cid && cid !== '' ) {
	
	sendID(cid);
}


