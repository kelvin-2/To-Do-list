import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {loadHome} from './home.js';
import {loadMenu} from './menu.js';
import {loadContact} from './contact.js';

loadHome();

const content = document.querySelector('#content');
const nav = document.querySelector('nav');

nav.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    
    // Reset content and background
    const content = document.querySelector('#content');
    content.innerHTML = '';
    content.className = ''; // Clear any page-specific classes
    document.body.style.backgroundImage = 'none'; // Clear background image
    
    switch (e.target.textContent.toLowerCase()) {
        case 'home':
            document.body.style.backgroundImage = "url('https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
            loadHome();
            break;
        case 'menu':
            loadMenu();
            break;
        case 'contact':
            loadContact();
            break;
    }
});