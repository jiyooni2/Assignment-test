import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import ImageView from "./ImageView.js";
import Loading from "./Loading.js";
import { request } from "./api.js";

const cache = {};

export default function App($app) {
  //isRoot : 최상위 경로인지,
  //depth : 어디어디 디렉토리 거쳐서 있는지
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: [],
    onClick: (index) => {
      if (index === null) {
        this.setState({
          ...this.state,
          depth: [],
          isRoot: true,
          nodes: cache.rootNodes,
        });
        return;
      }

      if (index === this.state.depth.length - 1) {
        return;
      }

      const nextState = { ...this.state };
      const nextDepth = this.state.depth.slice(0, index + 1);

      this.setState({
        ...nextState,
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.length - 1].id],
      });
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: [],
    onClick: async (node) => {
      try {
        //onClick을 하는 순간, AppComponent의 rerendering이 필요
        this.setState({
          ...this.state,
          isLoading: true,
        });
        if (node.type === "DIRECTORY") {
          //cache에 존재한다면, 불러오기
          if (cache[node.id]) {
            this.setState({
              ...this.state,
              isRoot: false,
              depth: [...this.state.depth, node],
              nodes: cache[node.id],
              isLoading: false,
            });
            //cache에 존재하지 않으면, request
          } else {
            const nextNodes = await request(node.id);
            this.setState({
              ...this.state,
              isRoot: false,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
              isLoading: false,
            });

            cache[node.id] = nextNodes;
          }
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            isRoot: false,
            selectedFilePath: node.filePath,
            isLoading: false,
          });
        }
      } catch (e) {
        // 에러처리하기
      }
    },
    onBackClick: async () => {
      try {
        //state에서 depth만 뺴고 그대로 넘겨줌
        const nextState = { ...this.state };
        nextState.depth.pop();

        const prevNodeId =
          nextState.depth.length === 0
            ? null
            : nextState.depth[nextState.depth.length - 1].id;

        this.setState({
          ...nextState,
        });

        //root로 온 경우
        if (prevNodeId === null) {
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: cache.rootNodes,
          });
          //root가 아닌 경우
        } else {
          this.setState({
            ...nextState,
            isRoot: false,
            nodes: cache[prevNodeId],
          });
        }
      } catch (e) {
        // 에러처리하기
      }
    },
  });

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath,
    modalClose: () => {
      this.setState({
        ...this.state,
        selectedFilePath: null,
      });
    },
  });

  const loading = new Loading({
    $app,
    initialState: this.state.isLoading,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
    loading.setState(this.state.isLoading);
  };

  const init = async () => {
    try {
      this.setState({
        ...this.state,
        isRoot: true,
        isLoading: true,
      });
      //api호출, not specific node Id, all the nodes(root)
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });

      cache.rootNodes = rootNodes;
    } catch (e) {
      // 에러처리 하기
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  init();
}
