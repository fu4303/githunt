(function() {
  console.log('HitUP background.js enabled.');
  chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('Icon clicked.');
    chrome.tabs.create({url: 'index.html'})
  })
})()
