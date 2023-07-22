function translateText(txt,fromlang,tolang) {
	let apiKey = "";

	let text = txt
	let fromLang = fromlang;
	let toLang = tolang;

	// 翻訳
	const URL = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey +
		"&q=" + encodeURI(text) + "&source=" + fromLang + "&target=" + toLang
	let xhr = new XMLHttpRequest()
	xhr.open('POST', [URL], false)
	xhr.send();
	if (xhr.status === 200) {
		const res = JSON.parse(xhr.responseText);
		return res["data"]["translations"][0]["translatedText"];
	}
}
