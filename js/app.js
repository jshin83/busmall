'use strict';

//global variables
var allProducts = [];
var threeImages = ['', '', ''];
var divWithImages = document.getElementById('images');
var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');
var clickLimit;
var canvas;
//arrays to hold data for charts
var titles = [];
var votes = [];

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
  //prevents duplicates from previous or what changes on the page
  while (threeImages.includes(allProducts[random].name) === true || pic1.alt === allProducts[random].name || pic2.alt === allProducts[random].name || pic3.alt === allProducts[random].name) {
    random = getRandom();
  }
  allProducts[random].views += 1;
  pic.src = allProducts[random].filepath;
  pic.alt = allProducts[random].name;
  pic.title = `${allProducts[random].name}, ${random}`;
  return pic;
}

//helper function to generate random number - constraint: product array length
function getRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

function getThreeImages() {
  showRandomPic(pic1);
  showRandomPic(pic2);
  showRandomPic(pic3);
  threeImages = [pic1.alt, pic2.alt, pic3.alt];
}

//click handler - calls helper functions, but removes handler when limit reached
function handleImageClick(event) {
  clickLimit -= 1;
  //pass the element clicked and update click
  updateClickCount(event.target.title);
  if (clickLimit === 0) {
    divWithImages.removeEventListener('click', handleImageClick);
    logClick();
    updateLocalStorage();
    drawChart();
  }
  //updateClickCount(event.target.alt);
  getThreeImages();
}

//helper function to store into local storage
function updateLocalStorage() {
  localStorage.setItem('votes', JSON.stringify(votes));
}

//helper function to grab number from image title
function updateClickCount(clickedName) {
  let index = clickedName.substring(clickedName.indexOf(' '), clickedName.length);
  allProducts[Number(index.trim())].clicks += 1;
}

//function to create list of clicks
function logClick() {
  //3 votes for the Banana Slicer
  for (let i = 0; i < allProducts.length; i++) {
    //populate data arrays for chart
    titles[i] = allProducts[i].name;
    votes[i] += allProducts[i].clicks;
  }
}

function drawChart() {
  canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var data = {
    labels: titles, // titles array we declared earlier
    datasets: [{
      label: '# of votes',
      data: votes, // votes array we declared earlier
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      hoverBackgroundColor: []
    }]
  };

  var voteChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1.0
          }
        }]
      }
    },
  });
}

//helper function to instantiate vote array to 0 values
function votesArrayToZero() {
  votes = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
}

//group all functions I want at page load
function startPage() {
  //check if localStorage exists, if it is populated, and if property votes don't exist
  if (localStorage && localStorage.length > 0 && localStorage.votes) {
    //grab localStorage, deserialize, push into chart
    votes = JSON.parse(localStorage.votes);
  } else {
    //instantiate votes to hold 0
    votesArrayToZero();
  }
  clickLimit = 25;
  getThreeImages();
  //add event listener
  divWithImages.addEventListener('click', handleImageClick);
  document.getElementById('refresh').addEventListener('click', function() {
    localStorage.clear();
    votesArrayToZero();
    drawChart();
  });
}


//document on load
startPage();
