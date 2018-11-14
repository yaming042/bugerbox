(function(){
	function init(){
		chrome.storage.sync.get(function(data){

		});


		chrome.runtime.onMessage.addListener(function(request, send, response){
			var event = request.event;
			switch(event){
				case 'toSignUp':
					var data = request.data;
					// 调用接口判断是否是 管理员，根据用户类型显示不同的页面

					ajax({
						url: 'http://47.94.97.168:8082/login',
						type: 'GET',
						data: request.data,
						dataType: 'json',
						success: function (res){
							console.log(res);
							if(res.code == 200){
								response({code: 200, data: res.data || '', msg: 'success'});
							}else{
								response({code: 400, data: '', msg: res.msg});
							}
						},
						error: function (e){
							console.log('获取用户类型失败，请稍后重试');
						}
					});
					
					// 如果sendMessage需要是异步的，就加上return true，否则就是同步通信，会返回undefined
					return true;

					break;
				case 'toSignIn':
					var data = request.data;
					// 调用接口判断是否是 管理员，根据用户类型显示不同的页面
					
					ajax({
						url: 'http://47.94.97.168:8082/reg',
						type: 'post',
						data: data,
						dataType: 'json',
						success: function (res){
							console.log(res);
							if(res.code == 200){
								chrome.tabs.query(
									{
										active: true,
										currentWindow: true,
										windowType: 'normal'
									},
									function(tabs){
										if(tabs.length > 0){
											window.open(chrome.runtime.getURL('views/index.html'));
										}
									}
								);
								response({code: 200,data:'', msg:'success'});
							}
						},
						error: function (e){
							console.log('用户注册失败，请稍后重试~');
						}
					});
					
					
					break;

				default:
					break;
			}
		});
	}

	// 模仿jQuery的ajax
	function ajax(){ 
		var ajaxData = {
			type:arguments[0].type || "GET", 
			url:arguments[0].url || "", 
			async:arguments[0].async || "true", 
			data:arguments[0].data || null, 
		    dataType:arguments[0].dataType || "text", 
		    contentType:arguments[0].contentType || "application/x-www-form-urlencoded", 
		    beforeSend:arguments[0].beforeSend || function(){}, 
		    success:arguments[0].success || function(){}, 
		    error:arguments[0].error || function(){} 
		} 

		ajaxData.beforeSend() 
		var xhr = createxmlHttpRequest();  
		xhr.responseType=ajaxData.dataType; 
		xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);  
		xhr.setRequestHeader("Content-Type",ajaxData.contentType);  
		xhr.send(convertData(ajaxData.data));  
		xhr.onreadystatechange = function() {  
			if (xhr.readyState == 4) {  
				if(xhr.status == 200){ 
					ajaxData.success(xhr.response) 
				}else{ 
					ajaxData.error() 
				}  
		    } 
		}  
	} 
	function createxmlHttpRequest() {  
		if (window.ActiveXObject) {  
			return new ActiveXObject("Microsoft.XMLHTTP");  
		} else if (window.XMLHttpRequest) {  
			return new XMLHttpRequest();  
		}  
	} 
	function convertData(data){ 
		if( typeof data === 'object' ){ 
			var convertResult = "" ;  
			for(var c in data){  
				convertResult+= c + "=" + data[c] + "&";  
			}  
		    convertResult=convertResult.substring(0,convertResult.length-1) 
		    return convertResult; 
		}else{ 
		    return data; 
		} 
	}

	init();
})();