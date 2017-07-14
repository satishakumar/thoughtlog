chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "http://thoughtlog.s3-website.ap-south-1.amazonaws.com/#!/";
  chrome.tabs.create({ url: newURL });
});