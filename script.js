// const toggleBtn = document.getElementById("toggle-theme");
// toggleBtn.addEventListener("click", () => {
//   document.body.classList.toggle("dark");
//   toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
// });


  const toggleBtn = document.getElementById("menu-toggle");
  const navList = document.querySelector("nav ul");
  const opencart = document.getElementById('opencart');
  const cart = document.getElementById('cart');
  toggleBtn.addEventListener("click", function (e) {
    e.preventDefault();
    navList.classList.toggle("show");
  });

cart.style.right = '-800px';

opencart.onclick = function() {
  if (cart.style.right === '-800px') {
    cart.style.right = '0px';
  } else if (cart.style.right === '0px') {
    cart.style.right = '-800px';
  }
}


const openBtn = document.querySelector('.paynowbtn');
const modal = document.getElementById('checkoutModal');
const closeBtn = document.querySelector('.close-modal');

openBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});


let productArray = [];
let filteredproduct = [];
const productscontainer = document.getElementById('productscontainer');
const theproduct = document.getElementById('pr');
const productsincart = document.getElementById('productsincart');
const productsincartcontainer = document.getElementById('productsincartcontainer');
const addtocartbtn = document.querySelectorAll('.addtocartbtn');
let total = document.getElementById('total');
let totalmodal = document.getElementById('totalmodal');
let countcart = document.getElementById('countcart');
let search = document.getElementById('Search');
const allproducts = [{
  id:1,
  type: 'laptop',
  title: 'Asus Tuf Gaming',
  details : 'ASUS TUF Gaming , intel core i7 11th gen, Ram 16gb, GTX 1650TI 4GB',
  price: 800,
  img: '../Assest/offer1.PNG'
},
{
  id:2,
  type: 'elctronic',
  title: 'Samsung QLED 65 4K',
  details : 'Samsung QLED TV 65-Inch, Q70D, 4K, 100% Color Volume with Quantum Dot, AI 4K Upscaling, Samsung TV Plus, Motion Xcelerator 120Hz',
  price: 900,
  img: '../Assest/pr2.PNG'
},
{
  id:3,
  type: 'elctronic',
  title: 'Samsung QLED 75 4K',
  details : 'Samsung QLED TV 75-Inch, Q70D, 4K, 100% Color Volume with Quantum Dot, AI 4K Upscaling, Samsung TV Plus, Motion Xcelerator 120Hz',
  price: 1100,
  img: '../Assest/pr3.PNG'
},
{
  id:4,
  type: 'laptop',
  title: 'Lenovo Legion 5 Core i7 14700HX RTX 5070',
  details : 'Lenovo Legion 5 Core i7 14700HX, Ram 16gb, Nvidia Geforce RTX 5070, Storage 1TB SSD',
  price: 1500,
  img: '../Assest/pr4.PNG'
},
{
  id:5,
  type: 'laptop',
  title: 'Lenovo Legion 7 Core i9 14700HX RTX 5070',
  details : 'Lenovo Legion 7 Core i9 14700HX, Ram 32gb, Nvidia Geforce RTX 5070 8GB GDDR7, Storage 1TB SSD',
  price: 1850,
  img: '../Assest/pr5.PNG'
},
{
  id:6,
  type: 'elctronic',
  title: 'Marshall Major V Bluetooth Headphones',
  details : 'Marshall Major V Bluetooth Headphones – Wireless, Foldable Over-Ear Headphones with Over 100 Hours of Playtime (Black)',
  price: 80,
  img: '../Assest/pr6.PNG'
},
{
  id:7,
  type: 'elctronic',
  title: 'Razer Mechanical Keyboard 75%',
  details : 'Razer Mechanical Keyboard 75% , exchanged style ,blue switch , RGB',
  price: 80,
  img: '../Assest/pr7.PNG'
},
{
  id:8,
  type: 'clothes',
  title: 't-shirt men',
  details : 't-shirt men cotton',
  price: 10,
  img: '../Assest/pr8.PNG'
},
{
  id:9,
  type: 'clothes',
  title: 't-shirt men oversize',
  details : 't-shirt men cotton oversize',
  price: 10,
  img: '../Assest/pr9.PNG'
},
{
  id:10,
  type: 'clothes',
  title: 't-shirt women oversize',
  details : 't-shirt women cotton oversize',
  price: 15,
  img: '../Assest/pr10.PNG'
},

];
let navbar = document.getElementById('nav');


function ReadProducts() {
  const productArray = JSON.parse(localStorage.getItem('products')) || [];

  const productHTML = allproducts.map((product) => {
    const isAdded = productArray.some(p => p.id === product.id);

    return `
      <div class="pr" id="pr">
        <img src="${product.img}" alt="">
        <h3>${product.title}</h3>
        <p>${product.details}</p>
        <p>${product.price}$</p>
        <button class="addtocartbtn" ${isAdded ? 'disabled style="background-color:#88e480ff; color:#fff; cursor:not-allowed;"' : ''}>
          ${isAdded ? 'Added' : 'Add To Cart'}
        </button>
      </div>
    `;
  }).join('');

  productscontainer.innerHTML = productHTML;

  document.querySelectorAll('.addtocartbtn:not([disabled])').forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
      const clickedBtn = event.target;
      const product = allproducts[index];
      addtocart(product, clickedBtn);
    });
  });
}




ReadProducts();


function addtocart(product, btnElement) {
  let productArray = JSON.parse(localStorage.getItem('products')) || [];

  const exists = productArray.some(p => p.id === product.id);
  if (exists) {
    alert("Product is added");
    return;
  }

  productArray.push(product);
  localStorage.setItem('products', JSON.stringify(productArray));
  ReadProductsInCart();

  btnElement.disabled = true;
  btnElement.style.backgroundColor = "#88e480ff";
  btnElement.style.color = "#fff";
  btnElement.textContent = "Added";
  btnElement.style.cursor = "not-allowed";
}


function ReadProductsInCart() {
  const pr = JSON.parse(localStorage.getItem('products')) || [];
  productsincartcontainer.innerHTML = ''; 

  pr.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('princart');
    productDiv.innerHTML = `
      <img src="${product.img}" alt="">
      <h3>${product.title}</h3>
      <p class="price">${product.price}$</p>
      <div class="number-input">
        <button class="decrement">-</button>
        <input type="number" class="count" min="1" step="1" value="1" data-price="${product.price}">
        <button class="increment">+</button>
      </div>
      <button class="remove" onclick="RemoveFromCart(${product.id})">X</button>
    `;
    productsincartcontainer.appendChild(productDiv);
  });

  countcart.innerHTML = pr.length;

  setTimeout(() => {
    const counts = document.querySelectorAll('.count');
    const increments = document.querySelectorAll('.increment');
    const decrements = document.querySelectorAll('.decrement');

    function updateTotal() {
      let total2 = 0;
      counts.forEach(input => {
        const quantity = parseInt(input.value) || 1;
        const price = parseInt(input.dataset.price);
        total2 += quantity * price;
      });
      total.innerHTML = total2.toFixed(1);
      totalmodal.innerHTML = total2.toFixed(1);
    }

    counts.forEach(input => {
      input.addEventListener('input', updateTotal);
    });

    increments.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        counts[index].value = parseInt(counts[index].value) + 1;
        updateTotal();
      });
    });

    decrements.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        let current = parseInt(counts[index].value);
        if (current > 1) {
          counts[index].value = current - 1;
          updateTotal();
        }
      });
    });

    updateTotal(); 
  }, 0);
}

function RemoveFromCart(id) {
  let products = JSON.parse(localStorage.getItem('products')) || [];

  products = products.filter(product => product.id !== id);

  localStorage.setItem('products', JSON.stringify(products));

  ReadProducts();
  ReadProductsInCart();
}


productArray = JSON.parse(localStorage.getItem('products')) || [];
ReadProductsInCart()


function filterproduct(id){
  console.log(id);
  const filterproduct = allproducts.filter(item => item.type == id)
  const product = filterproduct.map((product)=>{
    return `
      <div class="pr" id="pr">
          <img src=${product.img} alt="">
          <h3>${product.title}</h3>
          <p>${product.details}</p>
          <p>${product.price}$</p>
          <Button class="addtocart" onclick="addtocart(${product.id})">Add To Cart</Button>
        </div>  
    `
  })

  productscontainer.innerHTML = product;
}


function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}


function Search() {
  const searchInput = document.getElementById("searchInput");
  const searchvalue = searchInput.value.trim().toLowerCase();

  if (searchvalue === "") {
    document.querySelectorAll('.herosection').forEach(section => {
      section.style.display = "block";
    });

    const offers1 = document.getElementById('theoffers');
    offers1.style.display = 'flex';

    const offers2 = document.getElementById('theoffers2');
    offers2.style.display = 'flex';

   const swiper = document.getElementById('swiper');
   swiper.style.display='flex';
    ReadProducts();
    return;
  }

  const productArray = JSON.parse(localStorage.getItem('products')) || [];

  const filteredProducts = allproducts.filter(product =>
    product.title.toLowerCase().includes(searchvalue)
  );

  const searchHTML = filteredProducts.map(product => {
    const isAdded = productArray.some(p => p.id === product.id);
    return `
      <div class="pr" id="pr">
        <img src="${product.img}" alt="">
        <h3>${product.title}</h3>
        <p>${product.details}</p>
        <p>${product.price}$</p>
        <button class="addtocartbtn" ${isAdded ? 'disabled style="background-color:#e53935; color:#fff; cursor:not-allowed;"' : ''}>
          ${isAdded ? 'Added' : 'Add To Cart'}
        </button>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.herosection').forEach(section => {
    section.style.display = "none";
  });

  const offers1 = document.getElementById('theoffers');
offers1.style.display = 'none';

  const offers2 = document.getElementById('theoffers2');
   offers2.style.display = 'none';


   const swiper = document.getElementById('swiper');
   swiper.style.display='none';
  productscontainer.innerHTML = searchHTML;

  document.querySelectorAll('.addtocartbtn:not([disabled])').forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
      const clickedBtn = event.target;
      const product = filteredProducts[index];
      addtocart(product, clickedBtn);
    });
  });
}
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", debounce(Search, 1000));

const bodycolor = document.querySelector("#darklight"); 
let isdark = localStorage.getItem("mode") === "dark";

window.onload = function () {
  applyMode(isdark);
};

bodycolor.addEventListener("click", () => {
  isdark = !isdark;
  localStorage.setItem("mode", isdark ? "dark" : "light");
  applyMode(isdark);
});

function applyMode(dark) {
  if (dark) {
    document.body.style.background = "#333"; 
    document.body.style.color = "#eee";
    navbar.style.background = "#333"
    bodycolor.innerHTML = "<i class='fa fa-certificate' aria-hidden='true'></i>";
    let pr = document.getElementById('pr');
    document.querySelectorAll('.pr').forEach(pr => {
      pr.style.background = "#444";
    });
    document.getElementById('theoffers2').style.background = "#444";
    document.querySelectorAll('.offer').forEach(offer => {
      offer.style.background = "#555";
    });
    document.getElementById('contact').style.background = "#444";
    document.getElementById('pcontact').style.color = "#fff";
    document.getElementById('cart').style.background = "#444";
    document.getElementById('cart').style.color = "#fff";
    document.getElementById('opencart').style.background = "#333";
  } else {
    document.body.style.background = "#f9f9f9";
    document.body.style.color = "#222"; 
    navbar.style.background = "#f1f1f1"
    document.querySelectorAll('.pr').forEach(pr => {
      pr.style.background = "#fff";
    });
    bodycolor.innerHTML = "<i class='fa fa-moon-o' aria-hidden='true'></i>";
    document.getElementById('theoffers2').style.background = "#fff";
    document.querySelectorAll('.offer').forEach(offer => {
      offer.style.background = "#ffffff";
    });
        document.getElementById('contact').style.background = "#fff";
        document.getElementById('pcontact').style.color = "#111";
    
    document.getElementById('cart').style.background = "#fff";
    document.getElementById('cart').style.color = "#111";
        document.getElementById('opencart').style.background = "#f1f1f1";

  }
}


document.querySelectorAll('.number-input').forEach(function(wrapper) {
  const input = wrapper.querySelector('input[type="number"]');
  wrapper.querySelector('.increment').onclick = function() {
    input.stepUp();
  };
  wrapper.querySelector('.decrement').onclick = function() {
    input.stepDown();
  };
});