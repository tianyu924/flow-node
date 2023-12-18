const events = new Map()

// 添加事件监听
export const addListener = (name, fn = null) => {
  if (typeof fn === 'function') {
    if (!events.has(name)) {
      events.set(name, [fn])
    } else {
      const arrayFn = events.get(name)
      arrayFn.push(fn)
      events.set(name, arrayFn)
    }
  } else {
    console.error('addListener监听需要接受一个函数')
  }
}

// 触发监听事件
export const emitListener = (name, params) => {
  const emitFns = events.get(name)
  if (emitFns) {
    for (const fn of emitFns) {
      fn(params)
    }
  } else {
    console.warn(`未找到对应的 ${name} 监听事件`)
  }
}