// ==UserScript==
// @name        Bandcamp Download Album
// @namespace   https://bandcamp.com
// @match       https://bandcamp.com/download*
// @description Downloads the item from the download page. Refreshes if there is an error.
// @author      Ryan Bluth, Xerus2000
// @version     1.1
// @grant       none
// ==/UserScript==

(function () {
    'use strict'

    // Set preferred download format here
    var format = "MP3 320"
    // Whether the download tab should automatically be closed after the download has been started
    var closeAfterDownload = true

    var selectedFormat = false
    setTimeout(() => {
        var interval = setInterval(() => {
            if (!selectedFormat) {
                document.getElementsByClassName('item-format button')[0].click()
                var spans = document.getElementsByTagName("span")

                for (var i = 0; i < spans.length; i++) {
                  if (spans[i].textContent == format) {
                    spans[i].parentElement.click()
                    selectedFormat = true
                    break
                  }
                }
            } else {
                const errorTextNodes = [...document.querySelectorAll(".error-text")]
                const anyErrorTextDisplayed = errorTextNodes.some(el => el.offsetParent !== null)
                if (anyErrorTextDisplayed) {
                    location.reload()
                }

                try {
                    var maintenanceLink = document.getElementsByTagName("a")[0]
                    if (maintenanceLink.href.indexOf("bandcampstatus") > 0) {
                        location.reload()
                    }
                } catch (e) {
                    console.log(e)
                }

                const downloadNode = document.querySelector(".download-title > .item-button")
                if (downloadNode !== null) {
                    window.open(downloadNode.href, "_blank")
                    clearTimeout(interval)
                    if (closeAfterDownload) {
                        close()
                    }
                }
            }
        }, 2000);
    }, 2000);
})();
