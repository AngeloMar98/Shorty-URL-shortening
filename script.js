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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _App_savedLinks;
const linksSection = document.getElementById("shrtLinks");
const inputContainer = document.querySelector(`.container__shorten-link`);
const inputLink = document.querySelector(`.input__shorten-link`);
const btnShorten = document.querySelector(`.btn__shorten-link`);
const btnsGetStarted = document.querySelectorAll(".btn__get-started ");
const containerShortLinks = document.querySelector(`.ul_shorten-link`);
const btnMenu = document.querySelector(`.btn__menu`);
const navMobile = document.querySelector(`.nav-mobile`);
const scrollToLinks = function () {
    linksSection === null || linksSection === void 0 ? void 0 : linksSection.scrollIntoView({ behavior: "smooth" });
};
class App {
    constructor() {
        _App_savedLinks.set(this, []);
        this.copyLink = (button, text = "") => {
            // you can copy just on at the time in the clipboard, so you clean all of them before changing
            containerShortLinks === null || containerShortLinks === void 0 ? void 0 : containerShortLinks.querySelectorAll(".btn__copy-link").forEach((button) => {
                button.classList.remove("bg-darkViolet");
                button.classList.add("hover:opacity-60");
                button.textContent = "Copy";
            });
            button.classList.add("bg-darkViolet");
            button.classList.remove("hover:opacity-60");
            button.textContent = "Copied!";
            if (!text)
                return;
            navigator.clipboard.writeText(text);
        };
        this._getLocalStorage();
        btnShorten === null || btnShorten === void 0 ? void 0 : btnShorten.addEventListener("click", () => this._shortenLink());
    }
    // SHORTEN THE LINK AND IMMEDIATELY CALL _addLink
    _shortenLink() {
        if (inputLink instanceof HTMLInputElement) {
            fetch(`https://api.shrtco.de/v2/shorten?url=${inputLink.value}`)
                .then((response) => {
                if (!response.ok)
                    throw new Error(`${response.status}`);
                return response.json();
            })
                .then((data) => this._addLink(data.result))
                .catch((error) => {
                console.error(`Error code: ${error.message}`);
                inputContainer === null || inputContainer === void 0 ? void 0 : inputContainer.classList.add("input-error");
            });
        }
    }
    // ADD OBJECT TO LIST, SET LOCAL STORAGE AND DISPLAY IN LIST
    _addLink(data) {
        const newLink = {
            fullLink: data.original_link,
            shortLink: data.full_short_link,
        };
        inputContainer === null || inputContainer === void 0 ? void 0 : inputContainer.classList.remove("input-error");
        __classPrivateFieldGet(this, _App_savedLinks, "f").push(newLink);
        this._displayLink(newLink);
        this._setLocalStorage();
    }
    _removeLink(link, el) {
        // REMOVE FROM ARRAY
        __classPrivateFieldSet(this, _App_savedLinks, __classPrivateFieldGet(this, _App_savedLinks, "f").filter((el) => !(el.fullLink === link.fullLink && el.shortLink === link.shortLink)), "f");
        // REMOVE FROM DISPLAYED LIST
        el.remove();
        // UPDATE LOCAL STORAGE
        this._setLocalStorage();
    }
    _displayLink(link) {
        var _a, _b;
        // CONSTRUCT THE LIST ELEMENT USING INSERADJACENTHTML
        const html = `<div
              class="li__shorten-link rounded-md bg-[#fff] desktop:flex desktop:flex-row desktop:p-[0.8rem]"
            >
              <div
                class="flex flex-row gap-[0.8rem] items-center border-b-[1px] border-gray-0 desktop:border-none px-[1.2rem] desktop:pl-0 py-[0.8rem]"
              >
                <div
                  class="btn__delete flex items-center justify-center border border-gray-0 rounded-full hover:cursor-pointer hover:bg-lightCyan hover:border-cyan min-w-[30px] min-h-[30px] transition-all duration-200 mt-[-2px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-[22px] text-gray-100 hover:text-gray-200"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M368 368L144 144M368 144L144 368"
                    />
                  </svg>
                </div>
                <a
                  class="full-link break-all"
                  href="${link.fullLink}"
                  target="_blank"
                >
                  ${link.fullLink}</a
                >
              </div>

              <div
                class="desktop:flex desktop:flex-row items-center desktop:ml-auto"
              >
                <a
                  class="shortened-link text-cyan block px-[1.2rem] py-[0.8rem]"
                  href="${link.shortLink}"
                  target="_blank"
                >
                  ${link.shortLink}</a
                >
                <button
                  class="btn__copy-link text-[#fff] text-base bg-cyan font-bold py-[0.6rem] mx-[1.2rem] mb-[0.8rem] rounded-md w-[calc(100%-2.4rem)] max-w-full text-center cursor-pointer desktop:w-[80px] desktop:m-0 transition-all duration-200 hover:opacity-60"
                >
                  Copy
                </button>
              </div>
            </div>`;
        containerShortLinks === null || containerShortLinks === void 0 ? void 0 : containerShortLinks.insertAdjacentHTML("afterbegin", html);
        const currentEl = containerShortLinks === null || containerShortLinks === void 0 ? void 0 : containerShortLinks.querySelector(".li__shorten-link");
        // ADD EVENT TO COPY THE CLIPBOARD
        (_a = containerShortLinks === null || containerShortLinks === void 0 ? void 0 : containerShortLinks.querySelector(".btn__copy-link")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
            if (e.target instanceof HTMLElement) {
                this.copyLink(e.target, link.shortLink);
            }
        });
        (_b = containerShortLinks === null || containerShortLinks === void 0 ? void 0 : containerShortLinks.querySelector(".btn__delete")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
            if (e.target instanceof Element) {
                this._removeLink(link, currentEl);
            }
        });
    }
    _setLocalStorage() {
        localStorage.setItem("savedLinks", JSON.stringify(__classPrivateFieldGet(this, _App_savedLinks, "f")));
    }
    _getLocalStorage() {
        const pastLinks = localStorage.getItem("savedLinks") || "";
        // IN CASE THE USER NEVER SAVED ANYTHING
        if (!pastLinks)
            return;
        // OVERWRITE ARRAY FROM PAST SAVINGS
        __classPrivateFieldSet(this, _App_savedLinks, JSON.parse(pastLinks), "f");
        // DISPLAY PAST LINKS
        __classPrivateFieldGet(this, _App_savedLinks, "f").forEach((link) => this._displayLink(link));
    }
    _cleanAll() {
        __classPrivateFieldSet(this, _App_savedLinks, [], "f");
        localStorage.removeItem("savedLinks");
    }
}
_App_savedLinks = new WeakMap();
btnMenu === null || btnMenu === void 0 ? void 0 : btnMenu.addEventListener("click", () => {
    navMobile === null || navMobile === void 0 ? void 0 : navMobile.classList.toggle("opacity-100");
});
btnsGetStarted.forEach((button) => button.addEventListener("click", () => scrollToLinks()));
const app = new App();
