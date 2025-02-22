const moment = require("moment");
let moment= require(moment.tz);

let capeTownElement=document.querySelector("#cape-town");
let capeTownDateElement=capeTownElement.querySelector(".date");
let capeTownTimeElement=capeTownElement.querySelector(".time");
let capeTownTime= moment().tz(Africa/Cape_Town);

capeTownDateElement.innerHTML=capeTownTime.format("MMMM Do YYYY");
capeTownTimeElement.innerHTML=`${capeTownTime.format("h:mm:ss")}<small>${capeTownTime.format("A")}</small>`;

let johannesburgElement=document.querySelector("#johannesburg");
let johannesburgDateElement=johannesburgElement.querySelector(".date");
let johannesburgTimeElement=johannesburgElement.querySelector(".time");
let johannesburgTime= moment().tz(Africa/Johannesburg);

johannesburgDateElement.innerHTML=johannesburgTime.format("MMMM Do YYYY");
johannesburgTimeElement.innerHTML=`${johannesburgTime.format("h:mm:ss")}<small>${capeTownTime.format("A")}</small>`;
