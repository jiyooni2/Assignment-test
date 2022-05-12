export default function SearchInput({
  $app,
  initialState,
  onChange,
  onSubmit,
}) {
  this.state = initialState;

  this.$target = document.createElement("form");
  this.$target.className = "SearchInput";

  $app.appendChild(this.$target);

  this.onChange = onChange;
  this.onSubmit = onSubmit;

  //   this.setState = (nextState) => {
  //     this.state = nextState;
  //     this.render();
  //   };

  this.render = () => {
    this.$target.innerHTML = `<input
      class="SearchInput__input"
          type="text"
          placeholder="프로그램 언어를 입력하세요."
          />`;
  };

  this.$target.addEventListener("input", async (e) => {
    this.onChange(e.target.value);
  });

  this.$target.addEventListener("submit", (e) => {
    e.preventDefault();
    this.onSubmit();
  });

  this.render();
}
