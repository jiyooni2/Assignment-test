export default function ProductDetailPage({ $app, initialState }) {
  this.state = initialState;

  this.$page = document.createElement("div");
  this.$page.className = "ProductDetailPage";

  $app.appendChild(this.$page);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const {
      product: { imageUrl, name, price, productOptions },
    } = this.state;

    const optionTemplates = productOptions
      ?.map((option, index) => {
        if (option.stock === 0) {
          return `<option data-option-id="${option.id}">(품절) ${option.name}</option>`;
        }

        if (option.price === 0) {
          return `<option data-option-id="${option.id}">${option.name}</option>`;
        } else {
          return `<option data-option-id="${option.id}">${option.name}(+${option.price}원)</option>`;
        }
      })
      .join("");

    console.log(this.state);
    const selectedOptionTemplates = this.state.selectedOptions
      .map((option) => {
        return `
            <li>
                ${name} ${option.name} ${price}<div><input type="number" value="10">개</div>
            </li>`;
      })
      .join("");

    this.$page.innerHTML = `<img src="${imageUrl}"/>
        <div class="ProductDetail__info">
            <h2>${name}</h2>
            <div class="ProductDetail__price">${price}원~</div>
            <select id="options">
                <option>선택하세요</option>
                ${optionTemplates}
            </select>
            <div class="ProductDetail__selectedOptions">
                <h3>선택된 상품</h3>
            <ul>
                ${selectedOptionTemplates}
            </ul>
            
        </div>`;
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();

  document.querySelector("select").addEventListener("change", (e) => {
    const {
      product: { productOptions },
    } = this.state;
    const selectedIndex = e.target.selectedIndex;

    const index = this.state.selectedOptions.findIndex(
      (option) => option === productOptions[selectedIndex - 1]
    );

    if (index === -1) {
      this.setState({
        ...this.state,
        selectedOptions: [
          ...this.state.selectedOptions,
          productOptions[selectedIndex - 1],
        ],
      });
    }
  });
}
