document.getElementById("search_btn").addEventListener('click', search_message);

var search_array = []; //빈 배열 - 전역 변수
const filter_words = ["바보", "멍청이", "말미잘"];
const Max_search_count = 10;

function search_message()
	{
		let search_str = document.querySelector("#search_txt"); // 변수에 저장
		if(search_str.value.length === 0){
			alert("검색어가 비어있습니다. 입력해주세요.");
		}
		else if(filter_words.includes(search_str.value)){
			let filtered_words = filter_words.find((word) => search_str.value.includes(word));
			alert(`${filtered_words}는 적절하지 않습니다.`);
		}
		else if(search_array.length >= Max_search_count){
			alert("검색을 수행합니다.");
			search_array.shift();
			search_array.push(search_str.value); // 배열에 검색어 추가
			let text = document.getElementById("search_message").innerHTML = search_array.toString();
			document.querySelector("#form_main").submit();
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