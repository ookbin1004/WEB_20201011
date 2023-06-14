function addjavascript(jsname) {
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', jsname);
	th.appendChild(s);
}
//addjavascript('js/security.js');
addjavascript('js/session.js');
//addjavascript('js/cookie.js');

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

/*function getCookie(name){
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
}*/

function getCookie(name) {
  var cookie = document.cookie;
  if (cookie !== "") {
    var cookieArray = cookie.split("; ");
    for (var i = 0; i < cookieArray.length; i++) {
      var cookieName = cookieArray[i].split("=")[0];
      if (cookieName === name) {
        return cookieArray[i].split("=")[1];
      }
    }
  }
  return "";
}

function login_count() {
  var count = parseInt(getCookie("login_cnt")) || 0;
    count++;
    setCookie("login_cnt", count.toString(), 1);
}

function logout_count() {
  var count = parseInt(getCookie("logout_cnt")) || 0;
  count++;
  setCookie("logout_cnt", count.toString(), 1);
}

function logout(){
	session_del();
	logout_count();
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

function session_check(){
	if (sessionStorage.getItem("loginTime")) {
    let now = new Date();
    let expirationTime = parseInt(sessionStorage.getItem("loginTime"));

    if (now.getTime() >= expirationTime) {
      session_del();
      location.href = "../index.html";
    } else {
      let remainingTime = Math.ceil((expirationTime - now.getTime()) / 1000 / 60); // 분 단위로 변환
      alert("이미 로그인되었습니다. 세션 유지 시간: " + remainingTime + "분");
      setTimeout(function() {
        session_del();
        location.href = "../index.html";
      }, 5 * 60 * 1000); // 5분 후에 자동 로그아웃
    }
  }
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
  if (sessionStorage) {
    let en_text = encrypt_text(password.value);
    var expirationTime = new Date().getTime() + 5 * 60 * 1000; // 현재 시간에서 5분 뒤의 시간 설정
    sessionStorage.setItem("Session_Storage_test", en_text);
    sessionStorage.setItem("loginTime", expirationTime);
    sessionStorage.setItem("id", id.value);
  } else {
    alert("로컬 스토리지 지원 X");
  }
}

setInterval(session_check, 5 * 60 * 1000);

function session_get() {
  if (sessionStorage) {
    let now = new Date();
    let expirationTime = parseInt(sessionStorage.getItem("loginTime"));

    if (now.getTime() >= expirationTime) {
      session_del();
      location.href = "../index.html";
    } else {
      let remainingTime = Math.ceil((expirationTime - now.getTime()) / 1000 / 60); // 분 단위로 변환
      alert("이미 로그인되었습니다. 세션 유지 시간: " + remainingTime + "분");
      location.href = "../index_login.html";
    }
  } else {
    alert("세션 스토리지 지원 X");
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

function decodeByAES256(key, data) {
  const rk = key.padEnd(32, " ");
  if (!data) {
    return "";
  }
  const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(rk), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password){
  const k = "key";
  const rk = k.padEnd(32, " ");
  const b = password;
  const eb = encodeByAES256(rk, b);
  console.log(eb); // 이동된 위치로 변경
  return eb;
}

function decrypt_text() {
  const k = "key";
  const rk = k.padEnd(32, " ");
  const eb = sessionStorage.getItem("Session_Storage_test");
  const b = decodeByAES256(rk, eb);
  console.log(b);
  return b;
}
	
function login_check() {
  const id = document.querySelector("#floatingInput");
  const password = document.querySelector("#floatingPassword");
  const check = document.querySelector("#idSaveCheck");
	var count = parseInt(getCookie("login_cnt")) || 0;

  const emailRegex = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;

  if(id.value.length === 0 || password.value.length === 0){
	alert("아이디와 비밀번호를 모두 입력해주세요.");
	return;
  }
  else if (!emailRegex.test(id.value) || !passwordRegex.test(password.value)) {
    alert("아이디와 비밀번호 형식을 확인해주세요.");
    return;
  }
	else if(count >= 3){
		alert("로그인이 제한되었습니다. 관리자에게 문의하세요.");
		location.href = "../index.html";
	}
	else{
	const form = document.querySelector("#form_main");
 	 form.action = "../Index_login.html";
 	 form.method = "get";
	  session_set();
 	 login_count();
 	 form.submit();
	}
}
