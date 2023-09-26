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

const linksSection = document.getElementById("shrtLinks");

const inputContainer = document.querySelector(`.container__shorten-link`);
const inputLink = document.querySelector(`.input__shorten-link`);
const btnShorten = document.querySelector(`.btn__shorten-link`);
const btnsGetStarted = document.querySelectorAll(".btn__get-started ");

const containerShortLinks = document.querySelector(`.ul_shorten-link`);

const btnMenu = document.querySelector(`.btn__menu`);
const navMobile = document.querySelector(`.nav-mobile`);

const scrollToLinks = function () {
  linksSection?.scrollIntoView({ behavior: "smooth" });
};

interface Link {
  fullLink: string;
  shortLink: string;
}

class App {
  #savedLinks: Link[] = [];
  copyLink = (button: HTMLElement, text: string = "") => {
    // you can copy just on at the time in the clipboard, so you clean all of them before changing
    containerShortLinks
      ?.querySelectorAll(".btn__copy-link")
      .forEach((button) => {
        button.classList.remove("bg-darkViolet");
        button.classList.add("hover:opacity-60");
        button.textContent = "Copy";
      });

    button.classList.add("bg-darkViolet");
    button.classList.remove("hover:opacity-60");
    button.textContent = "Copied!";

    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  constructor() {
    this._getLocalStorage();
    btnShorten?.addEventListener("click", () => this._shortenLink());
  }

  // SHORTEN THE LINK AND IMMEDIATELY CALL _addLink
  _shortenLink() {
    if (inputLink instanceof HTMLInputElement) {
      fetch(`https://api.shrtco.de/v2/shorten?url=${inputLink.value}`)
        .then((response) => {
          if (!response.ok) throw new Error(`${response.status}`);
          return response.json();
        })
        .then((data) => this._addLink(data.result))
        .catch((error) => {
          console.error(`Error code: ${error.message}`);

          inputContainer?.classList.add("input-error");
        });
    }
  }

  // ADD OBJECT TO LIST, SET LOCAL STORAGE AND DISPLAY IN LIST
  _addLink(data: Record<string, any>) {
    const newLink: Link = {
      fullLink: data.original_link,
      shortLink: data.full_short_link,
    };

    inputContainer?.classList.remove("input-error");
    this.#savedLinks.push(newLink);
    this._displayLink(newLink);
    this._setLocalStorage();
  }

  _removeLink(link: Link, el: HTMLElement) {
    // REMOVE FROM ARRAY
    this.#savedLinks = this.#savedLinks.filter(
      (el) =>
        !(el.fullLink === link.fullLink && el.shortLink === link.shortLink)
    );

    // REMOVE FROM DISPLAYED LIST
    el.remove();

    // UPDATE LOCAL STORAGE
    this._setLocalStorage();
  }

  _displayLink(link: Link) {
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

    containerShortLinks?.insertAdjacentHTML("afterbegin", html);

    const currentEl: HTMLElement =
      containerShortLinks?.querySelector(".li__shorten-link")!;

    // ADD EVENT TO COPY THE CLIPBOARD
    containerShortLinks
      ?.querySelector(".btn__copy-link")
      ?.addEventListener("click", (e) => {
        if (e.target instanceof HTMLElement) {
          this.copyLink(e.target, link.shortLink);
        }
      });

    containerShortLinks
      ?.querySelector(".btn__delete")
      ?.addEventListener("click", (e) => {
        if (e.target instanceof Element) {
          this._removeLink(link, currentEl);
        }
      });
  }

  _setLocalStorage() {
    localStorage.setItem("savedLinks", JSON.stringify(this.#savedLinks));
  }

  _getLocalStorage() {
    const pastLinks: string = localStorage.getItem("savedLinks") || "";

    // IN CASE THE USER NEVER SAVED ANYTHING
    if (!pastLinks) return;

    // OVERWRITE ARRAY FROM PAST SAVINGS
    this.#savedLinks = JSON.parse(pastLinks);

    // DISPLAY PAST LINKS
    this.#savedLinks.forEach((link) => this._displayLink(link));
  }

  _cleanAll() {
    this.#savedLinks = [];
    localStorage.removeItem("savedLinks");
  }
}

btnMenu?.addEventListener("click", () => {
  navMobile?.classList.toggle("opacity-100");
});

btnsGetStarted.forEach((button) =>
  button.addEventListener("click", () => scrollToLinks())
);

const app = new App();
