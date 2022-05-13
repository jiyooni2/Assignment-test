//$app 아래에 연결
export default function Breadcrumb({ $app, initialState = [], onClick }) {
  this.state = initialState;

  //breadcrumb 생성 DOM
  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);

  //Breadcrumb에서 state는 depth
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onClick = onClick;

  this.render = () => {
    this.$target.innerHTML = `<div class="nav-item">root</div>${this.state
      .map(
        (node, index) =>
          `<div class="nav-item" data-index="${index}">${node.name}</div>`
      )
      .join("")}`;
  };

  this.$target.addEventListener("click", (e) => {
    const $navItem = e.target.closest(".nav-item");

    if ($navItem) {
      const { index } = $navItem.dataset;
      this.onClick(index ? parseInt(index, 10) : null);
    }
  });

  this.render();
}
