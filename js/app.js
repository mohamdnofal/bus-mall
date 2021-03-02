'use strict';

let mallArray = [
    'bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg',
    'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg',
    'cthulhu.jpg', 'dogduck.jpg', 'dragon.jpg', 'pen.jpg',
    'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png',
    'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'
];

const imgSection = document.getElementById('imgSection');
const leftImg = document.getElementById('leftImg');
const rightImg = document.getElementById('rightImg');
const middleImg = document.getElementById('middleImg');

let leftMallPicture = 0;
let rightMallPicture = 0;
let middleMallPicture = 0;
const clickCounter = 25;

function mall(name) {
    this.name = name;
    this.img = `./img/${name}`;
    this.clicks = 0;
    this.shown = 0;
    mall.all.push(this);
}

mall.all = [];
mall.counter = 0;

for (let i = 0; i < mallArray.length; i++) {
    new mall(mallArray[i]);
}

function renderNewMall() {
    let leftPicture = randomNumber(0, mall.all.length - 1);
    leftImg.src = mall.all[leftPicture].img;
    leftImg.alt = mall.all[leftPicture].name;
    leftMallPicture = leftPicture;

    let rightPicture;
    do {
        rightPicture = randomNumber(0, mall.all.length - 1);
    } while (leftPicture === rightPicture);

    rightImg.src = mall.all[rightPicture].img;
    rightImg.alt = mall.all[rightPicture].name;
    rightMallPicture = rightPicture;


    let middlePicture;
    do {
        middlePicture = randomNumber(0, mall.all.length - 1);
    }  while (rightPicture === middlePicture || leftPicture === middlePicture);


    middleImg.src = mall.all[middlePicture].img;
    middleImg.alt = mall.all[middlePicture].name;
    middleMallPicture = middlePicture;

    mall.all[leftPicture].shown++;
    mall.all[rightPicture].shown++;
    mall.all[middlePicture].shown++;
    

}

function handelClick(event) {

    if (mall.counter < clickCounter) {
        const clickedElement = event.target;
        if (clickedElement.id === 'leftImg' || clickedElement.id === 'rightImg' || clickedElement.id === 'middleImg') {
            if (clickedElement.id === 'leftImg') {
                mall.all[leftMallPicture].clicks++;
            }

            if (clickedElement.id === 'rightImg') {
                mall.all[rightMallPicture].clicks++;
            }
            if (clickedElement.id === 'middleImg') {
                mall.all[middleMallPicture].clicks++;
            }
            
            mall.counter++;
            if (mall.counter === clickCounter) {
                const parentElement = document.getElementById('result');
                const button = document.createElement('button');
                parentElement.appendChild(button);
                button.innerText = 'View Results';
                button.addEventListener('click', function() {
                    button.innerText = 'Reset';
                    button.onclick = function() {
                        location.reload();
                    };
                    const ulElement = document.createElement('ul');
                    parentElement.appendChild(ulElement);

                    for (let i = 0; i < mall.all.length; i++) {
                        const liElement = document.createElement('li');
                        ulElement.appendChild(liElement);
                        liElement.textContent = `${mall.all[i].name}  had  ${mall.all[i].clicks}  votes, and it's appeared  ${mall.all[i].shown} times.`;
                    }
                    
                });
            }
            renderNewMall();
            
            console.log(mall.all);
        }
    }else {
      localStorage.setItem( 'mall', JSON.stringify( mall.all ) );
        renderChart();
      }
}
imgSection.addEventListener('click', handelClick);


// // Helper function
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
renderNewMall();

function renderChart() {

    let nameArray = [];
    let clicksArray = [];
    let showArray = [];
  
    for(let i = 0; i < mall.all.length; i++) {
      nameArray.push(mall.all[i].name);
      clicksArray.push(mall.all[i].clicks);
      showArray.push(mall.all[i].shown);
    }
  
    let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
    new Chart( ctx, {
      type: 'bar',
      data: {
        labels: nameArray,
        datasets: [
          {
            label: '# of Votes',
            data: clicksArray,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3
          },
          {
            label: '# of shown',
            data: showArray,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)' ],
            borderColor: [
              'rgba(255, 99, 132, 1)'],
            borderWidth: 3
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
  function getData() {
    const data = localStorage.getItem( 'mall' );
    if( data ) {
      const mallData = JSON.parse( data );
      mall.all = mallData;
    }
  }
  
  getData();
  
  