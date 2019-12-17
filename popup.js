// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This extension demonstrates using chrome.downloads.download() to
// download URLs.

var allLinks = [];
var visibleLinks = [];

// Display all visible links.
function showLinks() {
  var imageEl = document.getElementById('image');
  var voiceEl = document.getElementById('voice');
  for (var i = 0; i < visibleLinks.length; ++i) {
    if(RegExp('jpg|jpeg|png|gif').test(visibleLinks[i])){
      imageEl.dataset.url = visibleLinks[i];
      imageEl.style.display = null;
    } else if(RegExp('wav|mp3').test(visibleLinks[i])) {
      voiceEl.dataset.url = visibleLinks[i];
      voiceEl.style.display = null;
    }
  }
}

function downloadImage(){
  if (url = document.getElementById('image').dataset.url){
    chrome.downloads.download({url: url},
                                  function(id){
    });
  }
}

function downloadVoice(){
  if (url = document.getElementById('voice').dataset.url){
    chrome.downloads.download({url: url},
                                  function(id){
    });
  }
}

// Add links to allLinks and visibleLinks, sort and show them.  send_links.js is
// injected into all frames of the active tab, so this listener may be called
// multiple times.
chrome.extension.onRequest.addListener(function(links) {
  for (var index in links) {
    allLinks.push(links[index]);
  }
  allLinks.sort();
  visibleLinks = allLinks;
  showLinks();
});

// Set up event handlers and inject send_links.js into all frames in the active
// tab.
window.onload = function() {
  document.getElementById('image').onclick = downloadImage;
  document.getElementById('voice').onclick = downloadVoice;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'send_links.js', allFrames: true});
    });
  });
};
