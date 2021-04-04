const main = document.querySelector('main');
const url = 'https://randomuser.me/api/';
// Gets user info from url, parses to json, and isolates the results object
async function getUserInfo(url) {
    return await fetch(url)
        .then(response => response.json())
        .then(data => data.results[0])
};
//gets image from url and adds it to the html of parent
function generateImage(url, parent) {
    const html = `<img class='profile-img' alt='employee profile image' src=${url}>`;
    parent.innerHTML += html;
}
//packages name, email, and city info from a given user and adds it to the html of parent
function generateUserText(info, parent) {
    const html = `<div class='info'> 
                        <h1 class='name'>${info.name.first} ${info.name.last}</h1>
                        <p class='email'>${info.email}</p>
                        <p class='city'>${info.location.city}</p>
                    </div>`;
    parent.innerHTML += html;
    
}
//generates a full profile div for user and inserts the div into main
function addUser(user) {
    const div = document.createElement('div');
    div.className = 'profile';
    user
        .then(info => generateImage(info.picture.large, div));
    user
        .then(info => generateUserText(info, div));
    main.appendChild(div);
}
for (let i = 0; i < 12; i++) {
    let user = getUserInfo(url);
    addUser(user);
}


/* <div class='profile'>
            <img class='profile-img' alt='wtf' src='graham&jenga.jpg'>
            <div class='info'>
                <h1 class='name'>Graham Woolley</h1>
                <p class='email'>gwoolley@berkeley.edu</p>
                <p class='city'>Berkeley</p>
            </div>
        </div> */