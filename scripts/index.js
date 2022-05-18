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

window.onload = function() {
    if (localStorage.getItem("cart") === null)
    {
        window.localStorage.setItem("cart", JSON.stringify([]));
    }
    let item1 = new items(1, "../resources/article_1_front.jpg", "../resources/article_1_back.jpg", "Air Jordan 1 Retro High University Blue", 545, 0, 0);
    let item2 = new items(2, "../resources/article_2_front.jpg", "../resources/article_2_back.jpg", "Air Force 1 Low White Supreme", 250, 0, 0);
    let item3 = new items(3, "../resources/article_3_front.jpg", "../resources/article_3_back.jpg", "Air Force 1 Low Metallic Chrome", 250, 20, 0);

    let itemsArray = [item1, item2, item3];

    let oldCart = window.localStorage.getItem('cart');
    let oldCartParsed = JSON.parse(oldCart);
    for (let i = 0; i < itemsArray.length; i++)
    {
        let objIndex = oldCartParsed.findIndex(obj => obj.id === itemsArray[i].id);
        itemsArray[i].amount = oldCartParsed[objIndex]?.amount;
    }

    let fileName = location.href.split("/").slice(-1);
    if (String(fileName) === "cart.html")
    {
        for (let i = 0; i < oldCartParsed.length; i++)
        {
            oldCartParsed[i].createItemCart();
        }
    } else {
        item1.createItem();
        item2.createItem();
        item3.createItem();
    }
}



