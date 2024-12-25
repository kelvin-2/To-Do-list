const menuData={
    coffee:[
        {name:'Espresso',price:20.00},
        {name:'Cappuccino',price:15.00},
        {name:'Double Espresso',price:16.00},
        {name:'Latte',price:16.00},
        {name:'Mocha',price:17.00},
        {name:'Americano',price:25.00},
    ],
    nonCoffee:[
        {name:'Smoothie',price:10.00},
        {name:'Hot Chocolate',price:12.00},
        {name:'Fresh Juice',price:15.00},
        {name:'Fresh Lemonade',price:14.00},
        {name:'Milkshake',price:25}
    ],
    tea:[
        {name:'Lemon Tea',price:10.00},
        {name:'Earl Grey Tea',price:12.00},
        {name:'Jasmine',price :15.00},
    ],
    desserts:[
        {name:'Cake',price:15.00},
        {name:'Croissant',price:12.00},
        {name:'Lemon Pie',price:10.00},
        {name:'Croissant',price:14.00},
    ],
    food:[
        {name:'Sandwich',price:15.00},
        {name:'Salad',price:12.00},
        {name:'Brownies',price:10.00},
        {name:'Chocolate Muffin',price:14.00},
        {name:'Burger',price:30.00}
    ]
}

export function loadMenu() {
    const content = document.querySelector('#content');
    content.innerHTML = '';
    content.className = 'menu-page';

    const headerDiv = document.createElement("div");
    headerDiv.className = "header";
    
    const sectionTitle = document.createElement("h1");
    sectionTitle.className = "section-title";
    sectionTitle.textContent = "Our Menu";
    
    const cafeNameDiv = document.createElement("div"); 
    cafeNameDiv.className = "cafe-name";
    cafeNameDiv.textContent = "Grounded Cafe";
    
    headerDiv.appendChild(sectionTitle);
    headerDiv.appendChild(cafeNameDiv);
    content.appendChild(headerDiv);

    const menuSection = document.createElement("div");
    menuSection.className = "menu-section";

    // Create left and right columns
    const leftColumn = document.createElement("div");
    leftColumn.className = "menu-column";
    
    const divider = document.createElement("div");
    divider.className = "menu-divider";
    
    const rightColumn = document.createElement("div");
    rightColumn.className = "menu-column";

    const categoryEmojis = {
        coffee: "☕",
        nonCoffee: "🥤",
        tea: "🫖",
        desserts: "🍰",
        food: "🍽️"
    };

    // Split menu items between columns
    const categories = Object.entries(menuData);
    const midPoint = Math.ceil(categories.length / 2);

    categories.forEach((entry, index) => {
        const [category, items] = entry;
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "menu-category";
        
        const categoryTitle = document.createElement("h2");
        const emoji = categoryEmojis[category] || "";
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
        categoryTitle.textContent = `${emoji} ${formattedCategory}`;
        
        const itemsList = document.createElement("div");
        itemsList.className = "menu-items";

        items.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "menu-item";
            
            const itemName = document.createElement("span");
            itemName.className = "item-name";
            itemName.textContent = item.name;

            const itemPrice = document.createElement("span");
            itemPrice.className = "item-price";
            itemPrice.textContent = `R${item.price.toFixed(2)}`;

            itemDiv.appendChild(itemName);
            itemDiv.appendChild(itemPrice);
            itemsList.appendChild(itemDiv);
        });

        categoryDiv.appendChild(categoryTitle);
        categoryDiv.appendChild(itemsList);
        
        // Add to appropriate column
        if (index < midPoint) {
            leftColumn.appendChild(categoryDiv);
        } else {
            rightColumn.appendChild(categoryDiv);
        }
    });

    menuSection.appendChild(leftColumn);
    menuSection.appendChild(divider);
    menuSection.appendChild(rightColumn);
    content.appendChild(menuSection);
}