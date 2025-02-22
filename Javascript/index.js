const moment = require("moment");

let capeTownElement=document.querySelector("#cape-town");
let capeTownDateElement=capeTownElement.querySelector(".date");
let capeTownTimeElement=capeTownElement.querySelector(".time");
let capeTownTime= moment().tz(Africa/Cape-Town);

capeTownDateElement.innerHTML=capeTownTime.format("MMMM Do YYYY");
capeTownTimeElement.innerHTML=`${capeTownTime.format("h:mm:ss")}<small>${capeTownTime.format("A")}</small>`;
