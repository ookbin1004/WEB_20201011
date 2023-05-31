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

function session_join_set(){
	let f_name = document.querySelector("#firstNam").value;
	let l_name = document.querySelector("#lastName").value;
	let b_day = document.querySelector("#birthdayDate").value;
	let gender = document.querySelector("#inlineRadioOptions");
	let email = document.querySelector("#emailAddeess").value;
	let p_number = document.querySelector("#phoneNumber").value;
	let class_check = document.querySelector(".select form-control-lg");
	let random = new Date();
	
	const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
	console.log(newSignUp.fullName);
	console.log(newSignUp.contactInfo);
	
	if (sessionStorage){
		const objString = JSON.stringify(newSignUp);
		let en_text = encrypt_text(objString);
		sessionStorage.setItem("Session_Storage_object", objString);
		sessionStorage.setItem("Session_Storage_encrypted", en_text);
	}
	else{
		alert("세션 스토리지 지원 X");
	}
}