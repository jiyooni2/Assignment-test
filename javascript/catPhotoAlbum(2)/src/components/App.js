import { getNodes, getRootNodes } from "./api.js";
import Breadcrumb from "./Breadcrumb.js";
import ImageView from "./ImageView.js";
import Loading from "./Loading.js";
import Nodes from "./Nodes.js";

const cache = {};

export default function App($app) {
  this.state = {
    isRoot: true,
    nodes: [],
    depth: [],
    filePath: null,
    loading: false,
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: { depth: [] },
    onClick: async (node) => {
      loading.setState({ loading: true });

      if (node) {
        const index = this.state.depth.findIndex((path) => path.id === node.id);
        if (cache[node.id]) {
          this.setState({
            ...this.state,
            depth: this.state.depth.slice(0, index + 1),
            nodes: cache[node.id],
            isRoot: false,
          });
        } else {
          const nextNodes = await getNodes(node.id);
          cache[node.id] = nextNodes;

          this.setState({
            ...this.state,
            depth: this.state.depth.slice(0, index + 1),
            nodes: nextNodes,
            isRoot: false,
          });
        }
      } else {
        if (cache.rootNodes) {
          this.setState({
            ...this.state,
            depth: [],
            nodes: cache.rootNodes,
            isRoot: true,
          });
        } else {
          const rootNodes = await getRootNodes();
          cache[rootNodse] = rootNodes;
          this.setState({
            ...this.state,
            depth: [],
            nodes: rootNodes,
            isRoot: true,
          });
        }
      }
      loading.setState({ loading: false });
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: true,
      nodes: [],
    },
    onClick: async (node) => {
      loading.setState({ loading: true });

      if (node.type === "DIRECTORY") {
        if (cache[node.id]) {
          this.setState({
            ...this.state,
            isRoot: false,
            nodes: cache[node.id],
            depth: [...this.state.depth, node],
          });
        } else {
          const nextNodes = await getNodes(node.id);
          cache[node.id] = nextNodes;

          this.setState({
            ...this.state,
            isRoot: false,
            nodes: nextNodes,
            depth: [...this.state.depth, node],
          });
        }
      } else if (node.type === "FILE") {
        this.setState({
          ...this.state,
          filePath: node.filePath,
        });
      }
      loading.setState({ loading: false });
    },
    onBackClick: async () => {
      this.state.depth.pop();

      const prevNode = this.state.depth.pop();
      if (!prevNode) {
        loading.setState({ loading: true });
        if (cache.rootNodes) {
          this.setState({
            ...this.state,
            isRoot: true,
            nodes: cache.rootNodes,
            depth: [],
          });
        } else {
          const rootNodes = await getRootNodes();
          cache.rootNodes = rootNodes;
          this.setState({
            ...this.state,
            isRoot: true,
            nodes: rootNodes,
            depth: [],
          });
        }
        loading.setState({ loading: false });
      } else {
        loading.setState({ loading: true });

        if (cache[prevNode.id]) {
          this.setState({
            ...this.state,
            isRoot: false,
            nodes: cache[prevNode.id],
            depth: [...this.state.depth, prevNode],
          });
        } else {
          const nextNodes = await getNodes(prevNode.id);
          cache[prevNode.id] = nextNodes;
          this.setState({
            ...this.state,
            isRoot: false,
            nodes: nextNodes,
            depth: [...this.state.depth, prevNode],
          });
        }

        loading.setState({ loading: false });
      }
    },
  });

  const imageView = new ImageView({
    $app,
    initialState: { filePath: null },
    onClose: () => {
      this.setState({
        ...this.state,
        filePath: null,
      });
    },
  });

  const loading = new Loading({
    $app,
    initialState: { loading: true },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    breadcrumb.setState({
      depth: this.state.depth,
    });
    imageView.setState({
      filePath: this.state.filePath,
    });
  };

  const init = async () => {
    loading.setState({ loading: true });

    const rootNodes = await getRootNodes();
    cache.rootNodes = rootNodes;
    nodes.setState({
      isRoot: true,
      nodes: rootNodes,
    });
    breadcrumb.setState({
      depth: [],
    });
    imageView.setState({
      filePath: null,
    });
    loading.setState({ loading: false });
  };

  init();
}
