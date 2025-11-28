
let productsContainer = [];

let productsSpace = document.getElementById('products');
let searchInput = document.getElementById('search');

const smartphonesURL = "https://dummyjson.com/products/category/smartphones";
const laptopsURL = "https://dummyjson.com/products/category/laptops";

// fetch smartphones Data
fetch(smartphonesURL)
    .then(response => response.json())
    .then(smartphonesData => {
        productsContainer = smartphonesData.products;

        return fetch(laptopsURL).then(response => response.json())
    })
    .then(laptopsData => {
        productsContainer = productsContainer.concat(laptopsData.products);

        // Display data function
        displayProducts(productsContainer)
    })
    .catch(error => {
        productsSpace.innerHTML = 
            `<p style="font-size: 18px; color: red;">
                Something is wrong!
                ${error}. try again later.
            </p>`;
        console.error("Error fetching data :", error.message);
    })

    // function to display Products
    function displayProducts(productsContainer) {
        productsSpace.innerHTML = "";
        if (productsContainer.length === 0) {
            productsSpace.innerHTML = `<p style="color=#fff; font-size: 20px;">No products found.</p>`;
            return;
        }

        productsContainer.forEach(product => {
            const card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <div class="card-badge"><i class="fa-solid fa-bolt"></i></div>
                    <img src="${product.thumbnail}" alt="${product.title}">
                </div>
                <div class="card-body">
                    <div class="card-title" title="${product.title}">${product.title}</div>
                        <div class="card-category">${product.category}</div>
                        <div class="card-footer">
                            <div class="price">$${product.price}</div>
                            <div class="add-btn"><i class="fa-regular fa-circle-check"></i></div>
                        </div>
                </div>
            `
            productsSpace.appendChild(card)
        })
    }

// search function 
searchInput.addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    const productFiltered = productsContainer.filter(p => 
        p.title.toLowerCase().includes(text)
    );
    displayProducts(productFiltered);
})

//swiper
let gallerySwiper = new Swiper(".myGallerySwiper", {
    slidesPerView: 1, 
    spaceBetween: 30, 
    loop: true,       
    autoplay: {      
        delay: 3500,  
        disableOnInteraction: false,
    },
    breakpoints: {
        640: { slidesPerView: 1.5, centeredSlides: true, },
        768: { slidesPerView: 2.5, centeredSlides: true, },
        1024: { slidesPerView: 3.5, centeredSlides: true, },
    },
    navigation: {
        nextEl: ".gallery-next",
        prevEl: ".gallery-prev",
    },
    pagination: {
        el: ".gallery-pagination",
        clickable: true, 
    },
});