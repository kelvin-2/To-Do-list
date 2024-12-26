const container = document.getElementById("container");
const dashboard = document.createElement("div");
dashboard.className = "dashboard";
const mainContent = document.createElement("div");
dashboard.className = "mainContent";
//title
const title = document.createElement("h1");
title.textContent = "Dashboard";

const dashitems = ["Home", "Tasks", "Add Tasks", "Projects", "Schedules"];

export function loadHome() {
    // Dashboard on the left
    const dashboard = document.createElement("div");
    dashboard.className = "dashboard";

    const nav = document.createElement("nav");
    nav.className = "nav";

    const ul = document.createElement("ul");

    // Loop over the elements
    dashitems.forEach(item => {
        const li = document.createElement("li");
        const button = document.createElement("button"); 
        button.textContent = item;
        li.appendChild(button);
        ul.appendChild(li);
    });
    dashboard.appendChild(title)

    nav.appendChild(ul);
    dashboard.appendChild(nav);
    container.appendChild(dashboard);
    container.appendChild("mainContent");
}