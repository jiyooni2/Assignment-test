export default function Breadcrumb({ $app, initialState, onClick }) {
  this.state = initialState;

  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onClick = onClick;

  this.render = () => {
    const depthTemplates = this.state.depth
      ?.map(
        (node) => `
            <div data-id="${node.id}">${node.name}</div>
        `
      )
      .join("");

    this.$target.innerHTML = `<div>root</div>${depthTemplates}`;
  };

  this.$target.addEventListener("click", (e) => {
    const $div = e.target.closest("div");
    if ($div) {
      const { id } = $div.dataset;
      if (!id) {
        this.onClick();
      }
      const node = this.state.depth.find((node) => node.id === id);
      if (!node) {
        return;
      }
      this.onClick(node);
    }
  });

  this.render();
}
