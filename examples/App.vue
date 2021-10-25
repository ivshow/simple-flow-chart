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
      <div class="flow-container">
        <simple-flow-chart
          ref="flowChart"
          :nodeMenu="nodeMenu"
          :linkMenu="linkMenuList"
          :linkBaseStyle="linkBaseStyle"
          :range="range"
          maxTotal="20"
          :draggable="false"
          @canvasMousedown="canvasMousedown"
          @canvasMousemove="canvasMousemove"
        >
          <template #node="{ meta }">
            <div
              @mousedown.stop
              @click="handleNodeClick(meta.id)"
              class="flow-node ellipsis"
              :class="{ active: activeNodeId === meta.id }"
            >
              {{ meta.label }}
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
  height: 40
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
            label: '删除',
            disable: false,
            selected: link => link.remove()
          }
        ],
        [
          {
            label: '编辑',
            disable: false,
            selected: this.setLinkDesc
          }
        ]
      ],
      linkBaseStyle: {
        lineColor: '#007CCA', // line 颜色
        lineCheck: 'red', //line 校验的颜色
        lineColorMinor: '#FDCF53', // line 没有数字的颜色
        background: 'none' // 描述文字背景色
      },
      range: ['node2', 'node5']
    };
  },
  methods: {
    removeNode(node) {
      node.remove();
      this.$set(_.find(this.basicNodeList, { id: node.id }), 'disabled', false);
      // this.$refs.flowChart.updateFishBoneNode();
    },
    handleNodeClick(id) {
      this.activeNodeId = id;
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
        this.$set(item, 'disabled', true);
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
      console.log('按下');
    },
    canvasMousemove() {
      console.log('移动');
    }
  }
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

  .super-flow__node {
    .flow-node {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      line-height: 40px;
      font-size: 12px;
      text-align: center;
    }
    .active {
      border: 2px solid red;
    }
  }
}
</style>
