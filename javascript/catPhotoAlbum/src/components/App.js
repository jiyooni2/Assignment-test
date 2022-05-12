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
    onClick: async (node) => {
      if (node) {
        const index = this.state.depth.findIndex((path) => path.id === node.id);

        const selectedNodes = await request(node.id);

        this.setState({
          ...this.state,
          depth: this.state.depth.slice(0, index + 1),
          nodes: selectedNodes,
        });
      } else {
        const rootNodes = await request();
        this.setState({
          ...this.state,
          isRoot: true,
          nodes: rootNodes,
          depth: [],
        });
      }
    },
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
          isRoot: false,
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
    onBackClick: async () => {
      //Need to implement....
      this.state.depth.pop();
      console.log(this.state, "onBackClick");
      const prevNode = this.state.depth.pop();
      if (!prevNode) {
        const rootNodes = await request();
        this.setState({
          ...this.state,
          nodes: rootNodes,
          depth: [],
          isRoot: true,
        });
      } else {
        const prevNodes = await request(prevNode.id);
        this.setState({
          ...this.state,
          nodes: prevNodes,
          depth: [...this.state.depth, prevNode],
        });
      }
    },
  });

  const imageView = new ImageView({
    $app,
    initialState: { selectedFilePath: null },
    close: () => {
      this.setState({ ...this.state, selectedFilePath: null });
    },
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
