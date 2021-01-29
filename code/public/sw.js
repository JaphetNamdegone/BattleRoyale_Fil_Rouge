const FILE_CACHE_NAME = "files";
const FILE_CACHE_VERSION = "3";
const FILE_CACHE_HANDLE = `${FILE_CACHE_NAME}-${FILE_CACHE_VERSION}`;
const appShell = [
    '/',
    '/index.html',
    '/icons/maskable_icon_x1.png',
    '../src/index.js',
    '../src/index.css',
    '../src/App.js',
    '../src/App.scss',
    //pages
    '../src/pages/Account.js',
    '../src/pages/CreateGames.js',
    '../src/pages/CurrentGames.js',
    '../src/pages/Forgot-password.js',
    '../src/pages/login.js',
    '../src/pages/ModifyPassword.js',
    '../src/pages/Saloon.js',
    '../src/pages/SeachGame.js',
    '../src/pages/Signup.js',

    //scss
    '../src/scss/classic.scss',
    '../src/scss/inputs.scss',
    //components
    '../src/components/Logout.js',
    '../src/components/Menu.js',
    //context
    '../src/context/auth.js',
    '../src/context/PrivateRoute.js',
    //observers
    '../src/observers/CreateGameStore.js',
    '../src/observers/MyGamesStore.js',
    '../src/observers/SaloonStore.js',
    '../src/observers/SearchGameStore.js',
    //maps
    '../src/maps/masse.jpg',
    '../src/maps/Map1.js',
    //models
    '../src/models/Game.js',
];
const cacheFiles = async() => {
    const fileCache = await caches.open(FILE_CACHE_HANDLE);
    await fileCache.addAll(appShell);
};
/*
const getResponse = async(req) => {
    const response = await caches.match(req);
    if (response) {
        return response;
    } else {
        return fetch(req);
    }
}*/
const clearUnusedCaches = async() => {
    const keys = await caches.keys();
    const promises = [];
    const cachesInUse = [FILE_CACHE_HANDLE];
    for (const key of keys) {
        if (!cachesInUse.includes(key)) {
            promises.push(caches.delete(key));
        }
    }
    await Promise.all(promises);
};


self.addEventListener("install", (event) => {
    event.waitUntil(cacheFiles())
});

self.addEventListener("activate", (event) => {
    event.waitUntil(clearUnusedCaches());
})

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        return response || fetch(event.request).catch(error => caches.match("OFFLINE_PAGE_URL"));
    }));

});

self.addEventListener('push', function(e) {
    var options = {
        body: 'It\'s your turn !',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
    };
    e.waitUntil(
        self.registration.showNotification('Battle-royal', options)
    );
});