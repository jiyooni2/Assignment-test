import { getProduct } from "./api.js";
import Cart from "./Cart.js";
import { routeChange } from "./router.js";
import { getItem } from "./storage.js";

export default function CartPage({ $target }) {
  const $page = document.createElement("div");

  let cartComponent = null;
  $page.className = "CartPage";

  $page.innerHTML = "<h1>장바구니</h1>";

  const cartData = getItem("products_cart", []);
  this.state = { products: null };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.fetchProducts = async () => {
    const products = await Promise.all(
      cartData.map(async (cartItem) => {
        const product = await getProduct(cartItem.productId);
        console.log(product);
        const selectedOption = product.productOptions.find(
          (option) => option.id === cartItem.optionId
        );

        return {
          imageUrl: product.imageUrl,
          productName: product.name,
          quantity: cartItem.quantity,
          productPrice: product.price,
          optionName: selectedOption.name,
          optionPrice: selectedOption.price,
        };
      })
    );

    this.setState({ products });
  };

  this.render = () => {
    if (cartData.length === 0) {
      alert("장바구니 비어있음");
      routeChange("/web/");
    } else {
      $target.appendChild($page);
    }

    if (this.state.products && !cartComponent) {
      cartComponent = new Cart({
        $target: $page,
        initialState: this.state.products,
      });
    }
  };

  this.fetchProducts();
}
