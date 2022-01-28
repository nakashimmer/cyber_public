var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

setInterval(anime, 50);

function anime() {
	c.clearRect(0, 0, 310, 310);

	shadow("black", 0, 0);
	//文字盤の分
	for (var s = 0; s <= 60; s++) {
		c.beginPath();
		move(s / 60, 143);
		c.lineTo(155 + sin(s / 60) * 130, 155 - cos(s / 60) * 130);
		c.closePath();
		stroke('#444', "2");
	}

	//文字盤の時
	for (var h = 0; h <= 12; h++) {
		c.beginPath();
		move(h / 12, 145);
		c.lineTo(155 + sin(h / 12) * 115, 155 - cos(h / 12) * 115);
		c.closePath();
		stroke('#444', "12");
	}

	//時間を取得
	var today = new Date();
	var hour = today.getHours();
	var min = today.getMinutes();
	var sec = today.getSeconds() + today.getMilliseconds() / 1000;
	if (0 <= sec && sec < 0.5) { min -= 1; }
	if (0 <= sec && sec < 1) { sec = 0; }


	shadow("#333", 2, 4);

	//時針
	c.beginPath();
	move((hour + min / 60) / 12, 83);
	line((hour + min / 60) / 12, 30);
	c.closePath();
	stroke('#333', "10");

	//分針
	c.beginPath();
	move(min / 60, 130);
	line(min / 60, 30);
	c.closePath();
	stroke('#333', "10");

	//秒針
	c.beginPath();
	move(sec / 60, 100);
	line(sec / 60, 30);
	c.closePath();
	stroke('#c00', "5");

	//秒針の赤い丸
	//c.beginPath();
	c.arc(155 + sin(sec / 60) * 100, 155 - cos(sec / 60) * 100, 13, 0, 2 * pi, false);
	c.closePath();
	fill('#c00');

	//秒針の根本
	shadow("white", 0, 0);
	c.beginPath();
	c.arc(155, 155, 5, 0, 2 * pi, false);
	fill('#aaa');
	stroke('#c00', '3');


}

//独自変数
var pi = Math.PI;

//独自関数
function move(a, r) {
	c.moveTo(155 + sin(a) * r, 155 - cos(a) * r);
}
function line(a, r) {
	c.lineTo(155 - sin(a) * r, 155 + cos(a) * r);
}
function sin(a) { return Math.sin(a * 2 * pi); }
function cos(a) { return Math.cos(a * 2 * pi); }
function stroke(color, width) {
	c.strokeStyle = color;
	c.lineWidth = width;
	c.stroke();
}
function fill(color) {
	c.fillStyle = color;
	c.fill();
}
function shadow(color, offset, blur) {
	c.shadowColor = color;
	c.shadowOffsetX = offset;
	c.shadowOffsetY = offset;
	c.shadowBlur = blur;
}