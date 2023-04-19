document.getElementById("search_btn").addEventListener('click', search_message);

var search_array = []; //빈 배열 - 전역 변수

function search_message()
	{
		let search_str = document.querySelector("#search_txt"); // 변수에 저장
		if(search_str.value.length === 0){
			alert("검색어가 비어있습니다. 입력해주세요.");
		}
		else{
			alert("검색을 수행합니다."); 
			search_array.push(search_str.value); // 배열에 검색어 추가
			let text = document.getElementById("search_message").innerHTML = search_array.toString();
			document.querySelector("#form_main").submit();	
		}
		/*let search_str = document.querySelector("#search_txt");
   		document.getElementById("search_message").innerHTML = search_str.value; // 태그에 값 추가
  		console.log(search_str.value); // 콘솔에 출력*/
	}