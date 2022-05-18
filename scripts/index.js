class items
{
    constructor(image1, image2, name, price, reduction, amount)
    {
        this.image1 = image1;
        this.image2 = image2;
        this.name = name;
        this.price = price;
        this.reduction = reduction;
        this.amount = amount;
    }

    addMore()
    {
        console.log(this.addless);
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
            // supprimer article du panier
            this.addmorenumber.classList.add('hide');
        }
    }

    updateAmount()
    {
        this.moreNumber.innerHTML = this.amount;
    }

    switchImage()
    {
        let image = document.querySelector(".item-image");

        image.addEventListener('hover', () => {
            image.src = this.image2;
        });
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
            itemReduction.innerHTML = "- " + this.reduction + "%" + this.price*this.reduction/100 + "€";
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
        addToCartButton.innerHTML = "Add to cart";
        addToCartButton.addEventListener('click', () => {
            //this.addToCart();
            this.amount = 1;
            this.updateAmount();
            this.addmorenumber.classList.remove('hide');
        });
        addToCartDiv.appendChild(addToCartButton);

        let addMoreNumber = document.createElement("div");
        addMoreNumber.className = "add-more-number hide";
        this.addmorenumber = addMoreNumber;
        addToCart.appendChild(addMoreNumber);

        let addMore = document.createElement("div");
        addMore.className = "add-more";
        addMore.addEventListener('click', () => {
            this.addMore();
            // ajouter un en plus au panier
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

let item1 = new items("../resources/article_1_front.jpg", "../resources/article_1_back.jpg", "Air Jordan 1 Retro High University Blue", "545", "0", "1");
let item2 = new items("../resources/article_2_front.jpg", "../resources/article_2_back.jpg", "Air Force 1 Low White Supreme", "250", "0", "1");
let item3 = new items("../resources/article_3_front.jpg", "../resources/article_3_back.jpg", "Air Force 1 Low Metallic Chrome", "250", "20", "1");

item1.createItem();
item2.createItem();
item3.createItem();
