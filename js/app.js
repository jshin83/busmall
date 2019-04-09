'use strict';

//global variables
var allProducts = [];
var threeImages = ['', '', ''];
var divWithImages = document.getElementById('images');
var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');
var clickLimit;

function ProductPic(name) {
  this.filepath = `images/${name}.jpg`;
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

//instantiate objects
new ProductPic('bag');
new ProductPic('banana');
new ProductPic('bathroom');
new ProductPic('boots');
new ProductPic('breakfast');
new ProductPic('bubblegum');
new ProductPic('chair');
new ProductPic('cthulhu');
new ProductPic('dog-duck');
new ProductPic('dragon');
new ProductPic('pen');
new ProductPic('pet-sweep');
new ProductPic('scissors');
new ProductPic('shark');
new ProductPic('sweep');
new ProductPic('tauntaun');
new ProductPic('unicorn');
new ProductPic('usb');
new ProductPic('water-can');
new ProductPic('wine-glass');

function showRandomPic(pic) {
  var random = getRandom();
  console.log('three images include: ' + threeImages);
  console.log(threeImages.includes(allProducts[random].name));
  //prevents duplicates from previous or what changes on the page
  while (threeImages.includes(allProducts[random].name) === true || pic1.alt === allProducts[random].name || pic2.alt === allProducts[random].name || pic3.alt === allProducts[random].name) {
    random = getRandom();
    console.log('duplicate!');
  }
  allProducts[random].views += 1;
  pic.src = allProducts[random].filepath;
  pic.alt = allProducts[random].name;
  pic.title = allProducts[random].name;
  return pic;
}

function getRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

function getThreeImages() {
  showRandomPic(pic1);
  showRandomPic(pic2);
  showRandomPic(pic3);
  threeImages = [pic1.alt, pic2.alt, pic3.alt];
}

getThreeImages();


//click handler - calls helper functions, but removes handler when limit reached
function handleClick(event) {
  if (clickLimit === 0) {
    divWithImages.removeEventListener('click', handleClick);
    createClickList();
  }
  //pass the element clicked and update click
  updateClickCount(event.target.alt);
  getThreeImages();
  clickLimit -= 1;
}

//helper function - update click count for one of three image clicked
function updateClickCount(clickedName) {
  console.log(clickedName + ' in update click');
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === clickedName) {
      allProducts[i].clicks += 1;
    }
  }
}

//function to create list of clicks
function createClickList() {
  //3 votes for the Banana Slicer
  let ul = document.createElement('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.innerText = `${allProducts[i].clicks} vote(s) for the ${allProducts[i].name}.`;
    ul.appendChild(li);
  }
  document.body.appendChild(ul);
}

function startPage() {
  clickLimit = 24;
  //add event listener
  divWithImages.addEventListener('click', handleClick);
}

startPage();
