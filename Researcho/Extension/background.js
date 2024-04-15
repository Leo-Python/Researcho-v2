function handleStorageChange(changes, namespace) {
  for (let key in changes) {
      console.log(key)
      if (key === "Name") {
          let newValue = changes[key].newValue;
          console.log("New value for 'Name':", newValue);
          
            chrome.contextMenus.removeAll(function() {

              chrome.storage.sync.get("Name", function(result) {
                const data = result.Name;
                // Now you can use the retrieved data
                console.log(data);
            
                chrome.contextMenus.create({
                  id: "1",
                  title: "Add to " + data,
                  contexts: ["page"],
                });
                });
            });
          
          

      }
  }
}

chrome.storage.onChanged.addListener(handleStorageChange);


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  
  chrome.storage.sync.get("Name", function(result) {
    const data = result.Name;
    // Now you can use the retrieved data
    chrome.sidePanel.setOptions({path: 'sidepanel.html', enabled: true });
    chrome.sidePanel.open({ tabId: tab.id });



});

  
});

