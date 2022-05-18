class items
{
    constructor(id, image1, image2, name, price, reduction, amount)
    {
        this.id = id;
        this.image1 = image1;
        this.image2 = image2;
        this.name = name;
        this.price = price;
        this.reduction = reduction;
        this.amount = amount;
    }

    addMore()
    {
        this.amount++;
        this.updateAmount();
    }

    addLess()
    {
        if (this.amount >= 1) {
            this.amount--;
            this.updateAmount();
        }
        if (this.amount === 0) {
            this.deleteFromCart();
            this.addmorenumber.classList.add('hide');
        }
    }

    updateAmount()
    {
        this.moreNumber.innerHTML = this.amount;

        let oldCart = window.localStorage.getItem('cart');
        let oldCartParsed = JSON.parse(oldCart);
        let objIndex = oldCartParsed.findIndex(obj => obj.id === this.id);
        oldCartParsed[objIndex].amount = this.amount;

        window.localStorage.setItem('cart', JSON.stringify(oldCartParsed));
    }

    switchImage()
    {
        let image = document.querySelector(".item-image");

        image.addEventListener('hover', () => {
            image.src = this.image2;
        });
    }

    addToCart()
    {
        this.addtocartbutton.innerHTML = 'Added to cart';
        this.addtocartbutton.disabled = true;

        let oldCart = window.localStorage.getItem('cart');
        let oldCartParsed = JSON.parse(oldCart);
        oldCartParsed.push({...this});

        window.localStorage.setItem('cart', JSON.stringify(oldCartParsed));
    }

    deleteFromCart()
    {
        this.addmorenumber.classList.add('hide');
        this.addtocartbutton.innerHTML = 'Add to cart';
        this.addtocartbutton.disabled = false;

        let oldCart = window.localStorage.getItem('cart');
        let oldCartParsed = JSON.parse(oldCart);
        let objIndex = oldCartParsed.findIndex(obj => obj.id === this.id);

        oldCartParsed.splice(objIndex, 1);
        window.localStorage.setItem('cart', JSON.stringify(oldCartParsed));
    }

    createItemCart()
    {
        let buyPhase = document.querySelector('.buy-phase');

        let item = document.createElement("div");
        item.className = "item";
        buyPhase.appendChild(item);

        let itemContent = document.createElement("div");
        itemContent.className = "item-content";
        item.appendChild(itemContent);

        let itemManagement = document.createElement("div");
        itemManagement.className = "item-management";
        item.appendChild(itemManagement);

        let itemImageDiv = document.createElement("div");
        itemImageDiv.className = "item-image-div";
        itemContent.appendChild(itemImageDiv);

        let itemImage = document.createElement("img");
        itemImage.className = "item-image";
        itemImage.src = this.image1;
        itemImageDiv.appendChild(itemImage);

        let itemDescription = document.createElement("div");
        itemDescription.className = "item-description";
        itemContent.appendChild(itemDescription);

        let itemPriceInfos = document.createElement("div");
        itemPriceInfos.className = "item-price-infos";
        itemDescription.appendChild(itemPriceInfos);

        let itemPrice = document.createElement("p");
        itemPrice.className = "item-price";
        itemPrice.innerHTML = this.price + " €";
        if (this.reduction > 0) {
            itemPrice.style.textDecoration = "line-through";
        }
        itemPriceInfos.appendChild(itemPrice);

        let itemNewPrice = document.createElement("p");
        itemNewPrice.className = "item-new-price";
        itemNewPrice.innerHTML = (this.price-this.price*this.reduction/100) + " €";
        itemPriceInfos.appendChild(itemNewPrice);

        let discount = document.createElement("p");
        discount.className = "item-discount";
        if (this.reduction > 0) {
            discount.innerHTML = this.reduction + "% OFF";
        }
        itemDescription.appendChild(discount);

        let itemName = document.createElement("p");
        itemName.className = "item-name";
        itemName.innerHTML = this.name;
        itemDescription.appendChild(itemName);

        let addMoreNumber = document.createElement("div");
        addMoreNumber.className = "add-more-number hide";
        if (this.amount >= 1)
        {
            addMoreNumber.classList.remove('hide');
        }
        this.addmorenumber = addMoreNumber;
        itemManagement.appendChild(addMoreNumber);

        let addMore = document.createElement("div");
        addMore.className = "add-more";
        addMore.addEventListener('click', () => {
            this.addMore();
        });
        addMoreNumber.appendChild(addMore);

        let faSolid = document.createElement("i");
        faSolid.className = "fa-solid fa-plus";
        addMore.appendChild(faSolid);


        let addLess = document.createElement("div");
        addLess.className = "add-less";
        addLess.addEventListener('click', () => {
            this.addLess();
        });
        this.addless = addLess;
        addMoreNumber.appendChild(addLess);

        let faSolidMin = document.createElement("i");
        faSolidMin.className = "fa-solid fa-minus";
        addLess.appendChild(faSolidMin);

        let moreNumber = document.createElement("div");
        moreNumber.className = "more-number";
        moreNumber.innerHTML = this.amount;
        this.moreNumber = moreNumber;
        addMoreNumber.appendChild(moreNumber);

        let deleteItem = document.createElement("div");
        deleteItem.className = "delete-item";
        deleteItem.innerHTML = "Delete";
        deleteItem.addEventListener('click', () => {
            this.deleteFromCart();
        });
        itemManagement.appendChild(deleteItem);

    }

    createItem()
    {
        let buyPhase = document.querySelector(".buy-phase");

        let item = document.createElement("div");
        item.className = "item";
        buyPhase.appendChild(item);

        let itemImageDiv = document.createElement("div");
        itemImageDiv.className = "item-image";
        item.appendChild(itemImageDiv);

        let itemImage = document.createElement("img");
        itemImage.src = this.image1;
        itemImage.alt = this.name;
        itemImage.addEventListener('mouseover', () => {
            itemImage.src = this.image2;
        });
        itemImage.addEventListener('mouseout', () => {
            itemImage.src = this.image1;
        });
        itemImageDiv.appendChild(itemImage);

        let itemInfoDiv = document.createElement("div");
        itemInfoDiv.className = "item-info";
        item.appendChild(itemInfoDiv);

        let itemName = document.createElement("p");
        itemName.className = "item-name";
        itemName.innerHTML = this.name;
        itemInfoDiv.appendChild(itemName);

        let itemPrice = document.createElement("p");
        itemPrice.className = "item-price";
        itemPrice.innerHTML = this.price + "€";
        itemInfoDiv.appendChild(itemPrice);

        if (this.reduction > 0)
        {
            let itemReduction = document.createElement("p");
            itemReduction.className = "item-reduction";
            itemReduction.innerHTML = "- " + this.reduction + "%" + (this.price-this.price*this.reduction/100) + "€";
            itemInfoDiv.appendChild(itemReduction);
            itemPrice.style.textDecoration = "line-through";
        }

        let addToCart = document.createElement("div");
        addToCart.className = "add-to-cart";
        itemInfoDiv.appendChild(addToCart);

        let addToCartDiv = document.createElement("div");
        addToCartDiv.className = "add-to-cart-div";
        addToCart.appendChild(addToCartDiv);

        let addToCartButton = document.createElement("button");
        addToCartButton.className = "add-to-cart-button";
        this.addtocartbutton = addToCartButton;
        if (this.amount > 0)
        {
            addToCartButton.innerHTML = "Added to cart";
            addToCartButton.disabled = true;

        } else {
            addToCartButton.innerHTML = "Add to cart";
        }
        addToCartButton.addEventListener('click', () => {
            this.addToCart();
            this.amount = 1;
            this.updateAmount();
            this.addmorenumber.classList.remove('hide');
        });
        addToCartDiv.appendChild(addToCartButton);

        let addMoreNumber = document.createElement("div");
        addMoreNumber.className = "add-more-number hide";
        if (this.amount >= 1)
        {
            addMoreNumber.classList.remove('hide');
        }
        this.addmorenumber = addMoreNumber;
        addToCart.appendChild(addMoreNumber);

        let addMore = document.createElement("div");
        addMore.className = "add-more";
        addMore.addEventListener('click', () => {
            this.addMore();
        });
        addMoreNumber.appendChild(addMore);

        let faSolid = document.createElement("i");
        faSolid.className = "fa-solid fa-plus";
        addMore.appendChild(faSolid);


        let addLess = document.createElement("div");
        addLess.className = "add-less";
        addLess.addEventListener('click', () => {
            this.addLess();
            // enlever un au panier
            // si = a 0 ca l'enleve du panier dans addLess
        });
        this.addless = addLess;
        addMoreNumber.appendChild(addLess);

        let faSolidMin = document.createElement("i");
        faSolidMin.className = "fa-solid fa-minus";
        addLess.appendChild(faSolidMin);

        let moreNumber = document.createElement("div");
        moreNumber.className = "more-number";
        moreNumber.innerHTML = this.amount;
        this.moreNumber = moreNumber;
        addMoreNumber.appendChild(moreNumber);
    }
}

function getTotalPrice()
{
    let summaryNumberItems = document.querySelector(".summary-number-items");
    let summaryNumberPrice = document.querySelector(".summary-number-price");
    let summaryNumberDiscount = document.querySelector(".summary-number-discount");
    let summaryNumberTotalPrice = document.querySelector(".summary-number-total-price");

    let oldCart = window.localStorage.getItem('cart');
    let oldCartParsed = JSON.parse(oldCart);

    summaryNumberItems.innerHTML = oldCartParsed.length + " items";

    let numPrice = 0;
    let numDiscount = 0;
    let numTotalPrice = 0;
    for (let i = 0; i < oldCartParsed.length; i++)
    {
        let item = oldCartParsed[i];
        numPrice += item.price * item.amount;
        numDiscount += (item.price*item.reduction/100) * item.amount;
        numTotalPrice += item.price * item.amount - item.reduction * item.amount;
    }
    summaryNumberPrice.innerHTML = String(numPrice)+ " €";
    summaryNumberDiscount.innerHTML = String(numDiscount)+ " €";
    summaryNumberTotalPrice.innerHTML = String(numTotalPrice)+ " €";

}

window.onload = function() {
    if (localStorage.getItem("cart") === null)
    {
        window.localStorage.setItem("cart", JSON.stringify([]));
    }
    let item1 = new items(1, "../resources/article_1_front.jpg", "../resources/article_1_back.jpg", "Grey rat + 3D version", 545, 0, 0);
    let item2 = new items(2, "../resources/article_2_front.jpg", "../resources/article_2_back.jpg", "Orange rat + plush version", 250, 0, 0);
    let item3 = new items(3, "../resources/article_3_front.jpg", "../resources/article_3_back.jpg", "White rat + fat version", 250, 20, 0);

    let itemsArray = [item1, item2, item3];

    let oldCart = window.localStorage.getItem('cart');
    let oldCartParsed = JSON.parse(oldCart);
    for (let i = 0; i < itemsArray.length; i++)
    {
        let objIndex = oldCartParsed.findIndex(obj => obj.id === itemsArray[i].id);
        itemsArray[i].amount = oldCartParsed[objIndex]?.amount;
    }

    let fileName = location.href.split("/").slice(-1);
    console.log(fileName);
    console.log(String(fileName));
    if (String(fileName) === "cart.html")
    {
        console.log("in cart");
        if (oldCartParsed.length === 0) {
            console.log("empty cart");
            let buyPhase = document.querySelector(".buy-phase");
            buyPhase.innerHTML = "Your cart is empty";
        } else {
            console.log("not empty cart");
            console.log(oldCartParsed);
            for (let i = 0; i < oldCartParsed.length; i++)
            {
                item3.createItemCart();
                //oldCartParsed[i].createItemCart();
            }
        }
    } else {
        item1.createItem();
        item2.createItem();
        item3.createItem();
    }

    getTotalPrice();
}



