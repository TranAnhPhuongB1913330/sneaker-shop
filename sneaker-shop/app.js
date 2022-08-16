//cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

//open cart
cartIcon.onclick = () => {
    cart.classList.add('active');
}
//close cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}

// Cart working

if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

// making func
function ready() {
    //remove item from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');

    // console.log(removeCartButtons)

    for(var i=0; i< removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i=0; i< quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }
    // addTo cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i=0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartCliked);
    }
    //buy button
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonCliked);

}
//buy btn
function buyButtonCliked(){
    alert('Your order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }

    updateTotal();
}
// remove item from cart
function removeCartItem(e) {
    var buttonCliked = e.target;
    buttonCliked.parentElement.remove();
    updateTotal()
}   

// quantity changes
function quantityChanged (e) {
    var input = e.target;
    if(isNaN(input.value) || input.value <=0){
        input.value = 1;
    }

    updateTotal()
}
//Add to cart
function addCartCliked(e) {
    var button = e.target;
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductTocart(title, price, productImg);
    updateTotal()
} 
function  addProductTocart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    // console.log(cartShopBox)
    var cartItem = document.getElementsByClassName('cart-content')[0];
    var cartItemNames = cartItem.getElementsByClassName('cart-product-title')
    

    var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <!-- remove -->
                    <i class='bx bx-trash cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItem.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);


    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('Add Product Successfully!!!!')
        }
    }
}





// update total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
        //price so le
        total = Math.round(total*100) /100;

        document.getElementsByClassName('total-price')[0].innerText = "$" + total;

    
}