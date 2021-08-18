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
        <button @click="addTemplate">addTemplate</button>
      </div>
      <div class="flow-container">
        <super-flow
          ref="superFlow"
          :nodeMenu="nodeMenu"
          :linkMenu="linkMenuList"
          :linkBaseStyle="linkBaseStyle"
          :range="range"
          maxTotal="20"
        >
          <template v-slot:node="{ meta }">
            <div
              @click="handleNodeClick(meta.id)"
              class="flow-node ellipsis"
              :class="{ active: activeNodeId === meta.id }"
            >
              {{ meta.label }}
            </div>
          </template>
          <!-- <template v-slot:desc="{ meta }">
            <div>
              {{ meta.desc }}
            </div>
          </template> -->
        </super-flow>
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
        color: '#5959FF', // line 颜色
        hover: 'red', // line hover 的颜色
        textColor: '#fff', // line 描述文字颜色
        textHover: '#fff', // line 描述文字 hover 颜色
        font: '12px Arial ', // line 描述文字 字体设置 参考 canvas font
        dotted: false, // 是否是虚线
        lineDash: [4, 4], // 虚线时生效
        background: '#5959FF' // 描述文字背景色
      },
      range: ['node2', 'node5']
    };
  },
  methods: {
    removeNode(node) {
      node.remove();
      this.$set(_.find(this.basicNodeList, { id: node.id }), 'disabled', false);
    },
    handleNodeClick(id) {
      this.activeNodeId = id;
    },
    setLinkDesc(link) {
      link.meta.desc = prompt('') || 0;
    },
    onDragend(e, item) {
      const node = this.$refs.superFlow.addNodeIfNeed(e, {
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
      this.$refs.superFlow.addTemplate(nodes);
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
