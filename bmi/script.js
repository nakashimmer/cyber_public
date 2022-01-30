const height = document.getElementById("height");
const weight = document.getElementById("weight");
const btn1 = document.getElementById("btn1");

btn1.addEventListener("click", function(){
	//入力値を数字に変換
	let h = Number(height.value);
	let w = Number(weight.value);


	//計算
	let bmi = w / (h / 100 * h / 100);

	bmi = Math.round(bmi * 10) / 10;
	
	//メッセージ
	let msg;
	if (bmi < 18.5) { msg = "低体重かも"; }
	else if (25 < bmi) { msg = "重いかも"; }
	else { msg = "ちょうどいいかも"; }
	
	//表示
	btn1.innerHTML = "あなたの<br>BMIは" + bmi + "。<br>" + msg;
});