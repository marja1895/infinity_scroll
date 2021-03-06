const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

let count = 5; //making count 5 - to improve performance on slow internet connection
const apiKey = 'QQ6qZDeWeQv7VaG9dgMYFH8pr6W9-nLCTKswe5EJ660';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images vere loaded
function imageLoaded() {

    imagesLoaded++;
   
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;// to load more photos after initial loading 5 pfotos
      }
}


//Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



// Crate elements for links and photos add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
   
    //  Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    });
        // Create <img> for photo
        const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);


        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
 } catch (error) {
    // catching error
}
}
// 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// on Load

getPhotos();