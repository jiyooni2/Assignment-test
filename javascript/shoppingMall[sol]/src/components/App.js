import ProductListPage from "./ProductListPage.js";
import ProductDetailPage from "./ProductDetailPage.js";
import CartPage from "./CartPage.js";
import { init } from "./router.js";

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    console.log(pathname);
    $target.innerHTML = "";

    console.log(pathname.indexOf("/products/"));

    if (pathname === "/web/") {
      new ProductListPage({ $target }).render();
    } else if (pathname.indexOf("/products/") === 4) {
      const productId = pathname.split("/")[3];

      new ProductDetailPage({
        $target,
        productId,
      }).render();
    } else if (pathname === "/web/cart") {
      new CartPage({ $target }).render();
    }
  };

  //route change 이벤트에 this.route 등록해서,
  //route change 이벤트 생길때마다 실행됨
  init(this.route);
  window.addEventListener("popstate", this.route);

  this.route();
}
