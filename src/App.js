import React, { useState, useEffect } from "react";
import moment from "moment";
import classNames from "classnames";

import "./assets/scss/main.scss";
import iconMoon from "./assets/images/icon-moon.svg";
import iconSun from "./assets/images/icon-sun.svg";
import iconSearch from "./assets/images/icon-search.svg";
import iconLocation from "./assets/images/icon-location.svg";
import iconCompany from "./assets/images/icon-company.svg";
import iconTwitter from "./assets/images/icon-twitter.svg";
import iconWebsite from "./assets/images/icon-website.svg";

function App() {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("");
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const [user, setUser] = useState({
    login: "batman",
    name: "The Batman",
    company: "The Batman",
    location: "Gotham",
    blog: "https://thebatman.com",
    bio: "The man with a bat",
    twitter_username: "TheBatman",
    avatar_url: null,
    public_repos: 0,
    followers: 0,
    following: 0,
    created_at: "2011-01-25T18:44:36Z",
  });

  const NOT_AVAILABLE = "Not Available";
  const API_URL = "https://api.github.com/users/";
  const OCTOCAT = "octocat";

  async function getUsers(username = OCTOCAT) {
    try {
      let response = await fetch(API_URL + username);
      if (response.ok) {
        let result = await response.json();
        setUser(result);
        setIsUserNotFound(false);
      } else if (response.status === 404) {
        setIsUserNotFound(true);
      } else {
        throw new Error(response.status);
      }
    } catch (err) {
      console.log("ERROR: ", err.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

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
      } else {
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
      <div className="wrapper">
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
            <p
              className={classNames("error-text", {
                "display-error": isUserNotFound,
              })}
            >
              No result
            </p>
            <img src={iconSearch} alt="" aria-hidden="true" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getUsers(username);
                }
              }}
              placeholder="Search GitHub username..."
              type="text"
              id="search-input"
            />
            <button onClick={() => getUsers(username)}>Search</button>
          </div>
          <div className="content">
            <div className="avatar">
              <img src={user.avatar_url} alt="" aria-hidden="true" />
            </div>
            <div className="user-general">
              <h1 className="h1-like">{user.name || user.login}</h1>
              <p className="username">@{user.login}</p>
              <p className="date-join">
                Joined {moment(user.created_at).format("DD MMM YYYY")}
              </p>
            </div>
            <div className="user-detail">
              <p className={classNames("des", { "not-available": !user.bio })}>
                {user.bio || "This profile has no bio"}
              </p>
              <ul className="stats">
                <li className="stat">
                  <p>Repos</p>
                  <p>{user.public_repos}</p>
                </li>
                <li className="stat">
                  <p>Followers</p>
                  <p>{user.followers}</p>
                </li>
                <li className="stat">
                  <p>Following</p>
                  <p>{user.following}</p>
                </li>
              </ul>
              <ul className="address">
                <li className={classNames({ "not-available": !user.location })}>
                  <img src={iconLocation} alt="" aria-hidden="true" />
                  <p>{user.location || NOT_AVAILABLE}</p>
                </li>
                <li className={classNames({ "not-available": !user.blog })}>
                  <img src={iconWebsite} alt="" aria-hidden="true" />
                  <p>{user.blog || NOT_AVAILABLE}</p>
                </li>
                <li
                  className={classNames({
                    "not-available": !user.twitter_username,
                  })}
                >
                  <img src={iconTwitter} alt="" aria-hidden="true" />
                  <p>{user.twitter_username || NOT_AVAILABLE}</p>
                </li>
                <li className={classNames({ "not-available": !user.company })}>
                  <img src={iconCompany} alt="" aria-hidden="true" />
                  <p>{user.company || NOT_AVAILABLE}</p>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
