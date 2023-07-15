const burger_box = document.getElementById("burger-box");
const url = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';

let food_items = [];

// api call
async function fetchData() {
    // console.log("api called")
    try {
      const response = await fetch(url); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
    //   console.log(data); // Do something with the retrieved data
      food_items = data;
    } catch (error) {
      console.log('Error:', error.message);
    }
  }
  
function createTable(data) {
    // console.log("table called");
        // make tables here
        // loop here
        burger_box.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            burg = data[i];
            // console.log(burg);
            burger_box.innerHTML += `
                <div class="burger-chart">
                    <div>
                        <img src='${burg.imgSrc}' width="273" alt="">
                        <div id="burger-details" class="display-flex-row">
                            <div>
                                <p>${burg.name}</p>
                                <p>$${burg.price}/-</p>
                            </div>
                            <div>
                                <img src="Images/plus (1) 1.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
}

function callMenu() {
    console.log("Step 1 ---> getMenu called")
    setTimeout(() => {
        // console.log("timeout called")
        if (!sessionStorage.getItem('pageOpened')) {
            sessionStorage.setItem('pageOpened', 'true');
            window.location.href = 'menu.html';
        }
        // console.log("menu")
            createTable(food_items);
    }, 5000); // Delay of 5000 milliseconds (5 seconds)

};

// callMenu();
fetchData();
      
  // take order 

  function chooseRandomItems(arr, numItems) {
    if (numItems > arr.length) {
      throw new Error("Cannot choose more items than the array contains.");
    }
    
    const randomItems = [];
    const arrayCopy = arr.slice(); // Make a copy of the original array
    
    for (let i = 0; i < numItems; i++) {
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);
      const randomItem = arrayCopy.splice(randomIndex, 1)[0];
      randomItems.push(randomItem);
    }
    
    return randomItems;
  }
  

  function takeOrder() {
    console.log("Step 2 ---> takeOrder called");
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = chooseRandomItems(food_items, 3);
        // ramdomly choose 3 burgers
        resolve(data);
        console.log(data);
      }, 2500);
    });
  }

//   takeOrder();

  // orderPrep

  function orderPrep() {
    console.log("Step 3 ---> orderPrep called");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }
  async function processOrder() {
    const result = await orderPrep();
    console.log(result); // { order_status: true, paid: false }
  }
  
//   processOrder();

  
  
  // payOrder

  function payment() {
    console.log("Step 4 ---> payOrder called");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({order_status:true, paid:true});
        }, 1000);
    });
  }
  async function payOrder() {
    const result = await payment();
    console.log(result);
  }
//   payOrder();


  // thankyouFnc

function thankyouFnc() {
    console.log("Step 5 ---> thankyouFnc called");
    alert("thankyou for eating with us today!")
}

callMenu();
async function process() {
        let ans2 = await takeOrder();
        let ans3 = await processOrder();
        let ans4 = await payOrder();
        let ans5 = await thankyouFnc();
}

setTimeout(() => {
    process();
}, 6000);
