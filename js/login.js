function login(){
	let form = document.querySelector("#form_main");
	let id = document.querySelector("#floatingInput");
	let password = document.querySelector("#floatingPassword");
	let check = document.querySelector("#idSaveCheck");

	form.action = "../Index_login.html";
	form.method = "get";
	
	if(check.checked == true){
		alert("쿠키를 저장합니다.");
		setCookie("id", id.value, 1);
		alert("쿠키 값:" + id.value);
	}
	else{
		setCookie("id", id.value, 0);
	}

	if(id.value.length === 0 || password.value.length === 0){
	alert("아이디와 비밀번호를 모두 입력해주세요.");
	}
	else{
		session_set();
		form.submit();
	}
}

function setCookie(name, value, expiredays){
	var date = new Date();
	date.setDate(date.getDate() + expiredays);
	document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "SameSite = None; Secure";
}

function getCookie(name){
	var cookie = document.cookie;
	console.log("쿠키를 요청합니다.");
	if(cookie != " "){
		var cookie_array = cookie.split("; ");
		for (var index in cookie_array){
			var cookie_name = cookie_array[index].split("=");
			
			if(cookie_name[0] == "id"){
				return cookie_name[1];
			}
		}
	}
	return;
}

function logout(){
	session_del();
	location.href = '../index.html';
}

function get_id(){
	if(true){
		decrypt_text();
	}
	else{
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
}

function deleteCookie(cookieName){
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function init(){
	let id = document.querySelector("#floatingInput");
	let check = document.querySelector("#idSaveCheck");
	let get_id = getCookie("id");
	
	if(get_id){
		id.value = get_id;
		check.checked = true;
	}
	session_check();
}

function session_set(){
	let id = document.querySelector("#floatingInput");
	let password = document.querySelector("#floatingPassword");
	if (sessionStorage){
		let en_text = encrypt_text(password.value);
		sessionStorage.setItem("Session_Storage_test", en_text);
	}
	else{
		alert("로컬 스토리지 지원 X");
	}
}

function session_get(){
	if (sessionStorage){
		return sessionStorage.getItem("Session_Storage_test");
	}
	else{
		alert("세션 스토리지 지원 X");
	}
}

function session_check(){
	if(sessionStorage.getItem("Session_Storage_test")){
		alert("이미 로그인 되었습니다.");
		location.herf = 'index_login.html';
	}
}

function session_del(){
	if (sessionStorage){
		sessionStorage.removeItem("Session_Storage_test");
		alert('로그아웃 버튼 클릭 확인 : 세선 스토리지를 삭제합니다.');
	}
	else{
		alert("세션 스토리지 지원 X");
	}
}

function encodeByAES256(key, data){
	const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
		iv: CryptoJS.enc.Utf8.parse(""),
		padding : CryptoJS.pad.Pkcs7,
		mode : CryptoJS.mode.CBC
	});
	return cipher.toString();
}

function decodeByAES256(key, data){
	const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
		iv: CryptoJS.enc.Utf8.parse(""),
		padding : CryptoJS.pad.Pkcs7,
		mode : CryptoJS.mode.CBC
	});
	return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password){
	const k = "key";
	const rk = k.padEnd(32, " ");
	const b = password;
	const eb = this.encodeByAES256(rk, b);
	return eb;
	console.log(eb);
}

function decrypt_text(){
	const k = "key";
	const rk = k.padEnd(32, " ");
	const eb = session_get();
	const b = this.decodeByAES256(rk, eb);
	console.log(b);
}