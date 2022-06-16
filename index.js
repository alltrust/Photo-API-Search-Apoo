const API_KEY = 'YOUR-API-KEY'

const coverImg = document.querySelector('.cover-img');
coverImg.innerHTML = `
<img class="main-img" src='imgs/nature_cover.jpg'>
`
// window.addEventListener('load', ()=>{
//     search.innerHTML = "nature"
// })
const pexelIcon = document.querySelector('.pexel-icon');
pexelIcon.innerHTML= `
    <svg class="outer-icon" width="32px" height="32px" viewbox = "0 0 32 32">
        <path d="M 2 0 h 28 a 2 2 0 0 1 2 2 v 28 a 2 2 0 0 1 -2 2 H 2 a 2 2 0 0 1 -2 -2 V 2 a 2 2 0 0 1 2 -2 Z" fill="#05A081" ></path>
        <path d ="M 13 21 h 3.863 v -3.752 h 1.167 a 3.124 3.124 0 1 0 0 -6.248 H 13 v 10 Z m 5.863 2 H 11 V 9 h 7.03 a 5.124 5.124 0 0 1 0.833 10.18 V 23 Z" fill= "#fff"></path>
    </svg>
`

const search = document.querySelector('#search-form');
search.addEventListener("submit", e=>{
    console.log(e)
    e.preventDefault();
    let searchString = document.querySelector('#search-bar').value
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let parsedRes = JSON.parse(xhttp.responseText);
            const photoData = parsedRes.photos
            const imgContainer1 = document.createElement('div');
            const imgContainer2 = document.createElement('div');
            const imgContainer3 = document.createElement('div');
            const mainContainer = document.querySelector('#main-container');
            mainContainer.innerHTML=''
            mainContainer.append(imgContainer1);
            mainContainer.append(imgContainer2)
            mainContainer.append(imgContainer3)
            let arrOfImgDivs = []
            photoData.forEach(element => {
                const imgDiv = document.createElement('div');
                imgDiv.innerHTML = `
               <img class = "photo-img"  src = ${element.src.original}>
               `
               arrOfImgDivs.push(imgDiv);
                let imgOfContainer1 = (arrOfImgDivs.length % 3 === 0)
                let imgOfContainer2 = (arrOfImgDivs.length % 3 === 1)
                let imgOfContainer3 = (arrOfImgDivs.length % 3 === 2)
                if (imgOfContainer1) { 
                    imgContainer1.append(imgDiv)
                }
                if (imgOfContainer2) { 
                    imgContainer2.append(imgDiv)
                }
                if (imgOfContainer3) { 
                    imgContainer3.append(imgDiv)
                }     
            });
        }
    };
    
    xhttp.open("GET", `https://api.pexels.com/v1/search?query=${searchString}&per_page=15`, true);
    xhttp.setRequestHeader('Authorization', API_KEY)
    xhttp.send();
})
