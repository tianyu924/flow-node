
import { uuid } from './server'


// start、end、where、input、out、parse、computed
export const mockData = [
  {
    id: uuid(),
    type: 101,
    data: {
      title: '开始'
    }
  },
  {
    id: uuid(),
    type: 2,
    data: {
      title: '输入'
    }
  },
  {
    id: uuid(),
    isConditionNode: true,
    children: [
      {
        id: uuid(),
        children: [
          {
            id: uuid(),
            type: 1,
            data: {
              title: '条件1',
              text: '金额大于100'
            }
          },
          {
            id: uuid(),
            type: 4,
            data: {
              title: '',
              text: '解析userInfo'
            }
          }
        ]
      },
      {
        id: uuid(),
        children: [
          {
            id: uuid(),
            name: '条件2',
            type: 1,
            data: {
              title: '条件2',
              text: '金额大于200'
            }
          }
        ]
      }
    ]
  },
  {
    id: uuid(),
    type: 102,
    data: {
      title: '结束'
    }
  }
]


export const fieldLeftData = [
  {
    title: '节点1',
    value: '节点1',
    disabled: true,
    key: uuid(),
    children: [
      {
        title: 'code',
        value: 'code',
        key: uuid(),
        scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'data',
        value: 'data',
        key: uuid(),
        scopedSlots: {
          title: 'custom',
        },
        children: [
          {
            title: 'id',
            value: 'id',
            key: uuid(),
            scopedSlots: {
              title: 'custom',
            }
          },
          {
            title: 'name',
            value: 'name',
            key: uuid(),
            scopedSlots: {
              title: 'custom',
            }
          },
          {
            title: 'remark',
            value: 'remark',
            key: uuid(),
            scopedSlots: {
              title: 'custom',
            }
          },
          {
            title: 'status',
            value: 'status',
            key: uuid(),
            scopedSlots: {
              title: 'custom',
            }
          },
          {
            title: 'updateBy',
            value: 'updateBy',
            key: uuid(),
            scopedSlots: {
              title: 'custom',
            }
          },
          {
            title: 'updateTime',
            value: 'updateTime',
            key: uuid(),
            scopedSlots: {
              title: 'custom',
            }
          },
          {
            title: 'host',
            value: 'host',
            key: uuid(),
            scopedSlots: {
              title: 'custom',
            }
          },
          {
            title: 'design',
            value: 'design',
            key: uuid(),
            scopedSlots: {
              title: 'custom',
            }
          }
        ]
      }
    ]
  }
]

export const fieldRightData = [
  {
    title: 'code',
    value: 'code',
    key: uuid(),
    level: 1,
    scopedSlots: {
      title: 'custom',
    }
  },
  {
    title: 'data',
    value: 'data',
    key: uuid(),
    level: 1,
    scopedSlots: {
      title: 'custom',
    },
    children: [
      {
        title: 'id', value: 'id', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'name', value: 'name', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'province', value: 'province', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'area', value: 'area', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'street', value: 'street', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'category', value: 'category', key: uuid(), level: 2, scopedSlots: {
          title: 'custom'
        },
        children: [
          {
            title: 'nbi', value: 'nbi', key: uuid(), level: 3, scopedSlots: {
              title: 'custom',
            }
          }
        ]
      },
      {
        title: 'date', value: 'date', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'time', value: 'time', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'city', value: 'city', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'parentId', value: 'parentId', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'theme', value: 'theme', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
      {
        title: 'unitnote', value: 'unitnote', key: uuid(), level: 2, scopedSlots: {
          title: 'custom',
        }
      },
    ],
  }
]