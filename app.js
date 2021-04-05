const main = document.querySelector('main');
const section = document.querySelector('#popups');
const url = 'https://randomuser.me/api/';
const overlay = document.querySelector('.overlay');
// Gets user info from url, parses to json, and isolates the results object
async function getUserInfo(url) {
    return await fetch(url)
        .then(response => response.json())
        .then(data => data.results[0])
        .catch(err => `Sorry, there was an error: ${err}`);
};
//gets image from url and adds it to the html of parent
function generateCardImage(url, parent) {
    const html = `<img class='profile-img' alt='employee profile image' src=${url}>`;
    parent.innerHTML += html;
}
//gets image and adds it to the html of parent, but also produces an x-button
function generatePopupImage(url, parent) {
    const html = `<button class='x'>X</button>
                    <img class='popup-img' alt='employee profile image' src=${url}>
                    `;
    parent.innerHTML += html;
}
// takes birthdate in string format ('1962-01-14T00:48:51.306Z') and returns a string in mm/dd/yyyy format
function formatBirthday(str) {
    const year = str.slice(0, 4);
    const month = str.slice(5, 7);
    const day = str.slice(8, 10);
    return `${month}/${day}/${year}`;
}
//packages name, email, and city info from a given user and adds it to the html of parent
function generateCardText(info, parent) {
    const html = `<div class='info'> 
                        <h1 class='name'>${info.name.first} ${info.name.last}</h1>
                        <p class='email'>${info.email}</p>
                        <p class='city'>${info.location.city}</p>
                    </div>`;
    parent.innerHTML += html;
}
//same as generateCardText, but includes number, address, birthday & scroll buttons
function generatePopupText(info, parent) {
    const loc = info.location;
    const html = `<h1 class='name'>${info.name.first} ${info.name.last}</h1>
                        <p class='email'>${info.email}</p>
                        <p class='city'>${info.location.city}</p>
                        <hr>
                        <p class='number'>${info.phone}</p>
                        <p class='address'>${loc.street.number} ${loc.street.name}, ${loc.city} ${loc.state} ${loc.postcode}</p>
                        <p class='birthday'>Birthday: ${formatBirthday(info.dob.date)}</p>
                        <div class='slide-buttons'><button class='left'>&larr;</button><button class='right'>&rarr;</button></div>
                    `;
    parent.innerHTML += html;                                   
}
//generates a full profile div for user and inserts the div into main.  
function addUser(user) {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.className = 'profile';
    user.then(info => generateCardImage(info.picture.large, div));
    user.then(info => generateCardText(info, div));
    main.appendChild(div);
    div.style.display = 'flex';
}
function makePopup(user) {
    const div = document.createElement('div'); 
    div.className = 'popup';
    user.then(info => generatePopupImage(info.picture.large, div));
    user.then(info => generatePopupText(info, div));
    section.appendChild(div);
}
// get 12 users, display their information in cards, & create popups with more complete information. 
for (let i = 0; i < 12; i++) {
    let user = getUserInfo(url);
    addUser(user);
    makePopup(user);
}
// get arrays (not html collections) containing divs 
const profiles = [...main.children];
const popups = [...section.children];
//event listener for cards to display relevant popup on click
main.addEventListener('click', e => {
    card = e.target; 
    if (card.tagName !== 'MAIN') {
        //create a variable representing the card div
        let thisDiv;
        if (card.className === 'profile') {
            thisDiv = card;
        } else if (card.className === 'info' || card.className === 'profile-img') {
            thisDiv = card.parentNode;
        } else {
            thisDiv = card.parentNode.parentNode;
        }
        // get index of thisDiv and display the corresponding popup
        let index = profiles.indexOf(thisDiv);
        let thisPopup = popups[index];
        section.style.display = 'block';
        thisPopup.style.display = 'flex';
        overlay.style.display = 'block';
    }
});
//event listener to close the popup window when the x or the overlay are clicked
xButtons = [...document.querySelectorAll('.x')];
[overlay, ...xButtons].forEach(element => element.addEventListener('click', e => {
    popups.forEach(popup => {
        if (popup.style.display === 'flex') {
            popup.style.display = 'none';
        }
        e.target.style.display = 'none';
        section.style.display = 'none';
    })
}));




/* <div class='popup'>
            <button class='x'>X</button>
            <img class='popup-img' alt='wtf' src='graham&jenga.jpg'>
            <h1 class='name'>Graham Woolley</h1>
            <p class='email'>gwoolley@berkeley.edu</p>
            <p class='city'>Berkeley</p>
            <hr>
            <p class='number'>(847) 873-4242</p>
            <p class='address'>555 Pierce St Albany, CA 94706</p>
            <p class='birthday'>Birthday: 06/15/1996</p>
            <div class='slide-buttons'><button class='left'>&larr;</button><button class='right'>&rarr;</button></div>
        </div>

/* <div class='profile'>
            <img class='profile-img' alt='wtf' src='graham&jenga.jpg'>
            <div class='info'>
                <h1 class='name'>Graham Woolley</h1>
                <p class='email'>gwoolley@berkeley.edu</p>
                <p class='city'>Berkeley</p>
            </div>
        </div> */