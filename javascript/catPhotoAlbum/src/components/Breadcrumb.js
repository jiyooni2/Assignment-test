export default function Breadcrumb({ $app, initialState, onClick }) {
  this.state = initialState;

  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);

  this.onClick = onClick;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const depthTemplates = this.state.depth
      ?.map((node) => `<div data-node-id="${node.id}">${node.name}</div>`)
      .join("");

    this.$target.innerHTML = "<div>root</div>" + depthTemplates;
  };

  this.$target.addEventListener("click", (e) => {
    const $path = e.target.closest("div");
    if (!$path) {
      return;
    }
    const { nodeId } = $path.dataset;

    //go to root
    if (!nodeId) {
      this.onClick();
      return;
    }

    const node = this.state.depth.find((node) => node.id === nodeId);

    if (!node) {
      return;
    }

    //go to nodeId
    this.onClick(node);
  });

  this.render();
}
