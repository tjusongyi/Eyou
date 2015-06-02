$(function()
{	
    $('html').ajaxSend(function(event, xhr, settings) {  
        function getCookie(name) {  
            var cookieValue = null;  
            if (document.cookie && document.cookie != '') {  
                var cookies = document.cookie.split(';');  
                for (var i = 0; i < cookies.length; i++) {  
                    var cookie = jQuery.trim(cookies[i]);  
                    // Does this cookie string begin with the name we want?  
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {  
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));  
                        break;  
                    }  
                }  
            }  
            return cookieValue;  
        }  
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {  
            // Only send the token to relative URLs i.e. locally.  
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));  
        }  
    });  

    if($.fn.dashboard) $('#dashboard').dashboard();

    if($.fn.droppable)
    {
        $('[data-toggle="droppable"]').droppable(
        {
            start: function()
            {
                $('.droppable-target').removeClass('panel-warning').removeClass('panel-success').find('.panel-heading').text('拖动到这里�?');
            },
            drop: function(event)
            {
                window.messager.show('真棒�?');
                $('.droppable-target').removeClass('panel-success').removeClass('panel-warning');
                if(event.target)
                {
                    event.target.addClass('panel-success').find('.panel-heading').text('成功拖到目的地�?');
                }
            },
            drag: function(event)
            {

                $('.droppable-target').removeClass('panel-success').removeClass('panel-warning');
                if(event.target) event.target.addClass('panel-warning');
            }
        });
    }

    if($.fn.boards) $('.boards').boards();

    // Chosen
    if($.fn.chosen) $('.chosen-select').chosen();
    if($.fn.chosenIcons) $('#chosenIcons').chosenIcons();

    // datetime picker
    if($.fn.datetimepicker)
    {
        $('.form-datetime').datetimepicker(
        {
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1,
            format: 'yyyy-mm-dd hh:ii'
        });
        $('.form-date').datetimepicker(
        {
            language:  'zh-CN',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            format: 'yyyy-mm-dd'
        });
        $('.form-time').datetimepicker({
            language:  'zh-CN',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView: 0,
            maxView: 1,
            forceParse: 0,
            format: 'hh:ii'
        });
    }
    if(window.KindEditor)
    {
        KindEditor.ready(function(K)
        {
          window.editor = K.create('textarea.kindeditor',
          {
            allowFileManager : true,
            bodyClass : 'article-content',
            afterBlur: function(){$('#content').prev('.ke-container').removeClass('focus');},
            afterFocus: function(){$('#content').prev('.ke-container').addClass('focus');}
          });

          K.create('textarea.kindeditorSimple',
          {
            bodyClass : 'article-content',
            resizeType : 1,
            allowPreviewEmoticons : false,
            allowImageUpload : false,
            items : [
            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
            'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
            'insertunorderedlist', '|', 'emoticons', 'image', 'link'],
            afterBlur: function(){$('#contentSimple').prev('.ke-container').removeClass('focus');},
              afterFocus: function(){$('#contentSimple').prev('.ke-container').addClass('focus');}
          });

          K.create('textarea.customStyle',
          {
            themeType : 'simple',
            bodyClass : 'article-content',
            afterBlur: function(){$('#contentCustom').prev('.ke-container').removeClass('focus');},
              afterFocus: function(){$('#contentCustom').prev('.ke-container').addClass('focus');}
          });
        });
    }
});
/**
 * AJAX File Upload
 * http://github.com/davgothic/AjaxFileUpload
 * 
 * Copyright (c) 2010-2013 David Hancock (http://davidhancock.co)
 *
 * Thanks to Steven Barnett for his generous contributions
 *
 * Licensed under the MIT license ( http://www.opensource.org/licenses/MIT )
 */

;(function($) {
	$.fn.AjaxFileUpload = function(options) {
		alert("asd");
		var defaults = {
			action:     "upload.php",
			onChange:   function(filename) {},
			onSubmit:   function(filename) {},
			onComplete: function(filename, response) {}
		},
		settings = $.extend({}, defaults, options),
		randomId = (function() {
			var id = 0;
			return function () {
				return "_AjaxFileUpload" + id++;
			};
		})();
		
		return this.each(function() {
			var $this = $(this);
			if ($this.is("input") && $this.attr("type") === "file") {
				$this.bind("change", onChange);
			}
		});
		
		function onChange(e) {
			var $element = $(e.target),
				id       = $element.attr('id'),
				$clone   = $element.removeAttr('id').clone().attr('id', id).AjaxFileUpload(options),
				filename = $element.val().replace(/.*(\/|\\)/, ""),
				iframe   = createIframe(),
				form     = createForm(iframe);

			// We append a clone since the original input will be destroyed
			$clone.insertBefore($element);

			settings.onChange.call($clone[0], filename);

			iframe.bind("load", {element: $clone, form: form, filename: filename}, onComplete);
			
			form.append($element).bind("submit", {element: $clone, iframe: iframe, filename: filename}, onSubmit).submit();
		}
		
		function onSubmit(e) {
			var data = settings.onSubmit.call(e.data.element, e.data.filename);

			// If false cancel the submission
			if (data === false) {
				// Remove the temporary form and iframe
				$(e.target).remove();
				e.data.iframe.remove();
				return false;
			} else {
				// Else, append additional inputs
				for (var variable in data) {
					$("<input />")
						.attr("type", "hidden")
						.attr("name", variable)
						.val(data[variable])
						.appendTo(e.target);
				}
			}
		}
		
		function onComplete (e) {
			var $iframe  = $(e.target),
				doc      = ($iframe[0].contentWindow || $iframe[0].contentDocument).document,
				response = doc.body.innerHTML;

			if (response) {
				response = $.parseJSON(response);
			} else {
				response = {};
			}

			settings.onComplete.call(e.data.element, e.data.filename, response);
			
			// Remove the temporary form and iframe
			e.data.form.remove();
			$iframe.remove();
		}

		function createIframe() {
			var id = randomId();

			// The iframe must be appended as a string otherwise IE7 will pop up the response in a new window
			// http://stackoverflow.com/a/6222471/268669
			$("body")
				.append('<iframe src="javascript:false;" name="' + id + '" id="' + id + '" style="display: none;"></iframe>');

			return $('#' + id);
		}
		
		function createForm(iframe) {
			return $("<form />")
				.attr({
					method: "post",
					action: settings.action,
					enctype: "multipart/form-data",
					target: iframe[0].name
				})
				.hide()
				.appendTo("body");
		}
	};
})(jQuery);