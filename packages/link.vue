<!--
 * User: CHT
 * Date: 2020/5/25
 * Time: 9:11
-->
<template>
  <div class="super-flow__line">
    <canvas ref="canvas"> </canvas>
    <div class="text" :style="textStyle">
      <slot :meta="link.meta">{{ link.meta.desc }}</slot>
    </div>
  </div>
</template>

<script>
import { isFun, isObject, isString, vector } from './utils';

export default {
  props: {
    padding: {
      type: Number,
      default: 50
    },
    linkDesc: [Function, null],
    linkStyle: [Function, null],
    linkBaseStyle: Object,
    index: Number,
    graph: Object,
    link: Object,
    dblclickLink: [Function, null]
  },
  data() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      currentPointList: [],
      currentPathPointList: null,
      ellipse: {},
      inText: false,
      textStyle: {
        left: 0,
        top: 0
      }
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d');
    this.draw();
    this.graph.add('mousemove', this.rootMousemove);
    this.graph.add('dblclick', this.dblclick);
    this.$once('hook:beforeDestroy', () => {
      this.graph.remove('mousemove', this.rootMousemove);
      this.graph.remove('dblclick', this.dblclick);
    });
  },
  computed: {
    styles() {
      return Object.assign(
        {
          hover: '#FF0000',
          color: '#666666',
          textColor: '#666666',
          textHover: '#FF0000',
          font: '14px Arial',
          dotted: false,
          lineDash: [4, 4],
          background: 'rgba(255,255,255,0.6)'
        },
        this.linkBaseStyle
      );
    },
    inPath: {
      get() {
        return this.graph.mouseonLink === this.link;
      },
      set(bol) {
        if (bol && !this.graph.mouseonNode) {
          this.graph.mouseonLink = this.link;
          // this.$el.style.zIndex = '1';
          // this.graph.toLastLink(this.index);
        } else if (this.inPath) {
          this.graph.mouseonLink = null;
          // this.$el.style.zIndex = '0';
        }
      }
    }
  },
  methods: {
    draw() {
      const { pointList, minX, minY, maxX, maxY } = (this.currentPathPointList = this.link.pathPointList);

      this.top = minY - this.padding;
      this.right = maxX + this.padding;
      this.bottom = maxY + this.padding;
      this.left = minX - this.padding;

      this.currentPointList = pointList.map(point => {
        return [Math.floor(point[0] - this.left), Math.floor(point[1] - this.top)];
      });

      this.changeStyle();
      this.initLine();
    },

    changeStyle() {
      this.$refs.canvas.width = this.right - this.left;
      this.$refs.canvas.height = this.bottom - this.top;
      this.$el.style.top = this.top + 'px';
      this.$el.style.left = this.left + 'px';
    },

    initLine() {
      this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      if (this.linkStyle) {
        const style = this.linkStyle(this.link);
        if (isObject(style)) {
          Object.assign(this.styles, style);
        }
      }
      if (this.highlight) {
        const color = this.styles.hover;
        const textColor = this.styles.textHover;
        this.drawLine(color);
        this.drawDesc(textColor);
        this.drawArrow(color);
        this.$el.style.zIndex = '2';
      } else {
        const color = this.styles.color;
        const textColor = this.styles.textColor;
        this.drawLine(color);
        this.drawDesc(textColor);
        this.drawArrow(color);
        this.$el.style.zIndex = '1';
      }
    },

    drawLine(strokeStyle) {
      const lineWidth = 2;
      const ctx = this.ctx;

      ctx.lineJoin = 'round';
      ctx.beginPath();
      if (this.styles.dotted) {
        ctx.setLineDash(this.styles.lineDash);
      }
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = strokeStyle;
      this.currentPointList.forEach((point, idx) => {
        if (idx === 0) {
          ctx.moveTo(...point);
        } else {
          ctx.lineTo(...point);
          ctx.stroke();
        }
      });

      ctx.save();
    },

    drawDesc(color) {
      const { background } = this.styles;
      const [x, y] = this.descPosition();
      this.textStyle = { left: x + 'px', top: y + 'px', background, color };
    },

    drawDesc2(color) {
      const ctx = this.ctx;
      const { desc } = this.link.meta;
      const { font, background } = this.styles;

      this.ctx.font = font;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      // const { text, width } = this.descIntercept(String(desc));
      const height = parseInt(font.match(/(\d+px)/g)[0]);
      const r = Math.max(width, height) / 2 + 5;
      // const descPosition = this.linkDescPosition(width, r);
      const descPosition = this.descPosition();

      const { x, y, a, b } = (this.ellipse = {
        x: descPosition[0],
        y: descPosition[1],
        a: r,
        b: r * 0.8
      });

      this.textStyle = { left: x + 'px', top: y + 'px', background, color };

      // this.ctx.fillStyle = background;
      // ctx.beginPath();
      // ctx.ellipse(x, y, a, b, 0, 0, 2 * Math.PI);
      // ctx.closePath();
      // ctx.fill();

      // this.ctx.fillStyle = color;
      // ctx.fillText(text, x, y);
    },

    linkDescPosition(descWidth, r) {
      const [startX, startY] = this.currentPointList[0];
      const isHorizontal = !!this.link.startDirection[0];
      const [x, y] = this.descPosition();

      return isHorizontal ? [x, y - r - 5] : [startX + r + descWidth / 2, startY - r - 5];
    },

    descPosition() {
      let lineLen = 0;
      let contrastLen = 0;
      let descPosition = null;
      this.currentPointList.reduce((prev, current) => {
        const vec = vector(prev).minus(current).end;
        lineLen += Math.abs(vec[0]) + Math.abs(vec[1]);
        return current;
      });
      this.currentPointList.reduce((prev, current) => {
        const vec = vector(prev).minus(current).end;
        const size = Math.abs(vec[0]) + Math.abs(vec[1]);
        const prevLen = contrastLen;
        const middle = lineLen / 2;
        contrastLen += size;
        if (contrastLen >= lineLen / 2 && descPosition === null) {
          descPosition = prev;
          if (prev[0] === current[0]) {
            if (prev[1] < current[1]) {
              descPosition = vector(prev).add([0, middle - prevLen]).end;
            } else {
              descPosition = vector(prev).add([0, -(middle - prevLen)]).end;
            }
          } else {
            if (prev[0] < current[0]) {
              descPosition = vector(prev).add([middle - prevLen, 0]).end;
            } else {
              descPosition = vector(prev).add([-(middle - prevLen), 0]).end;
            }
          }
        }
        return current;
      });

      return descPosition;
    },

    descIntercept(str) {
      const ctx = this.ctx;
      let strWidth = ctx.measureText(str).width;

      const maxWidth = this.padding * 2 - 10;
      const ellipsis = '...';
      const ellipsisWidth = ctx.measureText(ellipsis).width;
      if (strWidth <= maxWidth || maxWidth <= ellipsisWidth) {
        return {
          text: str,
          width: strWidth
        };
      } else {
        let len = str.length;
        while (strWidth >= maxWidth - ellipsisWidth && len-- > 0) {
          str = str.slice(0, len);
          strWidth = ctx.measureText(str).width;
        }
        return {
          text: str + ellipsis,
          width: maxWidth + ellipsisWidth
        };
      }
    },

    drawArrow(fillStyle) {
      const size = 4;
      const len = this.currentPointList.length;

      if (len < 2) return;

      const start = this.currentPointList[len - 2];
      const end = this.currentPointList[len - 1];
      const ctx = this.ctx;

      // 移动中心点
      ctx.translate(...end);

      // 箭头原方向垂直向下,
      // 算出直线偏离Y的角, 然后旋转 ,
      // rotate是顺时针旋转的, 所以加个负号
      let ang = Math.atan((end[0] - start[0]) / (end[1] - start[1]));
      ctx.beginPath();
      if (end[1] - start[1] >= 0) {
        ctx.rotate(-ang);
      } else {
        ctx.rotate(Math.PI - ang); // 加个180度，反过来
      }
      ctx.fillStyle = fillStyle;
      ctx.lineTo(-size, -size * 2);
      ctx.lineTo(0, -size);
      ctx.lineTo(size, -size * 2);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },

    getCoordinates(evt) {
      const { clientX, clientY } = evt;

      const { top, left } = this.$refs.canvas.getBoundingClientRect();

      return [clientX - left, clientY - top];
    },

    isPointInStroke(evt) {
      const [x, y] = this.getCoordinates(evt);
      return this.link.isPointInLink([this.left + x, this.top + y], this.currentPathPointList);
    },

    rootMousemove({ evt }) {
      this.inPath = this.isPointInStroke(evt);
      // this.inText = this.isInEllipse(evt);
      return this.inPath;
    },

    dblclick({ evt }) {
      this.isInEllipse(evt) && this.dblclickLink?.(this.link, [evt.clientX, evt.clientY]);
    },

    isInEllipse(evt) {
      const { x, y, a, b } = this.ellipse;
      const [mouseX, mouseY] = this.getCoordinates(evt);
      const dx = mouseX - x;
      const dy = mouseY - y;

      return (dx * dx) / (a * a) + (dy * dy) / (b * b) <= 1;
    }
  },
  watch: {
    'link.pathPointList'() {
      this.draw();
    },
    inPath() {
      // this.initLine();
    },
    'link.meta': {
      deep: true,
      handler({ error }) {
        this.highlight = error;
        this.draw();
        this.$emit('changeLinkStyle');
      }
    },
    linkBaseStyle: {
      deep: true,
      handler() {
        this.draw();
      }
    },
    inText(v) {
      // document.body.style.cursor = v ? 'pointer' : '';
    }
  }
};
</script>

<style lang="less">
.super-flow__line {
  position: absolute;
  z-index: 0;

  canvas {
    display: block;
  }

  .text {
    position: absolute;
    color: #fff;
    z-index: 3;
    text-align: center;
    min-width: 10px;
    padding: 3px 6px;
    border-radius: 50%;
    font-size: 12px;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}
</style>
