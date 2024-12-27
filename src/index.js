import './style.css';
import {loadHome} from './home.js';
import {loadTask} from './Task.js'

loadHome();

const nav=document.querySelector('nav');
nav.addEventListener('click',(e)=>{
    if(e.target.tagName!=='BUTTON') return;

    const content= document.getElementsByClassName('mainContent');
    content.innerHTML=' ';
    content.className = ''; // Clear any page-specific classes
    document.body.style.backgroundImage = 'none'; // Clear background image
    switch (e.target.textContent.toLowerCase()) {
        case 'home':
            loadHome();
            break;
        case 'tasks':
           // loadTask();
            break;
        case 'contact':
           // loadContact();
            break;
    }

});







