'use strict'
function json2url(json){
	json.t = Math.random();
	var arr = [];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));
	}
	return arr.join('&');
}
function ajax(json){
	json = json||{};
	if(!json.url)return;
	json.type = json.type||'get';
	json.data = json.data||{};
	//创建对象
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.xmlHttp');
	}
	//打开连接   发送 
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('get',json.url+'?'+json2url(json.data),true);
			oAjax.send();
		break;
		case 'post':
			oAjax.open('post',json.url,true);
			oAjax.setRequestHeader('content-type','application/x-www-from-urlencode')
			oAjax.send(json2url(json.data));
		break;
	}
	//接收
	oAjax.onreadystatechange = function(){
		if(oAjax.readystate==4){
			if(oAjax.status>=200&&oAjax.status<=300||oAjax.status==304){
				json.success&&json.success(oAjax.responseText);
			}else{
				json.error&&json.error(oAjax.status);s
			}
		}
	};
	
}