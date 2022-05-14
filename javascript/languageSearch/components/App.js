import SelectedLanguage from "./SelectedLanguage.js";
import SearchInput from "./SearchInput.js";
import { request } from "./api.js";
import Suggestion from "./Suggestion.js";

export default function App($app) {
  this.state = {
    history: [],
    keyword: "",
    suggestionItems: [],
    selectedIndex: 0,
  };

  const submit = () => {
    const selectedItem = this.state.suggestionItems[this.state.selectedIndex];

    const { history } = this.state;

    const index = history.findIndex((value) => value === selectedItem);
    if (!selectedItem) {
      return;
    }
    alert(selectedItem);

    //exist in history
    if (index !== -1) {
      history.splice(index, 1);

      this.setState({
        ...this.state,
        history: [...history, selectedItem],
      });
      //not exist
    } else {
      if (history.length >= 5) {
        history.shift();
        this.setState({
          ...this.state,
          history: [...history, selectedItem],
        });
      } else {
        this.setState({
          ...this.state,
          history: [...history, selectedItem],
        });
      }
    }
  };

  const selectedLanguage = new SelectedLanguage({
    $app,
    initialState: { history: [""] },
  });

  const searchInput = new SearchInput({
    $app,
    initialState: { keyword: "" },
    onChange: async (keyword) => {
      try {
        const suggestionItems = await request(keyword);
        this.setState({
          ...this.state,
          keyword,
          suggestionItems: suggestionItems ? suggestionItems : [],
          selectedIndex: 0,
        });
      } catch (error) {
        this.setState({
          ...this.state,
          keyword: "",
          suggestionItems: [],
          selectedIndex: 0,
        });
      }
    },
    onSubmit: submit,
  });

  const suggestion = new Suggestion({
    $app,
    initialState: { suggestionItems: [], selectedIndex: 0 },
    onMouseMove: (selectedIndex) => {
      this.setState({
        ...this.state,
        selectedIndex,
      });
    },
    onMouseDown: (selectedIndex) => {
      this.setState({
        ...this.state,
        selectedIndex,
      });
      submit();
    },
    onKeyUp: () => {
      this.setState({
        ...this.state,
        selectedIndex:
          (this.state.selectedIndex - 1) % this.state.suggestionItems.length,
      });
    },
    onKeyDown: () => {
      this.setState({
        ...this.state,
        selectedIndex:
          (this.state.selectedIndex + 1) % this.state.suggestionItems.length,
      });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    selectedLanguage.setState({ history: this.state.history });
    suggestion.setState({
      suggestionItems: this.state.suggestionItems,
      selectedIndex: this.state.selectedIndex,
    });
  };

  const init = () => {
    document.querySelector(".SearchInput__input").focus();
  };

  init();
}
