export default function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const iconPath = (node) => {
      if (node.type === "DIRECTORY") {
        return "./assets/directory.png";
      } else if (node.type === "FILE") {
        return "./assets/file.png";
      }
    };

    const nodeTemplates = this.state.nodes
      .map(
        (node) => `
                <div class="Node" data-node-id="${node.id}">
                    <img src="${iconPath(node)}">
                    <div>${node.name}</div>
                </div>`
      )
      .join("");

    this.$target.innerHTML = !this.state.isRoot
      ? `<div class="Node">
                <img src="./assets/prev.png">
            </div>
            ${nodeTemplates}`
      : `${nodeTemplates}`;
  };

  this.$target.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");

    if ($node) {
      const { nodeId } = $node.dataset;

      const node = this.state.nodes.find((node) => node.id === nodeId);

      if (!nodeId) {
        this.onBackClick();
        return;
      }

      this.onClick(node);
    }
  });

  this.render();
}
