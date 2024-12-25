export function loadHome() {
    const mainContent = document.getElementById("content");

    // Create a container for the intro
    const introContainer = document.createElement('div');
    introContainer.style.textAlign = 'center';
    introContainer.style.padding = '50px 20px';
    introContainer.style.color = 'white';
    introContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    introContainer.style.borderRadius = '10px';
    introContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
    introContainer.style.margin = '50px auto';
    introContainer.style.width = '80%';

    // Create a title
    const title = document.createElement('h1');
    title.textContent = 'Welcome to Grounded Cafe!';
    title.style.fontFamily = "cursive";
    title.style.fontSize = '3rem';
    title.style.color = '#EDF2F4'; // Gold color
    title.style.marginBottom = '20px';

    // Create a tagline
    const tagline = document.createElement('p');
    tagline.textContent = 'Where every cup tells a story.';
    tagline.style.fontFamily = "'Roboto', sans-serif";
    tagline.style.fontSize = '1.5rem';
    tagline.style.fontStyle = 'italic';
    tagline.style.marginBottom = '30px';

    // Create a description
    const description = document.createElement('p');
    description.textContent =
        "Step inside and let the aroma of freshly brewed coffee and warm pastries wrap around you. Whether you're here for a quick pick-me-up or a cozy hangout, we've got the perfect blend for every moment.";
    description.style.fontFamily = "'Roboto', sans-serif";
    description.style.fontSize = '1.2rem';
    description.style.lineHeight = '1.8';
    description.style.marginBottom = '20px';

    // Add elements to the container
    introContainer.appendChild(title);
    introContainer.appendChild(tagline);
    introContainer.appendChild(description);

    // Add the container to the main content
    mainContent.appendChild(introContainer);
}
