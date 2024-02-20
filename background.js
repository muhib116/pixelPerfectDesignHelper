chrome.action.onClicked.addListener((tab) => {
    // write a function to send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "clicked"})
    })
  })

  