'use strict';

let productsArr = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg',
'bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg',
'scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg',
'wine-glass.jpg'];

let nameArr = ['bag','banana','bathroom','boots','breakfast',
'bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep',
'scissors','shark','sweep','tauntaun','unicorn','usb','water-can',
'wine-glass']

function randomNumber( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }
  

const products = document.getElementById('products');
const leftImage = document.getElementById('leftImage');
const middleImage = document.getElementById('middleImage');
const rightImage = document.getElementById('rightImage');

// let leftProductIndex = 0;
// let middleProductIndex = 0;
// let rightProductIndex = 0;
const clickCounter = 25;

function product(name) {
    this.name = name;
    this.image = `./images/${name}`;
    this.clicks = 0; 
    this.shown = 0;
    product.all.push(this);
    // newArr.push(this.name);

}

product.all = [];
let leftIndex = randomNumber( 0,product.all.length-1 );
let middleIdnex = randomNumber( 0,product.all.length-1 );
let rightIndex = randomNumber( 0,product.all.length-1 );

 
let counter = 0;
let newArr = [leftIndex,middleIdnex,rightIndex];
for (let i = 0; i<productsArr.length-1;i++){
    new product(productsArr[i]);
}

function renderNewProduct (){
    while(leftIndex === middleIdnex || leftIndex === rightIndex || rightIndex === middleIdnex || newArr.includes(leftIndex,middleIdnex,rightIndex)){
     leftIndex = randomNumber( 0,product.all.length-1 );
     middleIdnex = randomNumber( 0,product.all.length-1 );
     rightIndex = randomNumber( 0,product.all.length-1 );
    }

    newArr[0]= leftIndex;
    newArr[1]=middleIdnex;
    newArr[2]=rightIndex;

    leftImage.src = product.all[leftIndex].image;
    leftImage.alt = product.all[leftIndex].name;

    middleImage.src = product.all[middleIdnex].image;
    middleImage.alt = product.all[middleIdnex].name;

    rightImage.src = product.all[rightIndex].image;
    rightImage.alt = product.all[rightIndex].name;


//     let leftIndex = randomNumber( 0,product.all.length-1 );
//     leftImage.src = product.all[leftIndex].image;
//     leftImage.alt = product.all[leftIndex].name;
//      leftProductIndex = leftIndex;
//      newArr.push(leftIndex);
//      do{
//        leftIndex = randomNumber(product.all.length-1)
//     }while(newArr.includes(leftIndex));
    
//      let middleIdnex;
//      do{
//      middleIdnex = randomNumber(0,product.all.length-1);
//      } while(middleIdnex === leftIndex);
    
//      middleImage.src = product.all[middleIdnex].image;
//      middleImage.alt = product.all[middleIdnex].name;
//      middleProductIndex = middleIdnex;
//      newArr.push(middleIdnex);
//      do{
//        middleIdnex = randomNumber(product.all.length-1)
//     }while(newArr.includes(leftIndex,middleIdnex,rightIndex));

//     let rightIndex;
//     do {
//         rightIndex = randomNumber(0,product.all.length-1);
//     } while(leftIndex === rightIndex || middleIdnex === rightIndex); 
//      rightImage.src = product.all[rightIndex].image;
//      rightImage.alt = product.all[rightIndex].name;
//      rightProductIndex = rightIndex;
//      newArr.push(rightIndex);

//     //  do{
//     //     randomNumber(product.all.length-1)
//     // }while(newArr.includes(leftIndex,middleIdnex,rightIndex));

//     product.all[leftIndex].shown++;
//     product.all[middleIdnex].shown++;
//     product.all[rightIndex].shown++;
}

renderNewProduct();

products.addEventListener('click', function (event){
    if(counter < clickCounter ) {
        const clickedElement = event.target;
        console.log(clickedElement);
        if(clickedElement.id === 'leftImage' || clickedElement.id === 'middleImage' || clickedElement.id === 'rightImage') {
            if(clickedElement.id === 'leftImage'){
                product.all[leftIndex].clicks++;
            }
            if(clickedElement.id === 'middleImage'){
                product.all[middleIdnex].clicks++;
            }
            if(clickedElement.id === 'rightImage'){
                product.all[rightIndex].clicks++;
            }       
            
            counter++;
            console.log('mostafa');
            renderNewProduct();
            // console.log(product.all);
        }
    } else{
        renderChart();
    }
});
// // button
// const button = document.getElementById('button');
// button.style.visibility= 'hidden';
// button.addEventListener('submit',function(event){


// });


console.log(newArr);

function renderChart(){
let clicksArr = [];
let shownArr = [];
let namesArr = [];
for(let i = 0; i < product.all.length;i++){
    clicksArr.push(product.all[i].clicks);
    shownArr.push(product.all[i].shown);
    namesArr.push(product.all[i].name)
}
console.log(clicksArr);
console.log(shownArr);
console.log(namesArr);
console.log(newArr);

let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
new Chart( ctx, {
  type: 'bar',
  data: {
    labels:nameArr,
    datasets: [
      {
        label: '# of clicks',
        data: clicksArr,
        backgroundColor: ['rgba(255, 99, 132, 0.2)','yellow','black','brown','green','blue','purple','gray',
        'pink','white','#ffaec0','#6ddccf','#e40017','#99bbad','#e36bae','#161d6f','#eb5e0b','orange','#ffcc29','#ef4f4f'],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 5
      },
      {
        label: '# of shown',
        data: shownArr,
        backgroundColor: ['rgba(255, 99, 132, 0.2)','#99bbad','yellow','#ef4f4f','brown','#ffaec0','blue','#ffcc29',
        '#161d6f','#eb5e0b','#ffaec0','purple','#e40017','black','#e36bae','pink','white','orange','gray','green'],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 5
      }
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
} );
}


