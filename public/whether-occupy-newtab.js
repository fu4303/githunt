// if user prefer let HitUP not occupy New Tab
(function(store) {
  if (document.location.search.indexOf('as-ntp') < 0) {
    return
  } // else must running as extension
  chrome.storage.sync.get('persist:hitup:root', (p) => {
    try {
      let parsed = JSON.parse(p['persist:hitup:root']);
      let preference = JSON.parse(parsed['preference']);
      if (!preference.whether_occupy_newtab) {
        window.chrome.tabs.update({ url: "chrome-search://local-ntp/local-ntp.html" })
      }
    } catch (error) {
      console.log('ignored error:', error);
    }
  })
})()
