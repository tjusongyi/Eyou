		var t_s_images = new Array();
		t_s_images[0] = "http://www.xinquanedu.com/QQkefu/tcimages/001.jpg";	
		t_s_images[1] = "http://www.xinquanedu.com/QQkefu/tcimages//002.jpg";
		t_s_images[2] = "http://www.xinquanedu.com/QQkefu/tcimages//003.jpg";

		var t_s_i_timeout;
		var t_s_i_timeout2;
        var t_s_i_count = 0; 

        $(function() {
			$("#m_img_to_img_id").attr("src",t_s_images[t_s_i_count]);
            t_s_i_timeout = setTimeout(BtnimgsCount1, 5000);
        });
		BtnimgsCount1 = function() {
		//第一次点击
                $("#m_img_to_id").show();
                clearTimeout(t_s_i_timeout); 
        };
		Btnimgshideclick = function() {
		//第一次点击
			$("#m_img_to_id").hide();
			if(t_s_i_count==0){
				//第2次弹窗          
				t_s_i_timeout2 = setInterval(BtnimgsCount, 30000); 
			}
			if(t_s_i_count<t_s_images.length)
			{
				t_s_i_count++;
				$("#m_img_to_img_id").attr("src",t_s_images[t_s_i_count]);
				if(t_s_i_count>=t_s_images.length)
				{
					clearInterval(t_s_i_timeout2);
				}
			}

        };
		Btnimgsurlclick = function() {
//			var iWidth;                       
//	 
//			//弹出窗口的高度，自定义
//			var iHeight;                        
//			iWidth=800;
//			iHeight=600;
//			var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
//			var iLeft = (window.screen.availWidth-10-iWidth)/2;           //获得窗口的水平位置;
//			window.open('http://chat.looyu.com/chat/chat/p.do?c=38611&f=98160&g=64326','','height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');    //获得窗口的水平位置;
			doyoo.util.openChat('g=64326');
        };	
		
		BtnimgsCount = function() {
               // 第二次以后点击
			if($("#m_img_to_id").hasClass('showFlag'))
			{
				
			}
			else {
				
				$("#m_img_to_id").show();
			
			}
		
        };
		
document.writeln("<div class='adBG' id='m_img_to_id' style='display:none'>");
document.writeln("<img src='' id='m_img_to_img_id' usemap='#Map123132'>");
document.writeln("<map name='Map123132'>");
document.writeln("<area shape='rect' coords='29,191,155,234' href='javascript:Btnimgsurlclick();'>");
//document.writeln("<area shape='rect' coords='29,191,155,234' onclick='javascript:Btnimgsurlclick();return false;'>");
//document.writeln("<area shape=\'rect\' coords=\'29,191,155,234\' onclick=\"doyoo.util.openChat(\'g=64326\');return false;\" />");
document.writeln("<area shape='rect' coords='170,192,296,233' href='javascript:Btnimgshideclick();'>");
document.writeln("</map>");
document.writeln("</div>");
