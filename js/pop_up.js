/*function pop_up(){
	window.open("../pop_up.html","팝업테스트","width=400, height=300, top=10, left=10");
}*/
function pop_up(){
		var cookieCheck = getCookie("popupYN");
	if(cookieCheck != "N"){
		window.open("pop_up.html","팝업테스트","width=400, height=300, top=10, left=10");
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
			
			if(cookie_name[0] == "popupYN"){
				return cookie_name[1];
			}
		}
	}
	return;
}

function closePopup(){
	if (document.getElementById('check_popup').value){
		setCookie("popupYN","N",1);
		console.log("쿠키를 설정합니다.");
		self.close();
	}
}

function showclock(){
	let currentDate = new Date(); //날짜 객체 생성
	let divClock = document.getElementById('divClock');
	let msg = "현재 시간 : ";
	if(currentDate.getHours()>=12){
		// 12시 보다 크면 오후 아니면 오전
		msg += "오후";
		if(currentDate.getHours() == 12){
			msg += currentDate.getHours()+"시";
		}
		else{
			msg += currentDate.getHours()-12+"시";
		}
	}
	else {
		msg += "오전";
		msg += currentDate.getHours()+"시";
	}
	
	msg += currentDate.getMinutes()+"분";
	msg += currentDate.getSeconds()+"초";
	divClock.innerText = msg;
	
	if (currentDate.getMinutes()>58){
		//정각 1분 전 빨강색 출력
		divClock.style.color = "red";
	}
	setTimeout(showclock, 1000); //1초마다 갱신
}