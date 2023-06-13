"use strict"

console.log(`Loading...`)

/* Variables - what elements are we interacting with on the site                   */

// Radio Buttons:
const searchByCategoryRadioBtn = document.getElementById("searchByCategoryRadioBtn");
const viewAllRadioBtn = document.getElementById("viewAllRadioBtn");

// Dropdowns:
const searchByCategoryDropdown = document.getElementById("searchByCategoryDropdown");

// Product Cards:
const productCard = document.getElementById("productCard");

// Data:
let categories = []; // Stores the fetched categories
let products = []; // Stores the fetched products


/*__________________________________________________________________________________*/


/* When the window loads...                                                         */

window.onload = function() {

  // Hide Items:
  hideSearchByCategoryDropdown(); // 'Search By Category' Dropdown
  hideProductCard();

  // User Action & Radio Buttons:
  searchByCategoryRadioBtn.onchange = showSearchByCategoryDropdown; // When 'SearchByCategory' radio button is selected/"changed"...
  viewAllRadioBtn.onchange = hideSearchByCategoryDropdown; // When 'ViewAll' radio button is selected/"changed"...

  // User Action & Dropdowns:
  searchByCategoryDropdown.onchange = function() {
    const selectedCategoryId = searchByCategoryDropdown.value;
    const filteredProducts = products.filter(product => product.categoryId === selectedCategoryId);
    populateProducts(filteredProducts);
  }

  // Fetch Data & Add Information To Elements:
  fetchDataFromAPIOne();
  fetchDataFromAPITwo();
  
  console.log(`The window loaded.`);
}


/*__________________________________________________________________________________*/

/* Function - Hide & Show Elements HERE                                           */

// The 'Search By Category' Dropdown:
function hideSearchByCategoryDropdown() {
  searchByCategoryDropdown.style.display = "none"; // Hide
}

function showSearchByCategoryDropdown() {
  searchByCategoryDropdown.style.display = "block"; // Show
}


// The 'Product Card':
function hideProductCard() {
  productCard.style.display = "none"; // Hide 
}

function showProductCard() {
  productCard.style.display = "block"; // Show
}


/*__________________________________________________________________________________*/

/* Function - Adding Data/Information to Elements HERE */


// Fetching the Data from the first API: Categories
function fetchDataFromAPIOne() {
  fetch('http://localhost:8081/api/categories')
    .then(response => response.json())
    .then(data => {
      console.log(data); // data has been fetched.
      categories = data; // Store the fetched categories
      addCategoriesToCategoryDropdown();
    });
}


// Fetching the Data from the second API: Products
function fetchDataFromAPITwo() {
  fetch('http://localhost:8081/api/products')
    .then(response => response.json())
    .then(data => {
      console.log(data); // data has been fetched.
      products = data; // Store the fetched products
    });
}

// Adding the fetched Data (Category Names) to the Category Dropdown:
function addCategoriesToCategoryDropdown() {
  categories.forEach(category => {
    let newCategoryName = new Option(category.name, category.id);
    searchByCategoryDropdown.appendChild(newCategoryName);
  });
  console.log(`All Categories are in the dropdown`);
}


// Adding the fetched Data (Product Names) to the Product Type Dropdown:
function populatePrroductCards(products) {
  productTypeDropdown.innerHTML = ""; // Clear existing options
  products.forEach(product => {
    let newProductType = new Option(product.name, product.id);
    
    productTypeDropdown.appendChild(newProductType);
  });
  console.log(`Product types are in the dropdown`);
}
