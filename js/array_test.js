let empty1 = [ ]; // 빈 배열
let empty2 = [,,,]; // 쉼표 개수 = 크기
let all = [1, 'test', 3.14]; // 다른 데이터 타입 사용 가능 
let coffee = ["americano", "latte"]; // 이름, 괄호
const cars = ["Saab", "Volvo", "BMW"]; // 상수 배열
cars[0] = "Jaab"; // 0번 인덱스 값 수정
//const cars = new Array("Saab", "Volvo", "BMW");
let car = cars[2]; // 변수에 배열 값 초기화
cars[1] = Date.now(); // 값에 객체 삽입 가능

//document.getElementById("arrayID").innerHTML = cars;

console.log(cars); // 배열 출력
console.log(typeof cars); // 배열 타입 : 객체