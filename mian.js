//Cambio de cantidad de articulos ingresado por el usuario

let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

plusBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;
    console.log(userInputNumber);
})

minusBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if(userInputNumber <= 0){
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    console.log(userInputNumber);
})

//Agregar el total de productos al carrito cuando se preciona el boton ADD TO CART

const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click', () => {
    lastValue = lastValue + userInputNumber;
    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';
    drawProductInModal();
})

//Mostrar el modal con el detalle del carrito

const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
//let priceModal = document.querySelector('.cart-modal__price');
const productContainer = document.querySelector('.cart-modal__checkout-container');

cartIconBtn.addEventListener('click', () => {
    cartModal.classList.toggle('show');
    if(lastValue === 0){
        productContainer.innerHTML = '<p class="cart-empty">Your Cart is Empty</p>';
    }else{
        drawProductInModal();
    }
    
})

//Cambiar imagenes cuando se precione los botones flecha
const imageContainer = document.querySelector('.gallery__image-container');
const previusGalleryBtn = document.querySelector('.gallery__previous');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', () => {
    changeNextImage(imageContainer);
})

previusGalleryBtn.addEventListener('click', () => {
    changePreviusImage(imageContainer);
})

//Mostrar el modal de imgenes cuando ago click en la imagen principal
const imageModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');


imageContainer.addEventListener('click', () =>{
    imageModal.style.display = 'grid'
})

closeModalBtn.addEventListener('click', () =>{
    imageModal.style.display = 'none'
})

//Cambiar las imgenes principales desde las miniaturas
let thumbnails = document.querySelectorAll('.gallery__thumnail');
thumbnails = [...thumbnails]
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event =>{
        imageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id}.jpg')`
    })
})
//Cambiar las imgenes principales desde el modal en las miniaturas
let modalThumbnails = document.querySelectorAll('.modal-gallery__thumnails');
const modalImageContainer = document.querySelector('.modal-gallery__image-container');
modalThumbnails = [...modalThumbnails]

modalThumbnails.forEach(modalthumbnail => {
    modalthumbnail.addEventListener('click', event =>{
        modalImageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id.slice(-1)}.jpg')`
    })
})

//Cambiar imagen principal de modal desde felchas del modal
const previusModalBtn = document.querySelector('.modal-gallery__previous');
const nextModalBtn = document.querySelector('.modal-gallery__next');

nextModalBtn.addEventListener('click', () => {
    changeNextImage(modalImageContainer);
})

previusModalBtn.addEventListener('click', () => {
    changePreviusImage(modalImageContainer);
})
//Mostrar natbar en movaile hamburguesas
const viewModalNav = document.querySelector('.modal-navbar');
const hamburClick = document.querySelector('.header__menu');

hamburClick.addEventListener('click', () => {
    viewModalNav.style.display = 'block';
})

// FUNCIONES

function drawProductInModal(){
    productContainer.innerHTML=`<div class="cart-modal__checkout-container">
        <div class="cart-modal__details-container">
          <img class="cart-modal__image" src="images/image-product-1-thumbnail.jpg" alt="cart modal">
          <div>
            <p class="cart-modal__product">Autumn Limited Edition..</p>
            <p class="cart-modal__price">$125 x3 <span>$375.00</span></p>
          </div>
          <img class="cart-modal__delete" src="images/icon-delete.svg" alt="delete">
        </div>
        <button class="cart-modal__checkout">Checkout</button>`
        deleteProduct();
        let priceModal = document.querySelector('.cart-modal__price');
        priceModal.innerHTML = `$125 x${lastValue} <span>$${lastValue*125}.00</span>`
}

function deleteProduct(){
    const deleteProductBtn = document.querySelector('.cart-modal__delete');
        deleteProductBtn.addEventListener('click', () =>{
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
    })
}

function changeNextImage(imgContainer){
    if(imgIndex === 4){
        imgIndex = 1;
    }else{
        imgIndex++;
    } 
    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`
}

function changePreviusImage(imgContainer){
    if(imgIndex === 1){
        imgIndex = 4;
    }else{
        imgIndex--;
    } 
    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`
}