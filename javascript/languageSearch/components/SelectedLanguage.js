export default function SelectedLanguage({ $app, initialState }) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "SelectedLanguage";

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const historyTemplate = this.state.history
      .map((language) => `<li>${language}</li>`)
      .join("");

    this.$target.innerHTML = `<ul>${historyTemplate}</ul>`;
  };
}
