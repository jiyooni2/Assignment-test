export default function Suggestion({ $target, initialState, onSelect }) {
  this.state = {
    selectedIndex: initialState.selectedIndex,
    items: initialState.items,
  };

  this.$element = document.createElement("div");
  this.$element.className = "Suggestion";
  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { items = [], selectedIndex } = this.state;
    if (items.length > 0) {
      this.$element.style.display = "block";
      const itemTemplates = items
        .map(
          (item, index) =>
            `<li ${
              index === selectedIndex
                ? "class='Suggestion__item--selected'"
                : ""
            } data-index="${index}">${item}</li>`
        )
        .join("");

      this.$element.innerHTML = `<ul>${itemTemplates}</ul>`;
    } else {
      this.$element.style.display = "none";
      this.$element.innerHTML = "";
    }
  };

  window.addEventListener("keyup", (e) => {
    if (this.state.items.length > 0) {
      const { selectedIndex } = this.state;

      let nextIndex;

      if (e.key === "ArrowUp") {
        nextIndex =
          (selectedIndex - 1 + this.state.items.length) %
          this.state.items.length;
      } else if (e.key === "ArrowDown") {
        nextIndex = (selectedIndex + 1) % this.state.items.length;
      } else if (e.key === "Enter") {
        onSelect(this.state.items[this.state.selectedIndex]);
      }

      this.setState({
        ...this.state,
        selectedIndex: nextIndex,
      });
    }
  });

  this.$element.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { index } = $li.dataset;
      console.log(index);
      try {
        console.log(this.state.items[index]);
        onSelect(this.state.items[parseInt(index)]);
      } catch (e) {
        alert("무언가 잘못됨 다시 선택!");
      }
    }
  });

  this.render();
}
