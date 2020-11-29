const lib = [  
    {id:1, artist:"fela", song:"Back to sender", album:"MOC Ministry of Corruption", genre:"Jazz", albumart:"images/fela.jpg", rating:'5'},
    {id:2,artist:"Drake", song:"Toosie Slide", album:"DRIZZY", genre:"Hip Hop", albumart:"images/drake.jpg", rating:'5'},
    {id:3,artist:"J Cole", song:"Middle Child", album:"Middle Child", genre:"Hip Hop", albumart:"images/jcole.jpg", rating:'5'},
    {id:4,artist:"Dua Lipa", song:"Dont start now", album:"Start Now", genre:"Pop", albumart:"images/dualipa.jpg", rating:'4'}, 
    {id:5,artist:"Alicia Keys", song:"Mex7", album:"Alicia", genre:"Hip Hop", albumart:"images/aliciakeys.jpg", rating:'3'}, 
    {id:6,artist:"The Game, J. Colem JMSN", song:"Pray", album:"Jesus Piece (Deluxe)", genre:"Hip Hop", albumart:"images/thegame_pray.jpg", rating:'5'},
    {id:7,artist:"The Weekend", song:"Blinding Lights", album:"Lights", genre:"Classical", albumart:"images/theweeknd.png", rating:'2'},
    {id:8,artist:"Blacked Eyed Peas, Ozuna, J. Rey Soul", song:"MAMACITA", album:"Single", genre:"Hip Hop", albumart:"images/blackeyedpeas.jpg", rating:'4'},
    {id:9,artist:"Ed Sheeran", song:"Shape of You", album:"Divide (Deluxe)", genre:"Pop", albumart:"images/divide.jpg", rating:'5'},
    {id:10,artist:"Maroon 5", song:"Memories", album:"Maroon 5", genre:"Pop", albumart:"images/maroon5.jpg", rating:'4'},
    {id:11, artist:"Burna Boy", song:"Anybody", album:"African Giant", genre:"Afrobeats", albumart:"images/africangiant.png", rating:'5'},
    {id:12,artist:"BHP", song:"Action", album:"BHP", genre:"Hip Hop", albumart:"images/bhpalbum.jpg", rating:'5'},
    {id:13,artist:"Burna boy", song:"Heaven's Gate", album:"Outside", genre:"Afrobeats", albumart:"images/burnaboy.jpg", rating:'5'},
    {id:14,artist:"Wizkid", song:"Smile (feat. H.E.R.)", album:"Made in Lagos", genre:"Afrobeats", albumart:"images/wizkid.jpg", rating:'4'}, 
    {id:15,artist:"Bob Marley & The Wailers", song:"Buffalo Soldier", album:"Alicia", genre:"Reggae", albumart:"images/bobmarley.jpg", rating:'5'}, 
    {id:16,artist:"BHP", song:"Goody Bud", album:"Tree House Music Volume One", genre:"Hip Hop", albumart:"images/bhp.jpg", rating:'4'}
];
const library = lower(lib);
const formElements = document.querySelectorAll('.search-option');
const searchBtn = document.getElementById('btn-search');
const resetBtn = document.getElementById('btn-reset');
const downloadBtns = document.querySelectorAll('.btn-download');
const searchResults = document.getElementById('search-results');
const tableDiv = document.getElementById('table-container');

let favPhotos = [];
const favoritesContainer = document.querySelector('.favorites');
const logoDiv = document.querySelector('.logo');
const favBtn = document.getElementsByClassName("btn-fav");

const favorites = favoritesContainer.children;
let userSearch = '';

window.addEventListener('load', () => {
    console.log('window loaded')
    reset();
});

function reset(){
    tableDiv.style.visibility = 'hidden';
    favoritesContainer.classList.remove('show');    
}

resetBtn.addEventListener('click', reset);

//function to add results to table div on search
function addResults(res) {
    tableDiv.style.visibility = 'visible';
    //for each result, add a new row
    res.forEach(element => {
        const newRow = document.createElement('tr');
        newRow.setAttribute("id", element.id);
        newRow.className = "tableRow";
        newRow.innerHTML = `<td>    ${element.artist}   </td>       <td>    ${element.song}     </td>
                            <td>    ${element.album}    </td>       <td>    ${element.rating}   </td>
                            <td>    ${element.genre}</td>
                            <td>    <input type="button" class="btn-download" value="Download">  </td>
                            <td>    <input type="button" class="btn-fav" value="Add to Favorites">  </td>`;
        searchResults.appendChild(newRow);
    });
}

//get album art url from library object
function getAlbumArt(event) {
    let fav = event.target.parentNode.parentNode.id;
    let [match] = library.filter(record => record.id == fav);
    return match.albumart;
}

//convert an object to lowercase
function lower(obj) {
    for (var prop in obj) {
        if (typeof obj[prop] === 'string') {
            obj[prop] = obj[prop].toLowerCase();
        }
        if (typeof obj[prop] === 'object') {
            lower(obj[prop]);
        }
    }
    return obj;
}

document.addEventListener('click',(e) =>{
    if(e.target && e.target.className== 'btn-fav'){
        let clickedBtn = e.target;
        let imageUrl = getAlbumArt(e);
        let favImage = document.createElement('img');
        favImage.setAttribute("src", imageUrl);
        favImage.className = "fav";
        
        if(!favoritesContainer.classList.contains('show')){ favoritesContainer.classList.add('show');}
        
        favoritesContainer.appendChild(favImage);
        //add a listener on the image
        addListener(favImage);
        clickedBtn.disabled = true;        
    }
});

function addListener(img) {
    img.addEventListener('click', (e) => {
        let clickedImage = e.target;
        favoritesContainer.removeChild(clickedImage);
        if(favoritesContainer.childElementCount == 0){
            favoritesContainer.classList.remove('show');
        }
    });
};

function  handleCase(e){    return e.toLowerCase(); }

function getUserInput() {
    let val = {};
    formElements.forEach((el) => {        
        if(el.value !== "" ) { (val[el.id] = handleCase(el.value)) }
    });
    return val;
}

function searchLibrary(el){
    let result = library.filter(record => 
            ((record.artist).includes(el.artist) || 
                record.song.includes(el.song) || 
                record.album.includes(el.album) || 
                record.genre.includes((el.genre) ) ) );
    if (el.genre === "all"){
        result = library;
    }
    if (result.length === 0){
        alert("Search not found!!")
        return 0;
    }
    
    console.log("search result <<<<<<>>>>>>",result);
    return result;
}

searchBtn.addEventListener('click', function(e){
    e.preventDefault();
    if (isFormEmpty()) {
        alert('Please enter search criteria') 
    }
    else{//start of main execution
        userSearch = getUserInput();
        const results = searchLibrary(userSearch); //search results

        if(results.length > 0){
            tableDiv.style.visibility = 'visible';
            addResults(results);
        }
    }
});

document.addEventListener('click',(e) =>{
    if(e.target && e.target.className== 'btn-download')
        alert("Downloads coming soon");
});

//function to check empty form
function isFormEmpty() {
    let values = [];
    formElements.forEach((el) => {
       if(el.value !== "") {values.push(el.value)}
    });
    return values.length === 0;
}
