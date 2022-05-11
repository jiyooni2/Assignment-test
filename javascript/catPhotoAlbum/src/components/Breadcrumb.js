export default function Breadcrumb({ $app, initialState }) {
  this.state = initialState;

  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const depthTemplates = this.state.depth?.map(
      (node) => `<div>${node.name}</div>`
    );

    this.$target.innerHTML = "<div>root</div>" + depthTemplates;
  };

  this.render();
}
