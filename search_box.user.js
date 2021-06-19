// ==UserScript==
// @name     Search All Sites
// @version  1
// @include https://example.com/*
// ==/UserScript==

(function(){
var home = document.getElementById("region-main");
var tiles = document.getElementById("snap-pm-courses-nav");
var lnk = document.getElementsByClassName("snap-personal-menu-more");

try{
var div1 = document.createElement("div");
div1.innerHTML='<form action="https://example.com/course/search.php" method="get" _lpchecked="1">'
    +'<fieldset class="coursesearchbox invisiblefieldset">'
       +' <label for="navsearchbox" class="sr-only">Search sites</label>'
       +' <div class="input-group">'
         +'   <input name="search" type="text" size="0" class="form-control" placeholder="Search all sites">'
         +'   <span class="input-group-btn">'
             +'   <button class="btn btn-secondary" type="submit">Go</button>'
           +' </span>'
       +' </div>'
  +'  </fieldset>'
+'</form>'
    

    var div2 = div1.cloneNode(true);

  if (tiles){
    tiles.append(div1);
    }
  if (home){
    home.prepend(div2);
    }
  if (lnk.length>0){
    console.log("removing link")
  lnk[0].style.display="none";
  }

} catch(err){
console.error(err.message);

}
})();