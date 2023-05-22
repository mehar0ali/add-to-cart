let label = document.getElementById("label");
let shoppingcart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem('data')) || [];







let generateshoppingcart = () => {
    if (basket.length !== 0) {
        return (shoppingcart.innerHTML = basket.map((x) => {

            let { id, item } = x;
            let search = shopitems.find((y) => y.id === id) || [];
            return `
                <div class="cartitemsdetail">
                     <img width="120" height="120" src=${search.img} alt="" />
                    <div class="name-price-cross">
                        <div class="itemsdetail">
                            <h3>${search.name}</h3>
                            <p class"pricetag"> $ ${search.price}</p>
                        </div>
                            <i onclick="removeItems(${id})" class="fa-solid fa-x"></i>
                    </div>

                    <div class="cartquantitybtn" id="cartquantitybtn">
                    <div class="quantity-tag">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus padleft"></i>
                        <div id=${id} class="item-quantity">${item}</div>
                        <i onclick="increment(${id})" class="fa-solid fa-plus padleft"></i>
                    </div>
                </div> 

                  

                    <h3 class="total-item-price">$${item * search.price}</h3>
                </div>
                
            `
        }).join(""))

    }
    else {
        shoppingcart.innerHTML = ``
        label.innerHTML = `
        <h2 class="cart-empty-head">Cart is empty</h2>
        <a href="index.html">
            <button class="homeBtn">Back to home</button>
        </a>
        `

    }
}

generateshoppingcart();



let increment = (id) => {
    let selecteditem = id;
    let search = basket.find((x) => x.id === selecteditem.id)

    if (search === undefined) {
        basket.push({
            id: selecteditem.id,
            item: 1,
        })
    } else {
        search.item += 1;
    }

    localStorage.setItem('data', JSON.stringify(basket));
    generateshoppingcart();
    //  console.log(basket);
    update(selecteditem.id);
};

let decrement = (id) => {
    let selecteditem = id;
    let search = basket.find((x) => x.id === selecteditem.id)

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selecteditem.id);
    
    basket = basket.filter((x) => x.item !== 0);
    generateshoppingcart();
    localStorage.setItem('data', JSON.stringify(basket));

    // console.log(basket);

};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation()
    totalAmount();
}


let calculation = () => {
    let cartQuantity = document.getElementById("cart-quantity");
    cartQuantity.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
    // console.log(basket.map((x)=> x.item ).reduce((x,y)=>x+y, 0));
}

calculation();


let removeItems = (id) =>{
    let selecteditem = id
    basket = basket.filter((x)=> x.id !== selecteditem.id)
    generateshoppingcart();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
    
}



let totalAmount = () =>{
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = shopitems.find((y) => y.id === id) || [];
            return item * search.price
        }).reduce((x,y)=> x + y, 0)
        // console.log(amount);
        label.innerHTML = `
        <h2>Total Bill is : $ ${amount}</h2>
        <button class="checkOut">Check Out</button>
        <button onclick="removeAll()" class="clearAll">Clear All</button>

        `
    }
    else return
}
totalAmount();




let removeAll = () =>{
    basket = [];
    generateshoppingcart();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
}