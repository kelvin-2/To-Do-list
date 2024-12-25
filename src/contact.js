export function loadContact() {
    const content = document.querySelector("#content");
    content.innerHTML = ''; // Clear previous content
    content.className='contact-page';

    
    const contactDiv = document.createElement("div");
    contactDiv.className = "main-contact";
    contactDiv.style.textAlign = 'center';
    contactDiv.style.padding = '50px 20px';
    contactDiv.style.color = 'white';
    contactDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    contactDiv.style.borderRadius = '10px';
    contactDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
    contactDiv.style.margin = '50px auto';
    contactDiv.style.width = '80%';  

    // Create the heading
    const contactTitle = document.createElement("h1");
    contactTitle.className = "title";
    contactTitle.textContent = "Contact";

    // Create hours section
    const hoursDiv = document.createElement("div");
    hoursDiv.className = "hours";

    // Create an unordered list for the days and hours
    const ul = document.createElement("ul");
    const days = [
        'Monday    9:00 AM - 4:00 PM',
        'Tuesday    9:00 AM - 4:00 PM',
        'Wednesday    9:00 AM - 4:00 PM',
        'Thursday    9:00 AM - 4:00 PM',
        'Friday    9:00 AM - 4:00 PM',
        'Saturday    9:00 AM - 3:00 PM'
    ];

    // Loop through the days array and create list items
    days.forEach((day) => {
        const li = document.createElement("li");
        li.textContent = day;
        ul.appendChild(li);  // Append the list item to the unordered list
    });

    // Create the address section
    const addressDiv = document.createElement("div");
    addressDiv.className = "address";

    // Create the address element
    const address = document.createElement("address");

    // Add individual lines of the address
    const addressLine1 = document.createElement("p");
    addressLine1.textContent = "Grounded Cafe";
    address.appendChild(addressLine1);

    const addressLine2 = document.createElement("p");
    addressLine2.textContent = "123 Main Street, Suite 456";
    address.appendChild(addressLine2);

    const addressLine3 = document.createElement("p");
    addressLine3.textContent = "Cityville, State, 12345";
    address.appendChild(addressLine3);

    // Add phone link
    const phoneLink = document.createElement("a");
    phoneLink.textContent = "tel:+27 123 567 890";
    address.appendChild(phoneLink);

    // Append the address to the addressDiv
    addressDiv.appendChild(address);

    // Append the heading, addressDiv, and hoursDiv to the main contact div
    contactDiv.appendChild(contactTitle);
    contactDiv.appendChild(addressDiv);
    contactDiv.appendChild(hoursDiv);

    // Append the unordered list to the hours section
    hoursDiv.appendChild(ul);

    // Select the content container and append the contact section
    
    content.appendChild(contactDiv);
}
