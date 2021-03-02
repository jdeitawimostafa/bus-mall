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


const clickCounter = 25;

function product(name) {
    this.name = name;
    this.image = `./images/${name}`;
    this.clicks = 0; 
    this.shown = 0;
    product.all.push(this);
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



function getProducts(){
  const data = localStorage.getItem('product');
  if(data){
    renderNewProduct();
  }
}

function renderNewProduct (){
    while(leftIndex === middleIdnex || leftIndex === rightIndex || rightIndex === middleIdnex || 
        newArr.includes(leftIndex) || newArr.includes(middleIdnex) || 
    newArr.includes(rightIndex)){
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

    product.all[leftIndex].shown++;
    product.all[middleIdnex].shown++;
    product.all[rightIndex].shown++;

const ul = document.getElementById('lists');
function listData(){
  for( let i = 0; i < product.all.length;i++){
    const liElement = document.createElement('li');
    ul.appendChild(liElement);
    liElement.textContent = `${product.all[i].name} has a ${product.all[i].clicks} votes and it's shown ${product.all[i].shown} times.`
  }
}
console.log(listData);

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
            renderNewProduct();
            console.log(product.all);
            
        }
      }
      else{
        const button = document.getElementById('button');
          button.style.display = 'inline';
          button.addEventListener('click' , listData);
        
       
       
        
      }
    } else{
      localStorage.setItem('product',JSON.stringify(product.all));
        renderChart();
    }
});
getProducts();

// // button
renderNewProduct();
// const button = document.getElementById('button');
// button.style.visibility= 'hidden';
// button.addEventListener('submit',function(event){


// });


console.log(newArr);
console.log(product.all)

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


