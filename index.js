const battery=require("battery");
const notifier=require("node-notifier");
const path=require("path");

var warnLevels=[15,20,25,30,35];
warnLevels.sort(function(a,b){return b-a;});
var toWarnLevels=warnLevels;

async function check(){
var {level,charging}=await battery();
level=Math.floor(level*100);
if(charging){toWarnLevels=warnLevels;return;}
if(level<=toWarnLevels[0]){
notifier.notify({title:"node.battery-notifier",message:`Battery level is now at ${level}%`,icon:path.join(__dirname,"low.png"),sound:true,wait:true});
var closest=toWarnLevels.reduce(function(prev,curr){return Math.abs(curr-level)<Math.abs(prev-level)?curr:prev;});
toWarnLevels=toWarnLevels.slice(toWarnLevels.indexOf(closest)+1,toWarnLevels.length-1);
}
}
check();
setInterval(check,60000);
