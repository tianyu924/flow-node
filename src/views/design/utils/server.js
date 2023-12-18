import * as config from './config'
export const uuid = () => {
  let temp_url = URL.createObjectURL(new Blob())
  let uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url)
  return uuid.substr(uuid.lastIndexOf('/') + 1)
  // return crypto.randomUUID()
}

// 根据key找到对应的节点
export const findNode = (targetKey, list) => {
  for (const node of list) {
    if (node.key === targetKey) {
      return node
    } else {
      if (node.children) {
        return findNode(targetKey, node.children)
      }
    }
  }
}
// 根据key找到对应节点的父级节点
export const getParentNode = (targetKey, list, parentNode = null) => {
  const isFind = list.some(node => node.key === targetKey)
  if (isFind) {
    return parentNode
  } else {
    for (const node of list) {
      if (node.children) {
        return getParentNode(targetKey, node.children, node)
      }
    }
  }
}

export const getChildrenNode = (targetNode) => {
  const nodes = []
  const process = (list) => {
    for (const childNode of list) {
      nodes.push({ key: childNode.key, title: childNode.title })
      if (childNode.children) {
        process(childNode.children)
      }
    }
  }
  process(targetNode.children || [])
  return nodes
}

// 获取指定元素的中间对称点位置信息
export const getClientRect = (event, rootClient) => {
  if (!event) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }
  }
  const target = event.target ? event.target.getBoundingClientRect() : event.getBoundingClientRect()
  return {
    x: (target.left + (target.width / 2) - rootClient.left),
    y: (target.top + (target.height / 2) - rootClient.top),
    width: target.width,
    height: target.height
  }
}

/** 
 * 计算映射节点的映射关系
 * ONE_FOR_ONE      一对一
 * ONE_FOR_MANY     一对多
 * MANY_FOR_ONE     多对一
 * MANY_FOR_MANY    多对多
 */

export const computeMapRelation = (mapNode = null) => {
  if (mapNode) {
    let leftLinePoints = mapNode[config.LEFT_LINE_POINTS]
    let rightLinePoints = mapNode[config.RIGHT_LINE_POINTS]
    // 过滤相同key和null的元素
    const unique = (data, key) => {
      const rr = new Map()
      return data.filter((item) => item && !rr.has(item[key]) && rr.set(item[key], 1))
    }
    leftLinePoints = unique(leftLinePoints, 'key')
    rightLinePoints = unique(rightLinePoints, 'key')
    if (leftLinePoints.length === 1 && rightLinePoints.length === 1) {
      return config.ONE_FOR_ONE
    } else if (leftLinePoints.length === 1 && rightLinePoints.length > 1) {
      return config.ONE_FOR_MANY
    } else if (leftLinePoints.length > 1 && rightLinePoints.length === 1) {
      return config.MANY_FOR_ONE
    } else {
      return config.MANY_FOR_MANY
    }
  } else {
    return null
  }
}
// 生成每周列表配置
export const getWeekList = () => {
  const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const list = []
  for (const [index, label] of weeks.entries()) {
    list.push({
      label: label,
      value: index + 1
    })
  }
  return list
}

// 生成月天数列表配置
export const getMonthDaysList = (isPushLastDay = true) => {
  const startDay = 1
  const endDay = 30
  const list = []
  for (let i = 1; i <= endDay; i++) {
    list.push({
      label: `${i}号`,
      value: i
    })
  }
  if (isPushLastDay) {
    list.push(...[
      {
        label: '倒数第二天',
        value: endDay + 1
      },
      {
        label: '倒数第一天',
        value: endDay + 2
      }
    ])
  }
  return list
}