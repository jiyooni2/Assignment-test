const FILE_PATH =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function ImageView({ $app, initailState, onClose }) {
  this.state = initailState;

  this.$target = document.createElement("div");
  this.$target.className = "Modal ImageViewer";
  $app.appendChild(this.$target);

  this.onClose = onClose;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { filePath } = this.state;

    if (!filePath) {
      this.$target.style.display = "none";
      this.$target.innerHTML = "";
    } else {
      this.$target.innerHTML = `
                <div class="content">
                    <img src="${FILE_PATH}${this.state.filePath}">
                </div>`;
      this.$target.style.display = "block";
    }
  };

  this.$target.addEventListener("click", (e) => {
    const $content = e.target.closest(".content");
    if (!$content) {
      this.onClose();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      this.onClose();
    }
  });
}
