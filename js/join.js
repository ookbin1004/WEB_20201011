class SignUp {
	constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthdayDate = birthdayDate;
		this. gender = gender;
		this.emailAddress = emailAddress;
		this.phoneNumber = phoneNumber;
		this.classNumber = classNumber;
		this.random = random;
	}
	
	get fullName(){
		return `${this.firstName} ${this.lastName}`;
	}
	
	set fullName(fullName){
		const [firstName, lastName] = fullName.split(" ");
		this.firstName = firstName;
		this.lastName = lastName;
	}
	
	get contactInfo(){
		return `${this.emailAddress} ${this.phoneNumber} ${this.random}`;
	}
	
	set contactInfo(contactInfo){
		const [emailAddress, phoneNumber, random] = contactInfo.split(" ");
		this.emailAddress = emailAddress;
		this.phoneNumber = phoneNumber;
		this.random = random;
	}
}


function join(){
	let form = document.querySelector("#form_main");
	let f_name = document.querySelector("#firstName");
	let l_name = document.querySelector("#lastName");
	let b_day = document.querySelector("#birthdayDate");
	let gender = document.querySelector("#inlineRadioOptions");
	let email = document.querySelector("#emailAddress");
	let p_number = document.querySelector("#phoneNumber");
	let class_check = document.querySelector(".select form-control-lg");
	
	form.action = "../index_join.html";
	form.method = "get";
	if(f_name.value.length === 0 || l_name.value.length === 0 || b_day.value.length === 0 || email.value.length === 0 || p_number.value.length === 0){
		alert("회원가입 폼에 모든 정보를 입력해주세요.(성병, 분반 제외)");
	}
	else{
		session_join_set();
		form.submit();
	}
}