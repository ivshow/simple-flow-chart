<!--
 * @Author : zhangmm
 * @Date   : 2021-03-30 16:48
-->

<template>
  <div>
    <div class="super-flow-demo1">
      <div class="node-container">
        <div class="node-item" v-for="item in basicNodeList" :key="item.id">
          <button :disabled="item.disabled" draggable @dragend="onDragend($event, item)">
            {{ item.label }}
          </button>
        </div>
        <div class="node-item">
          <button @click="addTemplate">添加模板</button>
        </div>
        <div class="node-item">
          <button @click="saveTemplate">保存模板</button>
        </div>
      </div>
      <div class="flow-container" ref="flowContainer">
        <simple-flow-chart
          ref="flowChart"
          :nodeMenu="nodeMenu"
          :linkMenu="linkMenuList"
          :linkBaseStyle="linkBaseStyle"
          :range="range"
          :nodeList="nodeList"
          :linkList="linkList"
          :el="el"
          maxTotal="20"
          @canvasMousedown="canvasMousedown"
          @canvasMousemove="canvasMousemove"
          draggableMultiple
        >
          <template #node="{ meta }">
            <div class="node-wrapper">
              <div
                @click="handleNodeClick(meta.id)"
                class="flow-node ellipsis"
                :class="{ active: activeNodeId === meta.id }"
              >
                {{ meta.label }}
              </div>
            </div>
          </template>
          <!-- <template #menuItem="{ item }">
            <div>{{ item.label }}</div>
          </template> -->
          <!-- <template v-slot:desc="{ meta }">
            <div>
              {{ meta.desc }}
            </div>
          </template> -->
        </simple-flow-chart>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

const basicNodeInfo = {
  width: 120,
  height: 50
};

export default {
  data() {
    return {
      activeNodeId: null,
      basicNodeList: [
        {
          id: 'start',
          label: '开始'
        },
        {
          id: 'node1',
          label: '节点1'
        },
        {
          id: 'node2',
          label: '节点2'
        },
        {
          id: 'node3',
          label: '节点3'
        },
        {
          id: 'node4',
          label: '节点4'
        },
        {
          id: 'node5',
          label: '节点5'
        },
        {
          id: 'end',
          label: '结束'
        }
      ],
      copyBasicNodeList: [
        {
          id: 'start',
          label: '开始'
        },
        {
          id: 'node1',
          label: '节点1'
        },
        {
          id: 'node2',
          label: '节点2'
        },
        {
          id: 'node3',
          label: '节点3'
        },
        {
          id: 'node4',
          label: '节点4'
        },
        {
          id: 'node5',
          label: '节点5'
        },
        {
          id: 'end',
          label: '结束'
        }
      ],
      nodeMenu: [
        [
          {
            label: '删除',
            selected: this.removeNode
          }
        ]
      ],
      linkMenuList: [
        [
          {
            label: '编辑',
            disable: false,
            selected: this.setLinkDesc
          }
        ],
        [
          {
            label: '删除',
            disable: false,
            selected: link => link.remove()
          }
        ]
      ],
      linkBaseStyle: {
        lineColor: '#007CCA', // line 颜色
        lineCheck: 'red', //line 校验的颜色
        lineColorMinor: '#FDCF53', // line 没有数字的颜色
        background: 'none' // 描述文字背景色
      },
      range: ['node2', 'node5'],
      nodeList: [],
      linkList:[],
      el: null
    };
  },
  methods: {
    getBasicNodeList() {
      const ids = this.$refs.flowChart.graph.nodeList.map(e => e.id);
      this.basicNodeList = _.reject(this.copyBasicNodeList, e => {
        return ids.includes(e.id);
      });
    },
    removeNode(node) {
      node.remove();
      this.getBasicNodeList();
      // this.$refs.flowChart.updateFishBoneNode();
    },
    handleNodeClick(id) {
      this.activeNodeId = id;
      // console.log(JSON.stringify(this.$refs.flowChart.graph.nodeList))
      // console.log(JSON.stringify(this.$refs.flowChart.graph.linkList))
    },
    setLinkDesc(link) {
      link.meta.desc = prompt('');
    },
    onDragend(e, item) {
      // const node = this.$refs.flowChart.addNode(
      //   {
      //     ...basicNodeInfo,
      //     ...item
      //   },
      //   'fishBone',
      //   2
      // );

      const node = this.$refs.flowChart.addNodeIfNeed(e, {
        ...basicNodeInfo,
        ...item
      });

      if (node) {
        this.handleNodeClick(item.id);
        this.getBasicNodeList();
      }
    },
    addTemplate() {
      const nodes = this.basicNodeList.map(x => ({ ...basicNodeInfo, ...x }));
      // nodes.splice(2, 1);
      this.$refs.flowChart.addFishBoneTemplate(nodes);
    },
    saveTemplate() {
      const data = this.$refs.flowChart.toJSON();
      console.log('%c 🍭 data: ', 'font-size:20px;background-color: #ED9EC7;color:#fff;', data);
    },
    canvasMousedown() {
      // console.log('按下');
    },
    canvasMousemove() {
      // console.log('移动');
    }
  },
  mounted() {
    this.nodeList = JSON.parse('[{"id":"node1","width":120,"height":50,"coordinate":[88,85],"meta":{"width":120,"height":50,"id":"node1","label":"节点1"}},{"id":"node2","width":120,"height":50,"coordinate":[284,201],"meta":{"width":120,"height":50,"id":"node2","label":"节点2"}}]')
    this.linkList = JSON.parse('[{"id":"linkS4UP4MvmicS0RCYe","startId":"node1","endId":"node2","startAt":[60,50],"endAt":[60,0],"meta":{"desc":0,"error":false}}]')
    this.$nextTick(()=> {
      this.getBasicNodeList();
      this.el = this.$refs.flowContainer;
    })
    
  },
};
</script>

<style lang="less">
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
}

.node-item {
  margin-top: 20px;
}

.link-base-style-form {
  .el-form-item {
    margin-bottom: 12px;
  }

  padding-bottom: 20px;
  border-bottom: 1px solid #dcdcdc;
}

.super-flow-demo1 {
  margin-top: 20px;
  width: 100%;
  height: 800px;
  background-color: #f5f5f5;
  @list-width: 200px;

  > .node-container {
    width: @list-width;
    float: left;
    height: 100%;
    text-align: center;
    background-color: #ffffff;
  }

  > .flow-container {
    width: calc(100% - @list-width);
    float: left;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .node-wrapper {
    padding: 5px;
    height: 100%;
    box-sizing: border-box;
    .flow-node {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      line-height: 40px;
      font-size: 12px;
      text-align: center;
      background: #fff;
    }
    // .active {
    //   border: 2px solid red;
    // }
  }
  .node-wrapper:hover {
    border: 5px solid;
    padding: 0;
  }
}
</style>
