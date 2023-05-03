function login(){
	let form = document.querySelector("#form_main");
	let id = document.querySelector("#floatingInput");
	let password = document.querySelector("#floatingPassword");

	form.action = "../Index_login.html";
	form.method = "get";

	if(id.value.length === 0 || password.value.length === 0){
	alert("아이디와 비밀번호를 모두 입력해주세요.");
	}
	else{
		form.submit();
	}
}

function logout(){
	location.href = '../index.html';
}

function get_id(){
	var getParameters = function(paramName){
		var returnValue;
		var url = location.href;
		var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
		for (var i = 0; i < parameters.length; i++){
			var varName = parameters[i].split('=')[0];
			if(varName.toUpperCase() == paramName.toUpperCase()){
				returnValue = parameters[i].split('=')[1];
				return decodeURIComponent(returnValue);
			}
		}
	}
	alert(getParameters('id') + '님 반갑습니다.');
}