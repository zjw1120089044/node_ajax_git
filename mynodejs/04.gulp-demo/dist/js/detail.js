"use strict";window.addEventListener("load",function(){var r=document.querySelector(".preview_img"),u=document.querySelector(".mask"),y=document.querySelector(".big");r.addEventListener("mouseover",function(){u.style.display="block",y.style.display="block"}),r.addEventListener("mouseout",function(){u.style.display="none",y.style.display="none"}),r.addEventListener("mousemove",function(e){var t=e.pageX-this.offsetLeft-u.offsetWidth/2,o=e.pageY-this.offsetTop-u.offsetHeight/2,s=r.offsetWidth-u.offsetWidth,i=r.offsetHeight-u.offsetHeight;t<=0?t=0:s<=t&&(t=s),o<=0?o=0:i<=o&&(o=i),u.style.left=t+"px",u.style.top=o+"px";var f=document.querySelector(".bigImg"),n=f.offsetWidth-y.offsetWidth,d=t*n/s,l=o*n/i;f.style.left=-d+"px",f.style.top=-l+"px"})});