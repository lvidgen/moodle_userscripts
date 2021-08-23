// ==UserScript==
// @name     ID grabber
// @version  1
// @include https://example.com/mod/assign/*
// ==/UserScript==

var header = document.getElementById("page-header");
var my_btn2 = document.createElement("button");
my_btn2.textContent = "Get student IDs";
header.appendChild(my_btn2);
var ta2 = document.createElement("textarea");
ta2.rows = 1;
header.appendChild(ta2);
ta2.style.display = "none";

my_btn2.onclick = function (event) {
    if (this.textContent == "Get student IDs") {
        ta2.style.display = "block";
        ta2.value = "";
        var str2 = "First name \t Surname \t Student ID \n";
        var studs2 = document.querySelectorAll('tr[id^="mod_assign_grading_r"]');

        if (studs2.length > 0) {
            for (var i = 0; i < studs2.length; i++) {
                var cells = studs2[i].getElementsByTagName("td");
                var nm = cells[2].textContent.split(" ");
                var nm1 = nm[0];
                var nm2 = nm[1];
                var stid = cells[3].textContent;
                if (nm1) {
                    str2 += nm1 + "\t" + nm2 + "\t" + stid + "\n";
                }
            }
            ta2.value = str2.trim();
            ta2.select();
            this.textContent = "Hide Student IDs";
        }
    } else {
        ta2.style.display = "none";
        this.textContent = "Get student IDs";
    }
};
