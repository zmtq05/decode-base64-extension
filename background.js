const id = "decodeBase64";
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id,
    title: "Decode Base64 and open in new tab",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === id) {
    let result = "";
    try {
      result = decode2href(info.selectionText);
    } catch (e) {
      if (e.name === "InvalidCharacterError") {
        result = decode2href(info.selectionText.slice(0, -1));
      }
    } finally {
      chrome.tabs.create({ url: result });
    }
  }
});

function decode2href(target, depth = 5) {
  let result = "";
  for (let i = 0; i < depth; i++) {
    result = atob(target);
    if (result.startsWith("http")) {
      break;
    }
    target = result;
  }
  return result;
}
