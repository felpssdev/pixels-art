(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const g of r.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&s(g)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}})();const y=["red","yellow","palevioletred","green","blue","orange","cyan","purple","lightblue","grey","lightgrey","mediumblue","lime","deepskyblue","lightgreen","deeppink","lightyellow","brown","crimson","moccasin","snow","orchid","magenta","darkorange","darkgrey"],c=document.getElementById("pixel-board"),a=document.getElementById("first-color"),i=document.getElementById("second-color"),u=document.getElementById("third-color"),m=document.getElementById("fourth-color");a.classList.add("selected");const S=document.getElementById("button-random-color");S.addEventListener("click",()=>{C(),k()});const p=e=>{d(e),c.style.width=e*40+2+"px",c.style.height=e*40+2+"px",x.value="",document.querySelectorAll(".pixel").forEach((s,t)=>{s.style.backgroundColor="white"}),document.querySelector(".selected").classList.remove("selected"),a.classList.add("selected"),f()},x=document.getElementById("board-size"),v=document.getElementById("generate-board");v.addEventListener("click",()=>{const e=x.value;e>=5&&e<=50?p(e):e<5&&e>0?p(5):e>50&&e>=5?p(50):alert(e===""?"Board inválido!":"Digite um valor entre 5 e 50!"),L()});const k=()=>{const e={colorTwo:"",colorThree:"",colorFour:""};e.colorTwo=i.style.backgroundColor,e.colorThree=u.style.backgroundColor,e.colorFour=m.style.backgroundColor,localStorage.colorPalette=JSON.stringify(e)},E=()=>{const e=JSON.parse(localStorage.colorPalette);i.style.backgroundColor=e.colorTwo,u.style.backgroundColor=e.colorThree,m.style.backgroundColor=e.colorFour},f=()=>{const e=document.querySelectorAll(".pixel");let o=[];e.forEach(s=>{o.push(s.style.backgroundColor)});const l={};e.forEach((s,t)=>{l[t+1]=o[t]}),localStorage.pixelBoard=JSON.stringify(l)},L=()=>{const e=document.querySelectorAll(".pixel"),o={length:""};o.length=e.length,localStorage.boardSize=JSON.stringify(o)},h=()=>{document.querySelectorAll(".pixel");let e={};return e=JSON.parse(localStorage.boardSize),e.length=Math.sqrt(e.length),e.length},b=()=>{const e=document.querySelectorAll(".pixel"),o=JSON.parse(localStorage.pixelBoard);e.forEach((l,s)=>{l.style.backgroundColor=o[s+1]})},w=document.querySelectorAll(".color");w.forEach(e=>{e.addEventListener("click",()=>{document.querySelector(".selected").classList.remove("selected"),event.target.classList.add("selected"),n()})});const n=()=>{document.querySelectorAll(".pixel").forEach(o=>{o.addEventListener("click",()=>{const l=document.querySelector(".selected");event.target.style.backgroundColor=l.style.backgroundColor,f()})})},B=document.getElementById("clear-board");B.addEventListener("click",()=>{document.querySelectorAll(".pixel").forEach(o=>{o.style.backgroundColor="white"}),f()});const d=e=>{const o=document.getElementsByClassName("pixel");for(;o.length>0;)o[0].parentNode.removeChild(o[0]);for(let l=0;l<e*e;l+=1)O()},O=()=>{const e=document.createElement("div");e.classList.add("pixel"),e.style.backgroundColor="white",c.appendChild(e)},C=()=>{i.style.backgroundColor=y[Math.floor(Math.random()*(y.length-1))];let e=y;e=e.filter(o=>o!==i.style.backgroundColor),u.style.backgroundColor=e[Math.floor(Math.random()*(e.length-1))],e=e.filter(o=>o!==u.style.backgroundColor),m.style.backgroundColor=e[Math.floor(Math.random()*(e.length-1))]};window.onload=()=>{const e=document.querySelectorAll(".pixel");if(localStorage.colorPalette?(a.style.backgroundColor="black",a.classList.add("selected"),E(),n()):(a.style.backgroundColor="black",a.classList.add("selected"),C(),d(5),n()),localStorage.pixelBoard)if(localStorage.pixelsLength)c.style.width=h()*40+2+"px",c.style.height=h()*40+2+"px",d(h()),b(),n();else{let o=JSON.parse(localStorage.pixelBoard);o=Math.sqrt(Object.keys(o).length),c.style.width=o*40+2+"px",c.style.height=o*40+2+"px",d(o),b(),n()}else d(5),e.forEach(o=>{o.style.backgroundColor="white"}),n()};