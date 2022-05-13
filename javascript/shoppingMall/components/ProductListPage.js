export default function ProductListPage({ $app, initialState, onClick }) {
  this.state = initialState;

  this.$page = document.createElement("div");
  this.$page.className = "ProductListPage";

  $app.appendChild(this.$page);

  this.onClick = onClick;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const productTemplates = this.state.products
      .map(
        (product) =>
          `<li class="Product" data-id="${product.id}">
            <img src="${product.imageUrl}"/>
            <div class="Product__info">
                <div>${product.name}</div>
                <div>${product.price}</div>
            </div>
        </li>`
      )
      .join("");

    this.$page.innerHTML = `<h1>상품목록</h1><ul>${productTemplates}</ul>`;
  };

  this.$page.addEventListener("click", (e) => {
    const $product = e.target.closest(".Product");
    const { id } = $product.dataset;

    this.onClick(id);
  });

  this.render();
}
