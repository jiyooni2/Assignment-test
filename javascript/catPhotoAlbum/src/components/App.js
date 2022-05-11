import Nodes from "./Nodes.js";
import Breadcrumb from "./Breadcrumb.js";
import { request } from "./api.js";
import ImageView from "./ImageView.js";

export default function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: { depth: [] },
  });

  const nodes = new Nodes({
    $app,
    initialState: {
      nodes: this.state.nodes,
      isRoot: this.state.isRoot,
    },
    onClick: async (node) => {
      console.log(node);
      if (node.type === "DIRECTORY") {
        const nextNodes = await request(node.id);
        console.log(nextNodes);
        this.setState({
          ...this.state,
          nodes: nextNodes,
          depth: [...this.state.depth, node],
        });
      } else if (node.type === "FILE") {
        this.setState({
          ...this.state,
          selectedFilePath: node.filePath,
        });
      }
    },
    onBackClick: () => {
      //Need to implement....
    },
  });

  const imageView = new ImageView({
    $app,
    initialState: { selectedFilePath: this.state.selectedFilePath },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    nodes.setState({
      nodes: this.state.nodes,
      isRoot: this.state.isRoot,
    });
    breadcrumb.setState({
      depth: this.state.depth,
    });
    imageView.setState({
      selectedFilePath: this.state.selectedFilePath,
    });
  };

  const init = async () => {
    const rootNodes = await request();

    nodes.setState({
      nodes: rootNodes,
      isRoot: true,
      depth: [],
    });
  };

  init();
}
