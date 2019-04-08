'use strict';

//global variables
var allProducts = [];
var threeImages = ['', '', ''];
var tempImage = '';
var divWithImages = document.getElementById('images');
var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');

function ProductPic(name) {
  this.filepath = `images/${name}.jpg`;
  this.name = name;
  this.views = 0;
  allProducts.push(this);
}

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
  var random = Math.floor(Math.random() * allProducts.length);

  /*while (threeImages.includes(allProducts[random].name) === true && (pic1.alt === allProducts[random].name || pic2.alt === allProducts[random].name || pic3.alt === allProducts[random].name)) {*/
  while (pic1.alt === allProducts[random].name || pic2.alt === allProducts[random].name || pic3.alt === allProducts[random].name) {
    random = Math.floor(Math.random() * allProducts.length);
    console.log('duplicate!');
  }
  allProducts[random].views += 1;
  pic.src = allProducts[random].filepath;
  pic.alt = allProducts[random].name;
  pic.title = allProducts[random].title;
  return pic;
  //event.preventDefault();
  //check with three images
  /*var random = Math.floor(Math.random() * allProducts.length);
  console.log(random);
  for (let i = 0; i < threeImages.length;i ++) {
    let pic = 'pic' + (i + 1);
    while (pic1.alt === allProducts[random].name || pic2.alt === allProducts[random].name || pic3.alt === allProducts[random].name) {
      random = Math.floor(Math.random() * allProducts.length);
      console.log('duplicate!');
    }
    allProducts[random].views += 1;
    [pic]['src'] = allProducts[random].filepath;
    [pic]['alt'] = allProducts[random].name;
    [pic]['title'] = allProducts[random].title;
  }
  */

  /*for (let i = 0; i < 3; i++) {
    while(threeImages.includes(tempImage) && tempImage === pic1.alt || threeImages.includes(tempImage) && tempImage === pic2.alt || threeImages.includes(tempImage) && tempImage === pic3.alt) {
      random = Math.floor(Math.random() * allProducts.length);
      tempImage = allProducts[random].name;
    }
    threeImages[i] = tempImage;
    ['pic' + (i + 1)].alt = tempImage;
  }*/
}

function getThreeImages() {
  showRandomPic(pic1);
  showRandomPic(pic2);
  showRandomPic(pic3);
  threeImages = [pic1.alt, pic2.alt, pic3.alt];
}

getThreeImages();
/*function getFileName(fullFileName) {
  return fullFileName.substring(7, fullFileName.length - 4);
}*/
