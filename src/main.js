let shop = document.getElementById('shop');


let basket = JSON.parse(localStorage.getItem('data')) || [];


let makeShoppingCart = () => {
    return shop.innerHTML = (shopitems.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x)=> x.id === id) || [];
        return `
        <div id="product-id-${id}" class="items">
        <img src=${img} alt="">
        <div class="title">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-tag">
                <h3>$ ${price}</h3>
                <div class="quantity-tag">
                    <i onclick="decrement(${id})" class="fa-solid fa-minus padleft"></i>
                    <div id=${id} class="item-quantity">
                        ${search.item === undefined? 0 : search.item}
                    </div>
                    <i onclick="increment(${id})" class="fa-solid fa-plus padleft"></i>
                </div>
            </div>
        </div>
    </div>
          
        `
    }).join(''))

}

makeShoppingCart()


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

    
    //  console.log(basket);
    update(selecteditem.id);
};



let decrement = (id) => {
    let selecteditem = id;
    let search = basket.find((x) => x.id === selecteditem.id)

    if(search === undefined)return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selecteditem.id);

    basket = basket.filter((x)=> x.item !== 0);
    

    localStorage.setItem('data', JSON.stringify(basket));

    // console.log(basket);
    
};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation()
}




let calculation = () => {
    let cartQuantity = document.getElementById("cart-quantity");
    cartQuantity.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
    // console.log(basket.map((x)=> x.item ).reduce((x,y)=>x+y, 0));
}

calculation();

