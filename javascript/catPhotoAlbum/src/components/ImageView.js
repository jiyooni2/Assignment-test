const IMG_URL = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public`;

export default function ImageView({ $app, initialState, close }) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "Modal ImageViewer";

  $app.appendChild(this.$target);

  this.close = close;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.selectedFilePath) {
      this.$target.innerHTML = `<div class="content">
        <img src="${IMG_URL}${this.state.selectedFilePath}">
        </div>`;
    }

    console.log(this.state);

    this.$target.style.display = this.state.selectedFilePath ? "block" : "none";
  };

  this.addModalCloseListener = () => {
    this.$target.addEventListener("click", (e) => {
      const $content = e.target.closest(".content");
      if (!$content) {
        this.close();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  };

  this.addModalCloseListener();
  this.render();
}
