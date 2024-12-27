const container = document.getElementById("container");
const dashboard = document.createElement("div");
dashboard.className = "dashboard";

// Create the main content area
export const mainContent = document.createElement("div");
mainContent.className = "mainContent"; // Use mainContent here

// Title
const title = document.createElement("h1");
title.textContent = "Dashboard";

const dashitems = ["Home", "Tasks", "Projects", "Schedules"];

export function loadHome() {
    // Create the left-side dashboard (This part was being duplicated)
    const nav = document.createElement("nav");
    nav.className = "nav";

    const ul = document.createElement("ul");

    // Loop over the elements for navigation items
    dashitems.forEach(item => {
        const li = document.createElement("li");
        const button = document.createElement("button"); 
        button.textContent = item;
        li.appendChild(button);
        ul.appendChild(li);
    });

    // Add title and navigation to the dashboard
    dashboard.appendChild(title);
    nav.appendChild(ul);
    dashboard.appendChild(nav);

    // Append the dashboard and main content to the container
    container.appendChild(dashboard);
    container.appendChild(mainContent); // Corrected this line

    
}