// ==UserScript==
// @name     Stats Logger
// @version  1
// @include https://example.com/*
// ==/UserScript==

var header = document.getElementById("page-header");
var my_btn = document.createElement("button");
my_btn.textContent = "Show stats";
header.appendChild(my_btn);
var ta = document.createElement("textarea")
ta.rows = 1
header.appendChild(ta)
ta.style.display = "none"

my_btn.onclick = function(event) {
    if (this.textContent == "Show stats") {
        ta.style.display = "block"
        ta.value = ""
        var str = ""
        var divs = document.getElementsByClassName("snap-completion-meta");
        var studs = document.querySelectorAll('tr[id^="user-index-participants"]')

        if (divs.length > 0) {
            for (var i = 0; i < divs.length; i++) {
                var lnks = divs[i].getElementsByTagName("a")
                var lnk = lnks[0];
                var due = "?"
                if (lnks[1]) {
                    lnk2 = lnks[1].text
                    var b1 = lnk2.split(" ")
                    due = b1[1] + "-" + b1[2].substring(0, 3);
                }
                var txt = lnk.text
                var un = "0"
                var bits = txt.split(",")
                var sub = bits[0].split(" ")[0]
                if (bits.length > 1) {
                    un = bits[1].trim().split(" ")[0]
                }
                str += due + '\t' + sub + '\t' + un + '\t'
            }
            ta.value = str.trim()
            ta.select()
            this.textContent = "Hide stats"
        } else if (studs.length > 0) {
            var lnk = document.querySelector('a[data-action="showcount"]');
            lnk.addEventListener("click", getStuds)
            lnk.click()
            this.textContent = "Hide stats"
        }
    } else {
        ta.style.display = "none"
        this.textContent = "Show stats"
    }
}

function getStuds() {
  console.log("checking")
    var parts = document.querySelector('p[data-region="participant-count"]').textContent.split(" ")[0];
    var studs = document.querySelectorAll('tr[id^="user-index-participants"]')
    if (Number(parts) > 20 && studs.length == 20) {
        window.setTimeout(getStuds, 250);
    } else {
        var logins = 0
        var students = 0
        for (var a = 0; a < studs.length; a++) {
            if (studs[a].cells[3].textContent.trim() == "Student" && studs[a].cells[6].textContent.trim() == "Active") {
                students += 1
                var lg = studs[a].cells[5].textContent.trim()
                if (lg !== "Never" && lg) {
                    logins += 1
                }
            }
        }
        var str = students + "\t" + logins
        ta.value = str.trim()
        ta.select()
    }
}  
