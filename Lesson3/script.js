"use strict"

function makeGETRequest(url, callback) {
  var xhr;

const promise = new Promise((resolve, reject) => {
 if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      resolve(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
});

promise.then((b) => {
  callback(b);      
});
}

const API_URL = 'https://raw.githubusercontent.com/YuliaBuh/JavaScript2/Lesson3/JSON';

class ProductsItem {
	constructor (product_name, price, id_product) {
		this.product_name = product_name;
		this.price = price;
		this.id_product = id_product;
	}
	render() {
		return `<div class="product-item">
  				<h3 id="product_name">${this.product_name}</h3>
  				<img src = 'Img/${this.product_name}.png' alt='Image'>
  				<p>${this.price}</p>
  				<input type="button" id="button" onclick="addToBasket(${this.id_product})" value="Добавить"/>
  			</div>`;
  	}
}
class ProductsList {
	constructor() {
		this.products = [];
	}
	fetchProducts(callback) {
		makeGETRequest(`${API_URL}/catalogData.json`, (products) => {
			this.products = JSON.parse(products);
			callback();
    })
   }

   render() {
		let listHtml = '';
		this.products.forEach(product => {
			const productItem = new ProductsItem(product.product_name, product.price, product.id_product);
			listHtml += productItem.render();
		});
		document.querySelector('.products-list').innerHTML = listHtml;
	}
};
	

class BasketItem {
	constructor(product_name='', price='', id_product='') {
		this.product_name = product_name;
		this.price = price;
		this.id_product = id_product;
	}
	render() {
		return `<div class="basketasket-item">
  				<h3 id="product_name">${this.product_name}</h3>
  				<p>${this.price}</p>
  				<input type="button" id="button" onclick="deleteToBasket(${this.id_product})" value="Удалить"/>
  			</div>`;
  	}
}

class BasketProducts {
	constructor() {
		this.products = [];
	}
	add(product) {
		this.products.splice(0,0,product);
	}
	delete(id_product) {
		let index = undefined;
		this.products.forEach((item, i) => {
			if (item.id_product == id_product) {
				index = i;
			}
		})
		if (index != undefined) {
			this.products.splice(index, 1);
		}
	}
	summ(){
		//возвращает сумму элементов корзины
		let summ = 0;
		this.products.forEach(product => {
			summ += product.price;
		});	
		return summ
	}
    count_elements() {
        let count = this.products.length;
        document.getElementById('cartcoint').innerHTML = ' (' + count + ')';
    }
    render() {
		let listHtml = '';
		this.products.forEach(product => {
			listHtml += product.render();
		});
		listHtml += `<p>Сумма товаров в корзине: </p>` + this.summ();
		document.querySelector('.basket-list').innerHTML = listHtml;
	}
}

function addToBasket(id){
	list.products.forEach(function(item) {
            if(id == item.id_product) {
               	basket.add(new BasketItem(item.product_name, item.price, item.id_product));
            }
        });
	basket.count_elements();
}

function deleteToBasket(id_product){
	basket.delete(id_product);
	basket.render();
	basket.count_elements();
}

function createBasket(){
	basket.render();	
}

const list = new ProductsList();
list.fetchProducts(() =>{
	list.render();
});	

const basket = new BasketProducts();
basket.count_elements();

// //проверки по корзине
// let basket = new BasketProducts;
// basket.add(new BasketItem('Milk', 3));
// basket.add(new BasketItem('Bread', 1));
// basket.add(new BasketItem('Fish', 10));
// basket.add(new BasketItem('Cheese', 5))
// console.log('количество элементов ' + basket.products.length);
// console.log('сумма элементов ' + basket.summ());
// basket.delete('Milk');
// console.log('сумма элементов ' + basket.summ());