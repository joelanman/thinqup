self.addEventListener('install', event => {

  function onInstall () {
    return caches.open('static')
      .then(cache => cache.addAll([
        '/javascripts/pleasure-achievement.js',
        '/stylesheets/style.css',
        '/'
      ])
    );
  }

  event.waitUntil(onInstall(event));
	console.log('installing');
});

self.addEventListener('activate', event => {
  // Do activate stuff: This will come later on.
});
