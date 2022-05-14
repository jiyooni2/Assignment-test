export default function Suggestion({
  $app,
  initialState,
  onMouseMove,
  onKeyUp,
  onKeyDown,
  onMouseDown,
}) {
  this.state = initialState;

  this.$target = document.createElement("div");
  this.$target.className = "Suggestion";

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onKeyUp = onKeyUp;
  this.onKeyDown = onKeyDown;
  this.onMouseMove = onMouseMove;
  this.onMouseDown = onMouseDown;

  this.render = () => {
    const { suggestionItems = [], selectedIndex } = this.state;

    if (suggestionItems?.length === 0) {
      this.$target.style.display = "none";
      return;
    }

    this.$target.style.display = "block";

    const suggestionItemsTemplate = suggestionItems
      .map((item, index) => {
        if (index === selectedIndex) {
          return `<li class="Suggestion__item--selected" data-index=${index}>${item}</li>`;
        } else {
          return `<li data-index=${index}>${item}</li>`;
        }
      })
      .join("");

    this.$target.innerHTML = `<ul>${suggestionItemsTemplate}</ul>`;
  };

  this.addEvent = () => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        this.onKeyDown();
      }
      if (e.key === "ArrowUp") {
        this.onKeyUp();
      }
    });

    this.$target.addEventListener("mousedown", (e) => {
      const $li = e.target.closest("li");
      if ($li) {
        const { index } = $li.dataset;
        this.onMouseDown(index);
      }
    });

    this.$target.addEventListener("mousemove", (e) => {
      const $li = e.target.closest("li");
      if ($li) {
        const { index } = $li.dataset;
        this.onMouseMove(index);
      }
    });
  };

  this.addEvent();
  this.render();
}
