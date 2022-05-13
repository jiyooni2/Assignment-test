import ProductListPage from "./ProductListPage.js";
import ProductDetailPage from "./ProductDetailPage.js";
import { getProducts, getProduct } from "./api.js";

export default function App($app) {
  this.state = {
    productId: 0,
    products: [],
  };

  this.route = async () => {
    const { pathname, href } = location;

    const BASE_URL = "https://" + href.split("/")[2];
    console.log(BASE_URL);
    $app.innerHTML = "";

    if (pathname === "/web/") {
      const products = await getProducts();
      const productListPage = new ProductListPage({
        $app,
        initialState: { products },
        onClick: (id) => {
          location.assign(`${BASE_URL}/web/products/${id}`);
        },
      });
      //마찬가지로 이상한 URL이 들어올 수 있음
    } else if (pathname.startsWith("/web/products")) {
      const id = pathname.split("/")[3];
      const product = await getProduct(id);
      const productDetailPage = new ProductDetailPage({
        $app,
        initialState: { product, selectedOptions: [] },
      });
    }
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.route();
}
