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
    const nodeTemplates = this.state.nodes
      .map((node) => {
        const iconPath =
          node.type === "DIRECTORY"
            ? "./assets/directory.png"
            : "./assets/file.png";

        return `<div class="Node" data-node-id="${node.id}">
                    <img src="${iconPath}"/>
                    <div>${node.name}</div>
                </div>`;
      })
      .join("");

    this.$target.innerHTML = !this.state.isRoot
      ? `<div class="Node">
            <img src="./assets/prev.png"/>
        </div>
        ${nodeTemplates}`
      : nodeTemplates;
  };

  this.$target.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");
    if (!$node) {
      return;
    }
    const { nodeId } = $node.dataset;

    if (!nodeId) {
      this.onBackClick();
      return;
    }

    const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
    if (selectedNode) {
      this.onClick(selectedNode);
    }
  });

  this.render();
}
