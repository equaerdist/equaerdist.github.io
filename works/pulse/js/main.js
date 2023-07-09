const width = window.screen.width;
let resized;
$(document).ready(function () {
  width <= 576 ? (resized = true) : (resized = false);
  $(".carousel__inner").slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    prevArrow: resized
      ? false
      : '<button class="slick-prev"><img src="./png/pointer_left.svg"/></button>',
    nextArrow: resized
      ? false
      : '<button class="slick-next"><img src="./png/pointer_right.svg"/></button>',
  });
});
const more_nifo = document.querySelectorAll(
  ".catalog-item__main .catalog-item__link"
);
const main = document.querySelectorAll(".catalog-item__switcher");
more_nifo.forEach((ITEM, i) => {
  ITEM.addEventListener("click", function (e) {
    e.preventDefault();
    if (main[i].classList.length === 1) {
      main[i].classList.add(
        "catalog-item__switcher_active",
        "animate__animated",
        "animate__backInRight"
      );
    }
  });
});
const catalogList = document.querySelectorAll(".catalog__list");
const cataloghTab = document.querySelectorAll("li");
const catalogContent = document.querySelectorAll(".catalog__content");
const hideTab = () => {
  catalogContent.forEach((item) => {
    item.classList.remove(
      "catalog__content_active",
      "animate__zoomIn",
      "animate__animated"
    );
  });
  cataloghTab.forEach((item) => {
    item.classList.remove("catalog__tab_active");
  });
};
const showTab = (i) => {
  cataloghTab[i].classList.add("catalog__tab_active");
  catalogContent[i].classList.add(
    "catalog__content_active",
    "animate__zoomIn",
    "animate__animated"
  );
};
catalogList[0].addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.length === 0) {
    target = e.target.parentElement;
  }
  if (target && target.matches(".container .catalog__tab")) {
    cataloghTab.forEach((item, i) => {
      if (item == target) {
        hideTab();
        showTab(i);
      }
    });
  }
});
console.log(catalogList);
console.log(cataloghTab);
console.log(catalogContent);
const back = document.querySelectorAll(
  ".catalog-item__link.catalog-item__link_back"
);
back.forEach((ITEM, i) => {
  ITEM.addEventListener("click", function (e) {
    e.preventDefault();
    if (main[i].classList.length === 4) {
      main[i].classList.remove(
        "catalog-item__switcher_active",
        "animate__animated",
        "animate__backInRight"
      );
    }
  });
});
const overlay = document.querySelector(".overlay");
const modals = overlay.querySelectorAll(".modal");
modals.forEach((item, i) => {
  if (i != 2) {
    let button = item.querySelector(".information");
    button.addEventListener("submit", (e) => {
      e.preventDefault();
      modals[2].classList.add("modal_active");
      modals[i].classList.remove("modal_active");
    });
  }
  item.firstElementChild.addEventListener("click", (e) => {
    overlay.classList.remove("overlay_active");
    modals[i].classList.remove("modal_active");
  });
});
const promo_buttons = document.querySelectorAll(".promo button");
promo_buttons.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    overlay.classList.add("overlay_active");
    modals[0].classList.add("modal_active");
  });
});
let modalDscr = modals[1].querySelector(".modal__dscr");
const catalog_items = document.querySelectorAll(".catalog-item");
/* catalog_items.forEach((item, i) => {
  let temp = catalog_items[i].querySelector("button");
  let tempTwo = catalog_items[i].querySelector(".catalog-item__subtitle");
  temp.addEventListener("click", (e) => {
    e.preventDefault();
    modalDscr.textContent = tempTwo.textContent;
    overlay.classList.add("overlay_active");
    modals[1].classList.add("modal_active");
  });
}); */
const icon = document.querySelector(".promo__icon img");
icon.addEventListener("click", (e) => {
  icon.classList.add("animate__animated", "animate__zoomIn");
});
