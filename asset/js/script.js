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

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#site-search");
const searchResults = document.querySelector("#search-results");

const articles = [
  { title: "Basketball Rules", url: "rules.html", summary: "An overview of the game's rules, scoring, fouls, and violations.", keywords: "basic rules game court teams" },
  { title: "Basic basketball rules", url: "rules.html#basic-rules", summary: "How the game is played, how teams move the ball, and how possession changes.", keywords: "traveling double dribble out of bounds five players overtime" },
  { title: "Scoring", url: "rules.html#scoring", summary: "Free throws and one-point, two-point, and three-point shots.", keywords: "1 2 3 points free throw field goal three-point line" },
  { title: "Fouls and violations", url: "rules.html#fouls-violations", summary: "Common fouls, traveling, double dribble, backcourt, and goaltending.", keywords: "personal technical blocking charge illegal contact rules" },
  { title: "Plays and Techniques", url: "plays.html", summary: "Common basketball plays and the individual skills used to perform them.", keywords: "fundamentals" },
  { title: "Common plays", url: "plays.html#common-plays", summary: "Pick and roll, give and go, fast break, and backdoor cut.", keywords: "screen cut offense attack" },
  { title: "Dribbling", url: "plays.html#dribbling", summary: "Moving with the ball using controlled bounces.", keywords: "ball handling control" },
  { title: "Passing", url: "plays.html#passing", summary: "Chest, bounce, and overhead passes between teammates.", keywords: "ball movement assist" },
  { title: "Shooting", url: "plays.html#shooting", summary: "Shooting fundamentals, layups, free throws, and shot selection.", keywords: "score basket" },
  { title: "Rebounding", url: "plays.html#rebounding", summary: "Securing the ball after a missed shot and boxing out.", keywords: "offensive defensive board" },
  { title: "Defense", url: "plays.html#defensive-fundamentals", summary: "Individual defensive footwork, awareness, and communication.", keywords: "guarding defend" },
  { title: "Strategies", url: "strategies.html", summary: "How teams organize their offense, defense, and transition play.", keywords: "team tactics" },
  { title: "Offensive strategies", url: "strategies.html#offense", summary: "Spacing, ball movement, screening, and creating good shots.", keywords: "pick and roll attack offense" },
  { title: "Defensive strategies", url: "strategies.html#defense", summary: "Man-to-man, zone, and press defenses.", keywords: "guarding man to man zone press defense" },
  { title: "Transition play", url: "strategies.html#transition", summary: "Fast breaks and changing between offense and defense.", keywords: "fast break possession" },
  { title: "Basketball History", url: "history.html", summary: "The invention and development of basketball around the world.", keywords: "history origin timeline" },
  { title: "Invention of the game", url: "history.html#invention", summary: "James Naismith and the first basketball game in 1891.", keywords: "James Naismith Springfield peach baskets" },
  { title: "Development and spread", url: "history.html#development", summary: "How basketball spread and became an Olympic sport.", keywords: "YMCA Olympics international" },
  { title: "Positions and Skills", url: "positions.html", summary: "Traditional player roles and skills used across the team.", keywords: "roles positions" },
  { title: "Five traditional positions", url: "positions.html#positions", summary: "Point guard, shooting guard, small forward, power forward, and center.", keywords: "point guard shooting guard small forward power forward center" },
  { title: "Skills for every player", url: "positions.html#shared-skills", summary: "Dribbling, passing, shooting, rebounding, defense, and teamwork.", keywords: "fundamentals" }
];

function showSearchResults(query) {
  if (!searchResults) return;

  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  searchResults.replaceChildren();

  if (words.length === 0) {
    searchResults.hidden = true;
    return;
  }

  const matches = articles.filter((article) => {
    const searchableText = `${article.title} ${article.summary} ${article.keywords}`.toLocaleLowerCase();
    return words.every((word) => searchableText.includes(word));
  }).slice(0, 8);

  if (matches.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No matching articles. Try another basketball term.";
    searchResults.append(message);
    searchResults.hidden = false;
    return;
  }

  const list = document.createElement("ul");
  for (const article of matches) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const title = document.createElement("strong");
    const summary = document.createElement("span");

    link.href = article.url;
    title.textContent = article.title;
    summary.textContent = article.summary;
    link.append(title, summary);
    item.append(link);
    list.append(item);
  }

  searchResults.append(list);
  searchResults.hidden = false;
}

if (searchForm && searchInput && searchResults) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showSearchResults(searchInput.value);
  });

  searchInput.addEventListener("input", () => {
    showSearchResults(searchInput.value);
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !searchForm.contains(event.target) && !searchResults.contains(event.target)) {
      searchResults.hidden = true;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchResults.hidden = true;
      searchInput.blur();
    }
  });
}
