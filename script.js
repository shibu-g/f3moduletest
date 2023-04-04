let heading=document.querySelector('.heading');
let img=document.querySelector('.img');
let details=document.querySelector('.details');
let search=document.querySelector('.search');
let arr=[];
function getCurrentImageOfTheDay(){
    localStorage.clear();
    let date=new Date().toISOString().split("T")[0];
    fetch(`https://api.nasa.gov/planetary/apod?api_key=hTmYy4o81a0rQHH8Te0EjKIMKlWbHTWXuG6zN0zw&date=${date}`).then((res)=>{
    return res.json();
    }).then((data)=>{
    //  console.log(data);
     heading.innerHTML=`<h2>NASA Picture of the Day </h2>`;
     img.innerHTML=`<img src="${data.hdurl}">`
     details.innerHTML=`<h3>${data.title}</h3>`
     details.innerHTML+=`<p>${data.explanation
     }</p>`
    });
}

getCurrentImageOfTheDay();
function getImageOfTheDay(){
let date=document.querySelector('#search-input').value;
fetch(`https://api.nasa.gov/planetary/apod?api_key=hTmYy4o81a0rQHH8Te0EjKIMKlWbHTWXuG6zN0zw&date=${date}`).then((res)=>{
    return res.json();
    }).then((data)=>{
    //  console.log(data);
     heading.innerHTML=`<h2>Picture On ${date} </h2>`;
     img.innerHTML=`<img src="${data.hdurl}">`
     details.innerHTML=`<h3>${data.title}</h3>`
     details.innerHTML+=`<p>${data.explanation
     }</p>`
    });
  saveSearch(date);
}
function saveSearch(date){
    arr.push(date);
    localStorage.setItem('searches',JSON.stringify(arr));
    addSearchToHistory();
}
function getprevious(no){
    let data=JSON.parse(localStorage.getItem('searches'));
    let date=data[no];
    fetch(`https://api.nasa.gov/planetary/apod?api_key=hTmYy4o81a0rQHH8Te0EjKIMKlWbHTWXuG6zN0zw&date=${date}`).then((res)=>{
    return res.json();
    }).then((res)=>{
    //  console.log(data);
     heading.innerHTML=`<h2>Picture On ${date} </h2>`;
     img.innerHTML=`<img src="${res.hdurl}">`
     details.innerHTML=`<h3>${res.title}</h3>`
     details.innerHTML+=`<p>${res.explanation
     }</p>`
    });
}
function addSearchToHistory(){
   let list=document.querySelector('.list');
   list.innerHTML="";
   let data=JSON.parse(localStorage.getItem('searches'));
   let no=0;
  for(let i=0;i<data.length;i++){
    list.innerHTML+=`<li><a href="#" onclick="getprevious(${i})">${data[i]}</a></li>`;
  }
}
search.addEventListener('click',getImageOfTheDay);