export const template2 = {
  nodeList: [
    {
      id: 'start',
      width: 120,
      height: 40,
      coordinate: [50, 220],
      meta: {
        width: 120,
        height: 40,
        id: 'start',
        label: '开始'
      }
    },
    {
      id: 'end',
      width: 120,
      height: 40,
      coordinate: [1250, 220],
      meta: {
        width: 120,
        height: 40,
        id: 'end',
        label: '结束'
      }
    },
    {
      id: 'node1',
      width: 120,
      height: 40,
      coordinate: [249, 132],
      meta: {
        width: 120,
        height: 40,
        id: 'node1',
        label: '节点1'
      }
    },
    {
      id: 'node2',
      width: 120,
      height: 40,
      coordinate: [385, 311],
      meta: {
        width: 120,
        height: 40,
        id: 'node2',
        label: '节点2'
      }
    },
    {
      id: 'node3',
      width: 120,
      height: 40,
      coordinate: [592, 132],
      meta: {
        width: 120,
        height: 40,
        id: 'node3',
        label: '节点3'
      }
    },
    {
      id: 'node5',
      width: 120,
      height: 40,
      coordinate: [969, 132],
      meta: {
        width: 120,
        height: 40,
        id: 'node5',
        label: '节点5'
      }
    },
    {
      id: 'node4',
      width: 120,
      height: 40,
      coordinate: [789, 311],
      meta: {
        width: 120,
        height: 40,
        id: 'node4',
        label: '节点4'
      }
    }
  ],
  linkList: [
    {
      id: 'linkjgO01XD9mQPNNcMf',
      startId: 'start',
      endId: 'node1',
      startAt: [120, 20],
      endAt: [60, 40],
      meta: {
        desc: 0,
        error: false
      }
    },
    {
      id: 'linkjiaIiUKPXANsFLeU',
      startId: 'node1',
      endId: 'node2',
      startAt: [60, 40],
      endAt: [60, 0],
      meta: {
        desc: 0,
        error: false
      }
    },
    {
      id: 'linkynzejelu85nWaNrx',
      startId: 'node2',
      endId: 'node3',
      startAt: [60, 0],
      endAt: [60, 40],
      meta: {
        desc: 0,
        error: false
      }
    },
    {
      id: 'linkah3UjcJHzmyzXnCB',
      startId: 'node3',
      endId: 'node4',
      startAt: [60, 40],
      endAt: [60, 0],
      meta: {
        desc: 0,
        error: false
      }
    },
    {
      id: 'linky1W2KLv6MMbgVPLH',
      startId: 'node4',
      endId: 'node5',
      startAt: [60, 0],
      endAt: [60, 40],
      meta: {
        desc: 0,
        error: false
      }
    },
    {
      id: 'linkgIsQgQhaKgDbesbD',
      startId: 'node5',
      endId: 'end',
      startAt: [120, 20],
      endAt: [0, 20],
      meta: {
        desc: 0,
        error: false
      }
    }
  ]
};
