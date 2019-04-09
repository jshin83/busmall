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
function handleClick(event) {
  clickLimit -= 1;
  //pass the element clicked and update click
  updateClickCount(event.target.title);
  if (clickLimit === 0) {
    divWithImages.removeEventListener('click', handleClick);
    createClickList();
    drawChart();
  }
  //updateClickCount(event.target.alt);
  getThreeImages();
}

//helper function to grab number from image title
function updateClickCount(clickedName) {
  let index = clickedName.substring(clickedName.indexOf(' '), clickedName.length);
  allProducts[Number(index.trim())].clicks += 1;
}

//function to create list of clicks
function createClickList() {
  //3 votes for the Banana Slicer
  let ul = document.createElement('ul');
  for (let i = 0; i < allProducts.length; i++) {
    //populate data arrays for chart
    titles[i] = allProducts[i].name;
    votes[i] = allProducts[i].clicks;
    let li = document.createElement('li');
    li.innerText = `${allProducts[i].clicks} vote(s) for the ${allProducts[i].name}.`;
    ul.appendChild(li);
  }
  divWithImages.appendChild(ul);
}
//createCanvas();
//function to create canvas
/*function createCanvas() {
  canvas = document.createElement('canvas');
  canvas.height = 700;
  canvas.width = 1200;
  canvas.style.backgroundColor = '#ffffff';
  //drawChart(ctx);
  //canvas.appendChild(ctx);
  document.body.appendChild(canvas);
}*/

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
            /*max: 10,
            min: 0,
            stepSize: 1.0*/
            beginAtZero: true,
            stepSize: 1.0
          }
        }]
      }
    },
  });
}

//group all functions I want at page load
function startPage() {
  clickLimit = 25;
  getThreeImages();
  //add event listener
  divWithImages.addEventListener('click', handleClick);
}

startPage();
