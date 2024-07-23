const cacheName = "bmi4";
const urlsToCache = [
	"./apple-touch-icon.png",
	"./html5-192.png",
	"./html5-256.png",
	"./index.html",
	"./script.js",
	"./"
];

//①インストール時にキャッシュ追加
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(cacheName)
			.then((cache) => {
				console.log("Opened cache");
				//キャッシュに追加
				return cache.addAll(
					urlsToCache.map(
						url => new Request(
							url, { credentials: "same-origin" }
						)
					)
				);
			}
			)
	);
});

//②古いキャッシュの削除
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then(
			function (cache) {
				cache.map(function (name) {
					if(cacheName !== name) {
						return caches.delete(name);
					}
				})
			}
		)
	);
});

//③キャッシュされていれば利用する
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request)
			.then(function (response) {
				if (response) {
					return response;
				}
				return fetch(event.request);
			}
		)
	);
});
