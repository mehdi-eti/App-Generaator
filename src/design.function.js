import rough from 'roughjs/bundled/rough.esm'

const generator = rough.generator()

export const createElement = (id, tool, x1, y1, x2, y2, options = {}, active = false) => {
  let roughElement = ''

  switch (tool) {
    case 'Line':
      roughElement = generator.line(x1, y1, x2, y2, {roughness: 0, ...options})
      break
    case 'Rectangle':
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {roughness: 0, ...options})
      break
    case 'Ellipse':
      roughElement = generator.ellipse(x1, y1, x2 - x1, y2 - y1, {roughness: 0, ...options})
      break
    case 'Dash':
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {roughness: 0, strokeLineDash: [10, 10], ...options})
      break
    default:
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1)
  }
  return {x1, y1, x2, y2, roughElement, tool, id, active}
}

export const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))

export const nearPoint = (x, y, x1, y1, name) => Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null

export const positionWithinElement = (x, y, element) => {
  const {roughElement, x1, x2, y1, y2} = element
  const tool = roughElement?.shape

  if (tool === 'rectangle') {
    // const minX = Math.min(x1, x2);
    // const maxX = Math.max(x1, x2)
    // const minY = Math.min(y1, y2)
    // const maxY = Math.max(y1, y2)
    // return x >= minX && x <= maxX && y >= minY && y <= maxY;
    const topLeft = nearPoint(x, y, x1, y1, 'tl')
    const topRight = nearPoint(x, y, x2, y1, 'tr')
    const bottomLeft = nearPoint(x, y, x1, y2, 'bl')
    const bottomRight = nearPoint(x, y, x2, y2, 'br')
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null
    return topLeft || inside || topRight || bottomLeft || bottomRight
  } else {
    const a = {x: x1, y: y1}
    const b = {x: x2, y: y2}
    const c = {x, y}
    const offset = distance(a, b) - (distance(a, c) + distance(b, c))
    // return Math.abs(offset) < 1 ? "inside" : null
    const start = nearPoint(x, y, x1, y1, 'start')
    const end = nearPoint(x, y, x2, y2, 'end')
    const inside = Math.abs(offset) < 1 ? 'inside' : null
    return inside || start || end
  }
}

export const getElementAtPosition = (x, y, elements) => {
  return elements.map(element => ({
    ...element,
    position: positionWithinElement(x, y, element),
  })).find(element => element.position !== null)
}

export const adjustElementCoordinates = element => {
  const {roughElement, x1, x2, y1, y2} = element
  const tool = roughElement?.shape

  if (tool === 'rectangle') {
    const minX = Math.min(x1, x2)
    const maxX = Math.max(x1, x2)
    const minY = Math.min(y1, y2)
    const maxY = Math.max(y1, y2)
    return {x1: minX, y1: minY, x2: maxX, y2: maxY}
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return {x1, y1, x2, y2}
    } else {
      return {x1: x2, y1: y2, x2: x1, y2: y1}
    }
  }
}

export const cursorForPosition = position => {
  switch (position) {
    case 'tl':
    case 'br':
    case 'start':
    case 'end':
      return 'nwse-resize'
    case 'tr':
    case 'bl':
      return 'nesw-resize'
    default:
      return 'move'
  }
}

export const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  const {x1, y1, x2, y2} = coordinates
  switch (position) {
    case 'tl':
    case 'start':
      return {x1: clientX, y1: clientY, x2, y2}
    case 'tr':
      return {x1, y1: clientY, x2: clientX, y2}
    case 'bl':
      return {x1: clientX, y1, x2, y2: clientY}
    case 'br':
    case 'end':
      return {x1, y1, x2: clientX, y2: clientY}
    default:
      return null
  }
}