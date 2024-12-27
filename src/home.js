const container = document.getElementById("container");
const dashboard = document.createElement("div");
dashboard.className = "dashboard";

export const mainContent = document.createElement("div");
mainContent.className = "mainContent";

const dashitems = [
    { name: "Home", icon: "🏠" },
    { name: "Tasks", icon: "📋" },
    { name: "Projects", icon: "📁" },
    { name: "Schedules", icon: "📅" }
];
//removes all children in the mainContent
function clearMainContent() {
    while (mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild);
    }
}

function setActiveButton(buttonElement) {
    // Remove active class from all buttons
    document.querySelectorAll('.nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    // Add active class to clicked button
    buttonElement.classList.add('active');
}

function createContentHeader(title, description) {
    const header = document.createElement('div');
    header.className = 'content-header';
    
    const h2 = document.createElement('h2');
    h2.textContent = title;
    
    const p = document.createElement('p');
    p.textContent = description;
    
    header.appendChild(h2);
    header.appendChild(p);
    return header;
}

function showLoading() {
    clearMainContent();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    mainContent.appendChild(loadingDiv);
}


async function handleNavigation(e) {
    if (e.target.tagName !== 'BUTTON') return;
    
    const buttonText = e.target.textContent.replace(/[^\w\s]/g, '').trim().toLowerCase();
    setActiveButton(e.target);
    showLoading();

    try {
        switch (buttonText) {
            case 'home':
                clearMainContent();
                const homeHeader = createContentHeader(
                    'Welcome to Dashboard',
                    'Manage your tasks, projects, and schedules efficiently'
                );
                mainContent.appendChild(homeHeader);
                // Add your home content here
                break;

            case 'tasks':
                clearMainContent();
                const tasksHeader = createContentHeader(
                    'Tasks Manager',
                    'Create, organize, and track your tasks'
                );
                mainContent.appendChild(tasksHeader);
                await import('./Task.js').then(module => {
                    module.loadTask();
                });
                break;

            case 'projects':
                clearMainContent();
                const projectsHeader = createContentHeader(
                    'Projects Overview',
                    'Track and manage your ongoing projects'
                );
                mainContent.appendChild(projectsHeader);
                // Add your projects content here
                break;

            case 'schedules':
                clearMainContent();
                const schedulesHeader = createContentHeader(
                    'Schedule Planning',
                    'Organize your daily, weekly, and monthly schedules'
                );
                mainContent.appendChild(schedulesHeader);
                // Add your schedules content here
                break;
        }
    } catch (error) {
        console.error('Error loading content:', error);
        mainContent.innerHTML = `
            <div style="text-align: center; color: #dc3545; padding: 20px;">
                <h3>Error Loading Content</h3>
                <p>Please try again later</p>
            </div>
        `;
    }
}

export function loadHome() {
    // Create the dashboard
    const title = document.createElement("h1");
    title.textContent = "Dashboard";
    dashboard.appendChild(title);

    const nav = document.createElement("nav");
    nav.className = "nav";
    
    const ul = document.createElement("ul");
    
    dashitems.forEach(item => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.innerHTML = `${item.icon} ${item.name}`;
        if (item.name === 'Home') {
            button.classList.add('active');
        }
        li.appendChild(button);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    dashboard.appendChild(nav);

    // Set up navigation event handling
    nav.removeEventListener('click', handleNavigation); // Remove any existing handlers
    nav.addEventListener('click', handleNavigation);

    // Clear container before appending
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Append dashboard and main content
    container.appendChild(dashboard);
    container.appendChild(mainContent);

    // Load initial home content
    const homeHeader = createContentHeader(
        'Welcome to Dashboard',
        'Manage your tasks, projects, and schedules efficiently'
    );
    mainContent.appendChild(homeHeader);
}