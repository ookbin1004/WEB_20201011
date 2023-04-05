// 한줄 주석
var jb = 'hi'; //변수 뒤 주석 가능
/*
여러줄 주석
*/

var a =1;
var b;
b = 5;

if(true){
	let c = 'let 접근';
	var c_1 = 'var 접근';
}
//console.log(c); //Error?
console.log(c_1);

let d = 5;
//let d = '값 재할당'; //Error?
console.log(d);

const e = '상수1 접근';
//e = 5;
//const f // Error?
console.log(e);