function refreshProducts() {

    console.log('test');
    var products = JSON.parse(localStorage.getItem('products'));
    var prodList = document.getElementById('prodList');

    prodList.innerHTML = '';

    for(var i = 0; i < products.length; i++)
    {
        var image = products[i].image;
        var name = products[i].name;
        var inCart = products[i].inCart;
        var id = products[i].id;
        var buttonText = 'onclick=addToCart("'+id+'") href="#"> Add to Cart';


        if(inCart === "yes")
        {
            buttonText = 'href="#"> Added';
        }


        console.log(name);

        prodList.innerHTML +=   '<li class="list-inline-item" style="padding: 10px">' +
                                '<div align="center" class="container-fluid bg-light" style="padding-top: 10px; padding-bottom: 2.5px">' +
                                '<div class="container-fluid bg-white" style="padding-top: 10px">' +
                                '<img  style="vertical-align: center;" src="' + image +'" alt="" width="300" height="200">' +
                                '<h1>' + name + '</h1>' +
                                '<p class="cust_link"' + buttonText + '</p>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
    }
}

function refreshCart() {

    console.log("refreshing cart");

    var products = JSON.parse(localStorage.getItem('products'));
    var cartList = document.getElementById('cartList');
    var subtotal_field = document.getElementById('subtotal');
    var subtotal = 0;

    cartList.innerHTML = '';

    for(var i = 0; i < products.length; i++)
    {

        console.log(products[i].inCart);

        if(products[i].inCart == 'yes')
        {
            var cur_product = products[i];

            cartList.innerHTML +=   '<li class="list-group-item">' +
                                    '<table class="table table-borderless">' +
                                    '<tr style="padding: 10px;">' +
                                    '<td align="left">' + cur_product.name + '</td>' +
                                    '<td align="center">' + '$' + cur_product.price + '</td>' +
                                    '<td align="right"><button style="cursor: pointer" class="btn-danger" onclick="removeFromCart('+ '\'' + products[i].id + '\'' + ')">Remove</button></td>' +
                                    '</tr>' +
                                    '</table>' +
                                    '</li>';

            subtotal += parseInt(cur_product.price, 10);
        }
    }


    subtotal_field.innerText = 'Subtotal: $' + parseInt(subtotal, 10);
}

function addProduct() {

    console.log('Adding');
    var imageURL = document.getElementById('imageURL').value;
    var productName = document.getElementById('productName').value;
    var guid = chance.guid();
    var price = document.getElementById('price').value;


    console.log('Image url: ' + imageURL);
    console.log('Product name: ' + name);

    var product = {
        image: imageURL,
        name: productName,
        inCart: 'no',
        id: guid,
        price: price
    }

    if(localStorage.getItem('products') == null)
    {
        console.log("empty list");


        var products = [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }
    else
    {
        console.log('not empty');

        var products = JSON.parse(localStorage.getItem('products'));
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    document.getElementById('addProductForm').reset();
}

function addToCart(id) {
    console.log("clicked add to cart");
    var products = JSON.parse(localStorage.getItem('products'));
    var cur_product = null;

    for(var i = 0; i < products.length; i++)
    {
        if(products[i].id == id)
        {
            products[i].inCart = 'yes';
            cur_product = products[i];
            console.log("Found in list, incart?: " + products[i].inCart);
        }
    }

    if(cur_product == null)
    {
        console.log("None found");
    }

    localStorage.setItem('products', JSON.stringify(products));
    refreshProducts();
}

function removeFromCart(id) {

    console.log("clicked remove to cart");
    var products = JSON.parse(localStorage.getItem('products'));
    var cur_product = null;

    for(var i = 0; i < products.length; i++)
    {
        if(products[i].id == id)
        {
            products[i].inCart = 'no';
            cur_product = products[i];
            console.log("Found in list, incart?: " + products[i].inCart);
        }
    }

    if(cur_product == null)
    {
        console.log("None found");
    }

    localStorage.setItem('products', JSON.stringify(products));
    refreshCart();
}
