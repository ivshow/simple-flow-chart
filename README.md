# simple-flow-chart

- Vue 流程图
- 基于 [Vue-super-flow](https://www.npmjs.com/package/vue-super-flow)

## 安装

```bash
npm install simple-flow-chart
# OR
yarn add simple-flow-chart
```

```js
import SimpleFlowChart from 'simple-flow-chart';
import 'simple-flow-chart/lib/index.css';

Vue.use(SimpleFlowChart);
```

## 属性

| 属性     | 类型               | 默认值             | 描述               |
| -------- | ------------------ | ------------------ | ------------------ |
| range    | `Array`            | `['start', 'end']` | 需要高亮的节点区间 |
| maxTotal | `String \| Number` | `0`                | 最大限制           |

## 方法

| 方法名        | 说明                         | 参数 |
| ------------- | ---------------------------- | ---- |
| addNodeIfNeed | 当拖到容器中时，自动添加节点 | ---- |
| addTemplate   | 添加模板节点                 | ---- |

## 示例

![默认示例](https://s1.ax1x.com/2020/07/27/ai6iAe.gif)

![进阶示例](https://s1.ax1x.com/2020/07/27/aisqzt.gif)
