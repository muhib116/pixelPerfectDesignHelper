// get data from content
chrome.runtime.onMessage.addListener((request) => 
{
    if(request.type == "layoutData")
    {
        // Get the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs)
        {
            if (tabs && tabs.length > 0) {
                var currentTab = tabs[0]

                // Send a message to the content script
                chrome.tabs.sendMessage(currentTab.id, request, function(response) {
                    // Handle the response from the content script if needed
                })
            }
        })

        chrome.runtime.sendMessage(request)
    }

    if(request.type == "updatedActiveLayoutData"){
        chrome.runtime.sendMessage(request)
    }
})
