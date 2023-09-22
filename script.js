"use strict";
/*
1. User stories

As a user I want to hava the link I input shortened with the shorten button
As a user I want all the links I created in the list below
In the list below, as a user I want to be able to copy the link in the clipboard just by clicking

As a user I want the list to be permanent when I exit the page
As a user I want to be able to see the site both on mobile and desktop

2. Features

- The link are received by using the input form, in case the input field is empty we display a error message;
- The link needs to be shortened with the API, since we need to store both the entire link and the shorten we might just create an Object that stores both and uses the API;
- The API needs to be implemented in the Object with a simple function working with .this, on the object itself;

- A function will take a shortened link object and create an element, the element itself needs to have a copy button that copies automatically;

- Each shortened link object needs to be stored into an array, it'll simply have all the object stored in order of creation;
- Local storage will save such array, and when the page is loaded, the local storage is poured into the array, THEN the array is looped to display the entire content in the list;

- The functionalities are the same on mobile

4. Architecture
*/
