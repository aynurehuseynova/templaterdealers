const myDiv = document.getElementById("product");
const pages = document.getElementById("pages");
const sortAZ = document.getElementById("sortAZ");
const sortZA = document.getElementById("sortZA");
const defaultPro = document.getElementById("defaultPro");
let page = 1;
let limit = 4;
let db;

async function getProducts() {
    const response = await axios.get(`https://655ddd779f1e1093c59a0b08.mockapi.io/basket?page=${page}&limit=${limit}`);
    const data = await response.data;

    db = data;
    db.map(item => {
        const box = document.createElement("div");
        box.className = 'boxDiv col-xl-3 col-lg-3 col-md-6 col-sm-6 h-100 ';
        box.innerHTML = `
            <img src="${item.image}" style="max-width: 250px;min-height: 100px;" alt="">
            <p style="color:white;">${item.name}</p>
            <p style="color:white;">${item.price}$</p>
            <p style="color:white;">${item.id}</p>
            <button class="wishlist" style="padding: 7px 13px 7px 13px;" onclick="wishlist(${item.id})"><i class="fa-solid fa-heart"></i>Wishlist</button>
            <button class="addtobasket" style=" background-color: #FFC515; border-color: #FFC515;padding: 6px 0px 6px 0px;" onclick="addToBasket(${item.id})"><i class="fa-solid fa-cart-shopping"></i>Add To Basket</button>
        `;
        myDiv.appendChild(box);
    });
    page++;
}

pages.addEventListener('click', getProducts);


function addToBasket(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(db.find(item => item.id == id));
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

function wishlist(id) {
    let box = JSON.parse(localStorage.getItem('box')) || [];
    box.push(db.find(item => item.id == id));
    localStorage.setItem('box', JSON.stringify(box));
    console.log(box);
}

window.onload = () => {
    getProducts()
}
// sort

function sortByNameAZ() {
    myDiv.innerHTML = "";
    axios
      .get("https://655ddd779f1e1093c59a0b08.mockapi.io/basket")
      .then((res) => {
        db = res.data;
        let sortedData = db.sort((a, b) => a.name.localeCompare(b.name));
        sortedData.map((item) => {
          const box = document.createElement("div");
          box.innerHTML = `
              <div style="border: 1px solid black; padding:10px; border-radius:10px">
              <img src=${item.image} alt="" style="width: 150px; height: auto;">
              <p>${item.name}</p>
              <p>${item.price} MANAT</p>
              <button onclick="addToCart(${item.id})" style="border: none; background-color: orange; color: white; padding: 3px 7px 3px 7px; border-radius: 8px;">Add to cart</button>
              <button onclick="addToWishlist(${item.id})" style="border: none; background-color: orange; color: white; padding: 3px 7px 3px 7px; border-radius: 8px;">Wishlist</button>
              </div>
              `;
              myDiv.appendChild(box);
        });
      });
  }
  sortAZ.addEventListener("click", sortByNameAZ);
  
  function sortByNameZA() {
    myDiv.innerHTML = "";
    axios
      .get("https://655ddd779f1e1093c59a0b08.mockapi.io/basket")
      .then((res) => {
        db = res.data;
        let sortedData = db.sort((a, b) => b.name.localeCompare(a.name));
        sortedData.map((item) => {
          const box = document.createElement("div");
          box.innerHTML = `
              <div style="border: 1px solid black; padding:10px; border-radius:10px">
              <img src=${item.image} alt="" style="width: 150px; height: auto;">
              <p>${item.name}</p>
              <p>${item.price} MANAT</p>
              <button onclick="addToCart(${item.id})" style="border: none; background-color:orange; color: white; padding: 3px 7px 3px 7px; border-radius: 8px;">Add to cart</button>
              <button onclick="addToWishlist(${item.id})" style="border: none; background-color: orange; color: white; padding: 3px 7px 3px 7px; border-radius: 8px;">Wishlist</button>
              </div>
              `;
              myDiv.appendChild(box);
        });
      });
  }
  
  function searchByName() {
    myDiv.innerHTML = "";
    axios
      .get("https://655ddd779f1e1093c59a0b08.mockapi.io/basket")
      .then((res) => {
        let filteredData = res.data.filter((item) =>
          item.name.toLowerCase().startsWith(inp.value.toLowerCase())
        );
        filteredData.map((item) => {
          const box = document.createElement("div");
          box.innerHTML = `
              <div style="border: 1px solid black;gap:10px; padding:10px; border-radius:10px">
              <img src=${item.image} alt="" style="width: 150px; height: auto;">
              <p>${item.name}</p>
              <p>${item.price} MANAT</p>
              <button onclick="addToCart(${item.id})" style="border: none; background-color: orange; color: white; padding: 3px 7px 3px 7px; border-radius: 8px;">Add to cart</button>
              <button onclick="addToWishlist(${item.id})" style="border: none; background-color: orange; color: white; padding: 3px 7px 3px 7px; border-radius: 8px;">Wishlist</button>
              </div>
              `;
              myDiv.appendChild(box);
        });
      });
    inp.value = "";
  }
  
  sortZA.addEventListener("click", sortByNameZA);
  
  defaultPro.addEventListener("click", getProducts);

  myDiv();