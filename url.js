console.log("hereeeee")
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    var tabURL = tabs[0].url;
		console..log("here");
    console.log(tabURL);
		console.log("here1");
});
