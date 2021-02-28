'use strict';

let productsArr = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg',
'bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg',
'scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg',
'wine-glass.jpg'];

let productsName = ['bag','banana','bathroom','boots','breakfast',
'bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep',
'scissors','shark.jpg','sweep.png','tauntaun','unicorn','usb','water-can',
'wine-glass']

function randomNumber( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }
  

const products = document.getElementById('products');
const leftImage = document.getElementById('leftImage');
const middleImage = document.getElementById('middleImage');
const rightImage = document.getElementById('rightImage');

let leftProductIndex = 0;
let middleProductIndex = 0;
let rightProductIndex = 0;
const clickCounter = 25;

function product(name) {
    this.name = name;
    this.image = `./images/${name}`;
    this.clicks = 0; 
    this.shown = 0;
    product.all.push(this);

}

product.all = []; 
let counter = 0;

for (let i = 0; i<productsArr.length-1;i++){
    new product(productsArr[i]);
}

function renderNewProduct (){
    let leftIndex = randomNumber( 0,product.all.length-1 );
    leftImage.src = product.all[leftIndex].image;
    leftImage.alt = product.all[leftIndex].image;
     leftProductIndex = leftIndex;

     let middleIdnex;
     do{
     middleIdnex = randomNumber(0,product.all.length-1);
     } while(middleIdnex === leftIndex);
    
     middleImage.src = product.all[middleIdnex].image;
     middleImage.alt = product.all[middleIdnex].name;
     middleProductIndex = middleIdnex;

    let rightIndex;
    do {
        rightIndex = randomNumber(0,product.all.length-1);
    } while(leftIndex === rightIndex || middleIdnex === rightIndex)


    
     rightImage.src = product.all[rightIndex].image;
     rightImage.alt = product.all[rightIndex].name;
     rightProductIndex = rightIndex;

    product.all[leftIndex].shown++;
    product.all[middleIdnex].shown++;
    product.all[rightIndex].shown++;
}


products.addEventListener('click', function (event){
    if(counter < clickCounter ) {
        const clickedElement = event.target;
        console.log(clickedElement);
        if(clickedElement.id === 'leftImage' || clickedElement.id === 'middleImage' || clickedElement.id === 'rightImage') {
            if(clickedElement.id === 'leftImage'){
                product.all[leftProductIndex].clicks++;
            }
            if(clickedElement.id === 'middleImage'){
                product.all[middleProductIndex].clicks++;
            }
            if(clickedElement.id === 'rightImage'){
                product.all[rightProductIndex].clicks++;
            }                
            

            counter++;
            renderNewProduct();

            console.log(product.all);
        }
    }
});
// // button
// const button = document.getElementById('button');
// button.style.visibility= 'hidden';
// button.addEventListener('submit',function(event){


// });

renderNewProduct();


