export default function Product({ $app, initialState }) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "ProductListPage";

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const productTemplates = this.state.products.map(
      (product) => `<li class="Product">
      <img src=""/>
      <div class="Product__info">
      <div></div>
      <div></div>
      </div>
      </li>`
    );

    this.$target.innerHTML = `<h1>상품목록</h1>${productTemplates}`;
  };

  this.render();
}
