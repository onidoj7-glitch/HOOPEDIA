"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const pageHeading = document.querySelector(".article h1");

if (pageHeading) {
  const pageTitle = pageHeading.textContent.trim();
  document.title = pageTitle === "Basketball, explained"
    ? "Hoopedia — The Basketball Knowledge Library"
    : `${pageTitle} — Hoopedia`;
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && window.matchMedia("(max-width: 700px)").matches) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}
