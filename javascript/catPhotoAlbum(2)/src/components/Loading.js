export default function Loading({ $app, initialState }) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "Modal Loading";

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.loading) {
      this.$target.innerHTML = `
                <div class="content">
                    <img src="./assets/nyan-cat.gif">
                </div>`;
      this.$target.style.display = "block";
    } else {
      this.$target.style.display = "none";
      this.$target.innerHTML = "";
    }
  };

  this.render();
}
