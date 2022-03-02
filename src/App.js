import React, { useState, useEffect } from "react";
import "./assets/scss/main.scss";
import iconMoon from "./assets/images/icon-moon.svg";
import iconSun from "./assets/images/icon-sun.svg";
import iconSearch from "./assets/images/icon-search.svg";
import iconLocation from "./assets/images/icon-location.svg";
import iconCompany from "./assets/images/icon-company.svg";
import iconTwitter from "./assets/images/icon-twitter.svg";
import iconWebsite from "./assets/images/icon-website.svg";

function App() {
  const [iconMode, setIconMode] = useState(iconSun);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    function getDefaultTheme() {
      let theme = "light";

      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        theme = "dark";
      }

      if (localStorage.getItem("theme") === "dark") {
        theme = "dark";
      }

      if (localStorage.getItem("theme") === "light") {
        theme = "light";
      }

      setTheme(theme);
    }
    getDefaultTheme();
  }, [theme]);

  function switchTheme() {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }

  return (
    <div className="container" data-theme={theme}>
      <header className="header">
        <div className="header__logo">devfinder</div>
        <div className="header__mode" onClick={switchTheme}>
          <p>{theme === "dark" ? "LIGHT" : "DARK"}</p>
          <img
            src={theme === "dark" ? iconSun : iconMoon}
            alt=""
            aria-hidden="true"
          />
        </div>
      </header>
      <main className="main">
        <div className="search">
          <img src={iconSearch} alt="" aria-hidden="true" />
          <input
            placeholder="Search GitHub username..."
            type="text"
            id="search-input"
          />
          <button>Search</button>
        </div>
        <div className="content">
          <div className="avatar">
            <img src="" alt="" aria-hidden="true" />
          </div>
          <div className="user-general">
            <h1 className="h1-like">The Octocat</h1>
            <p className="username">@octocat</p>
            <p className="date-join">Joined 25 Jan 2011</p>
          </div>
          <div className="user-detail">
            <p className="des">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
              odio. Quisque volutpat mattis eros.
            </p>
            <ul className="stats">
              <li className="stat">
                <p>Repos</p>
                <p>8</p>
              </li>
              <li className="stat">
                <p>Followers</p>
                <p>39883</p>
              </li>
              <li className="stat">
                <p>Following</p>
                <p>8</p>
              </li>
            </ul>
            <ul className="address">
              <li>
                <img src={iconLocation} alt="" aria-hidden="true" />
                <p>San Francisco</p>
              </li>
              <li>
                <img src={iconWebsite} alt="" aria-hidden="true" />
                <p>https://github.blog</p>
              </li>
              <li>
                <img src={iconTwitter} alt="" aria-hidden="true" />
                <p>Not Available</p>
              </li>
              <li>
                <img src={iconCompany} alt="" aria-hidden="true" />
                <p>@github</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
