
function session_set(){
	let id = document.querySelector('#floatingInput');
	let password = document.querySelector('#floatingPassword');
	let random = new Date();
	
	const obj = {
		id : id.value,
		otp : random
	}
	
	if (sessionStorage){
		const objString = JSON.stringify(obj);
		let en_text = encrypt_text(objString);
		sessionStorage.setItem("Session_Storage_Object", objString);
		sessionStorage.setItem("Session_Storage_encrypted", en_text);
	}
	else{
		alert("세션 스토리지 지원 X");
	}
}

function decrypt_text(text) {
  const k = "key";
  const rk = k.padEnd(32, " ");
  const eb = sessionStorage.getItem("Session_Storage_test");
  const b = decodeByAES256(rk, eb);
  console.log(b);
  return b;
}

function session_join_set(){
	let f_name = document.querySelector("#firstName").value;
	let l_name = document.querySelector("#lastName").value;
	let b_day = document.querySelector("#birthdayDate").value;
	let gender = document.querySelector("#inlineRadioOptions");
	let email = document.querySelector("#emailAddress").value;
	let p_number = document.querySelector("#phoneNumber").value;
	let class_check = document.querySelector(".select form-control-lg");
	let random = new Date();
	
	const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
	console.log(newSignUp.fullName);
	console.log(newSignUp.contactInfo);
	
	if (sessionStorage){
		const objString = JSON.stringify(newSignUp);
  		sessionStorage.setItem("Session_Storage_object", objString);
 		sessionStorage.setItem("Session_Storage_encrypted", objString);
	}
	else{
		alert("세션 스토리지 지원 X");
	}
}

function session_join_get() {
	if (sessionStorage){
		let objString = sessionStorage.getItem("Session_Storage_object");
		if (objString){
			let obj = JSON.parse(objString);
			console.log(obj);
		}
		else{
			console.log("세션 데이터가 존재하지 않습니다.");
		}
	}
	else{
		alert("세션 스토리지 지원 X");
	}
}