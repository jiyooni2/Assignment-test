import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";
import { fetchLanguages } from "./api.js";
import SelectedLanguages from "./SelectedLangauges.js";

export default function App($target) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  const selectedLanguages = new SelectedLanguages({
    $target,
    initialState: [],
  });

  const searchInput = new SearchInput({
    $target,
    initialState: "",
    onChange: async (keyword) => {
      if (keyword.length === 0) {
        this.setState({
          ...this.state,
          fetchedLanguages: [],
        });
      } else {
        const languages = await fetchLanguages(keyword);
        this.setState({
          ...this.state,
          fetchedLanguages: languages,
        });
      }
    },
  });

  const suggestion = new Suggestion({
    $target,
    initialState: { items: [], cursor: 0 },
    onSelect: (language) => {
      alert(language);
      const nextSelectedLanguages = [...this.state.selectedLanguages];
      const index = nextSelectedLanguages.findIndex(
        (selectedLanguage) => selectedLanguage === language
      );
      console.log(nextSelectedLanguages);

      if (index != -1) {
        nextSelectedLanguages.splice(index, 1);
      }
      nextSelectedLanguages.push(language);

      this.setState({
        ...this.state,
        selectedLanguages: nextSelectedLanguages,
      });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    suggestion.setState({
      items: this.state.fetchedLanguages,
      selectedIndex: 0,
    });

    selectedLanguages.setState(this.state.selectedLanguages);
  };
}
