chrome.webRequest.onErrorOccurred.addListener(
  function(details) {
    if (details.type === "main_frame") {
      chrome.tabs.update(details.tabId, {url: chrome.runtime.getURL("index.html")});
    }
  },
  {urls: ["<all_urls>"]}
);