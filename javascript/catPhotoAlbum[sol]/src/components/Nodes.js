//생성된 DOM을 어디에 append 할지를 $app 파라미터로 받음
//onClick,onBackClick : event Handler(func)
export default function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;

  //Nodes 컴포넌트 렌더링할 DOM 생성
  this.$target = document.createElement("ul");
  $app.appendChild(this.$target);

  //state를 받아서, 현재 컴포넌트의 state를 변경하고 다시 렌더링
  //state만 변경되어도, 자동 리렌더링
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.render = () => {
    //state에 node들이 있으면....
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? "./assets/file.png"
              : "./assets/directory.png";

          return `
          <div class="Node" data-node-id="${node.id}">
            <img src="${iconPath}" />
            <div>${node.name}</div>
          </div>
        `;
        })
        .join("");

      //state기준으로, 현재 최상위 루트면 prev 안넣어주고, 아니면 넣어주고
      this.$target.innerHTML = !this.state.isRoot
        ? `<div class="Node"><img src="./assets/prev.png"></div>${nodesTemplate}`
        : nodesTemplate;
    }
  };

  //인스턴스화 이후, 바로 render함수 실행, new로 생성하자마자 렌더링
  this.render();

  //nodes ul에 add eventListener Bubbling
  this.$target.addEventListener("click", (e) => {
    // console.log(e.target);

    //기준 element에서 자신부터 부모 요소 단위로 출발하여 각 요소가 지정한 선택자에 만족할때까지 탐색
    const $node = e.target.closest(".Node");
    // console.log($node);

    if ($node) {
      //내가 지정한 attribute 얻을 수 있음 ()
      //data- 로 시작하는 attribute get
      const { nodeId } = $node.dataset;

      //nodeID가 없는 element는 prev
      if (!nodeId) {
        this.onBackClick();
        return;
      }

      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);

      if (selectedNode) {
        this.onClick(selectedNode);
      }
    }
  });
}
