import { getProducts } from "./api.js";
import ProductList from "./ProductList.js";

export default function ProductListPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";

  $page.innerHTML = `<h1>상품목록</h1>`;

  this.render = () => {
    $target.appendChild($page);
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const productList = new ProductList({
    $target: $page,
    initialState: this.state,
  });

  const fetchProducts = async () => {
    const products = await getProducts();
    this.setState(products);
    productList.setState(this.state);
  };

  fetchProducts();
}
