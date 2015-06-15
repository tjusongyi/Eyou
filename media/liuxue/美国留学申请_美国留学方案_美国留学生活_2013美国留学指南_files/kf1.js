sem();
//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

		function sem() {
		
			
			var aElements = document.getElementsByTagName('a');

			for (var index in aElements) {
				var element = aElements[index];

				//if (!element.href || element.href.indexOf('#')>=0 || element.href.indexOf('void(0)')>=0) continue;
				if (!element.href ||  element.href.indexOf('void(0)')>=0) continue;
				element.onclick = function () {
					var b_dkey=getQueryStringByName('b_d_k_');
					//alert(b_dkey);
					if(b_dkey != '')
					{
						var b_dtgdy=getQueryStringByName('b_d_t_dy');//推广单元
						var b_dtgzh=getQueryStringByName('b_d_t_z');//账号
						var b_d_url="b_d_k_="+b_dkey+"&b_d_t_dy="+b_dtgdy+"&b_d_t_z="+b_dtgzh;
						var url = this.href;
						if (this.href.indexOf('&b_d_t_dy')==-1)
						{
							var qIndex = this.href.indexOf('?');
							if (qIndex > -1)//有参数
							{
								this.href=this.href+"&"+b_d_url;
							}
							else//无参数
							{
								this.href=this.href+"?"+b_d_url;
							}
						}

					}
					return true;
				};
			}
			aElements = document.getElementsByTagName('area');
			for (var index in aElements) {
				var element = aElements[index];

				if (!element.href || element.href.indexOf('#')>=0 || element.href.indexOf('void(0)')>=0) continue;

				element.onclick = function () {
					var b_dkey=getQueryStringByName('b_d_k_');
					//alert(b_dkey);
					if(b_dkey != '')
					{
						var b_dtgdy=getQueryStringByName('b_d_t_dy');//推广单元
						var b_dtgzh=getQueryStringByName('b_d_t_z');//账号
						var b_d_url="b_d_k_="+b_dkey+"&b_d_t_dy="+b_dtgdy+"&b_d_t_z="+b_dtgzh;
						var url = this.href;
						if (this.href.indexOf('&b_d_t_dy')==-1)
						{
							var qIndex = this.href.indexOf('?');
							if (qIndex > -1)//有参数
							{
								this.href=this.href+"&"+b_d_url;
							}
							else//无参数
							{
								this.href=this.href+"?"+b_d_url;
							}
						}

					}
					return true;
				};
			}
		}