var links = [].slice.apply(document.getElementsByTagName('audio'));
links = links.map(function(element) {
  // Return an anchor's href attribute, stripping any URL fragment (hash '#').
  // If the html specifies a relative path, chrome converts it to an absolute
  // URL.
  var href = element.src;
  var hashIndex = href.indexOf('#');
  if (hashIndex >= 0) {
    href = href.substr(0, hashIndex);
  }
  return href;
});

links.sort();

chrome.extension.sendRequest(links);
