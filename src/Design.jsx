import {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import styled from '@emotion/styled'
import rough from 'roughjs/bundled/rough.esm'
import { useMouse } from '@mantine/hooks';

import {designTypes, useDesign} from './design.context'
import Toolbar from './components/Toolbar'
import ElementInfo from './components/elementInfo'
import {
  adjustElementCoordinates,
  createElement,
  cursorForPosition,
  getElementAtPosition,
  resizedCoordinates,
} from './design.function'
// import {useHistory} from './design.hooks'

const Canvas = styled.canvas`
`
const ToolbarWrapper = styled.div`
  /* position: absolute; */
  /* height: 610px;
  width: auto; */
  //padding: 20px 10px;
  z-index: 50;
`

export const Design = () => {
  // const [elements, setElements, undo, redo] = useHistory([])
  // const [elements, setElements, undo, redo] = useHistory(getLocalStorage("elements", []) || [])
  const [actions, setActions] = useState('')
  const [selectedElement, setSelectedElement] = useState(null)
  const [activeElement, setActiveElement] = useState(null)
  const [designState, designDispatch] = useDesign()
  const { ref, x, y } = useMouse()
  const canvas = document.getElementById('left-tab-view')
  const width = canvas.getBoundingClientRect().width
  const activeTool = designState.activeTool
  const elements = designState.elements

  const handleChangeTool = useCallback((e) => {
    if (e.key === 'r') {
      designDispatch({
        type: designTypes.SET_TOOL,
        activeTool: 'Rectangle',
        parent: 'StylesTool',
        shortcut: 'r',
      })
    } else if (e.key === 'l') {
      designDispatch({
        type: designTypes.SET_TOOL,
        activeTool: 'Line',
        parent: 'StylesTool',
        shortcut: 'L',
      })
    } else if (e.key === 'h') {
      designDispatch({
        type: designTypes.SET_TOOL,
        activeTool: 'Hand Tool',
        parent: '',
        shortcut: 'H',
      })
    } else if (e.key === 'm') {
      designDispatch({
        type: designTypes.SET_TOOL,
        activeTool: 'Move Tool',
        parent: '',
        shortcut: 'M',
      })
    } else if (e.keyCode === 46){
      designDispatch({type:designTypes.DELETE_ELEMENT, activeId: activeElement?.id})
      designDispatch({type: designTypes.SET_TOOL, activeTool: 'Move Tool', parent: '', shortcut: 'M'})
      setSelectedElement(null)
      setActiveElement(null)
    }
    // else if ((e.ctrlKey || e.metaKey) && e.keyCode === 90) {
    //   if (e.shiftKey) redo()
    //   else undo()
    // }
  }, [designDispatch, elements])

  useLayoutEffect(() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
    const roughCanvas = rough.canvas(canvas)
    elements.forEach(({roughElement}) => roughCanvas.draw(roughElement))
  }, [elements])

  useEffect(() => {
    document.addEventListener('keydown', handleChangeTool)
    return () => {
      handleDiactiveElement(elements)
      document.removeEventListener('keydown', handleChangeTool)
    }
  }, [handleChangeTool, elements])

  const handleActiveElement = (elements, id, x1, y1, x2, y2, tool) => {
    for (const e of elements) {
      if (e.active) elements[e.id] = createElement(e?.id, e?.tool, e?.x1, e?.y1, e?.x2, e?.y2)
    }
    elements[id] = createElement(id, tool, x1, y1, x2, y2, {stroke: '#ff5757', strokeLineDash: [10, 10]}, true)
    setActiveElement(elements[id])
  }
  const handleDiactiveElement = (elements) => {
    for (const e of elements) {
      if (e.active) elements[e.id] = createElement(e?.id, e?.tool, e?.x1, e?.y1, e?.x2, e?.y2)
    }
  }
  const handleUpdateElement = (id = null, activeTool = null, x1 = null, y1 = null, x2 = null, y2 = null, selected = false) => {
    const elementsCopy = [...elements]
    if (selected) {
      handleActiveElement(elementsCopy, id, x1, y1, x2, y2, activeTool)
      // remove(elements, (e) => e.active)
      // const newActiveElement = createElement(elements.length + 1, "Dash", x1 + 10, y1 - 10, x2 - 10, y2 + 10, {stroke: '#ff5757'}, true)
      // elementsCopy.push(newActiveElement)
    } else {
      handleDiactiveElement(elementsCopy)
      setActiveElement(null)
    }
    // return setElements(elementsCopy, true)
    return designDispatch({type:designTypes.SET_ELEMENT, elements: elementsCopy})
  }
  const handleOnMouseDown = (e) => {
    const rect = e.target.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    if (activeTool === 'Move Tool') {
      // if we are on an elements
      const element = getElementAtPosition(clientX, clientY, elements)
      if (element) {
        const offsetX = clientX - element.x1
        const offsetY = clientY - element.y1
        const el = {...element, offsetX, offsetY, position: element?.position}
        setSelectedElement(el)
        setActiveElement(el)
        handleUpdateElement(el?.id, el?.tool, el?.x1, el?.y1, el?.x2, el?.y2, true)

        if (element.position === 'inside') setActions('moving')
        else setActions('resizing')
      } else {
        setActiveElement(null)
        handleUpdateElement()
      }
    } else if (activeTool === 'Hand Tool') return setActiveElement(null)
    else {
      const id = elements.length
      const element = createElement(id, activeTool, clientX, clientY, clientX, clientY)
      // setElements(prevState => [...prevState, element])
      designDispatch({type:designTypes.UPDATE_ELEMENT, element})
      setActions('drawing')
      setActiveElement(null)
      setActiveElement(element)
      setSelectedElement(element)
    }
  }
  const handleOnMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    // Change Cursor Style
    if (activeTool === 'Move Tool') {
      const element = getElementAtPosition(clientX, clientY, elements)
      e.target.style.cursor = element ? cursorForPosition(element.position) : 'default'
    } else if (activeTool === 'Hand Tool') {
      e.target.style.cursor = 'pointer'
    } else {
      e.target.style.cursor = 'crosshair'
    }

    // Update Element
    if (actions === 'drawing') {
      const index = elements.length - 1
      const {x1, y1} = elements[index]
      handleUpdateElement(index, activeTool, x1, y1, clientX, clientY, true)
    } else if (actions === 'moving') {
      const {x1, y1, x2, y2, id, offsetX, offsetY, tool} = selectedElement
      const width = x2 - x1
      const height = y2 - y1
      const newX1 = clientX - offsetX
      const newY1 = clientY - offsetY
      handleUpdateElement(id, tool, newX1, newY1, newX1 + width, newY1 + height, true)
    } else if (actions === 'resizing') {
      const {id, position, tool, ...coordinates} = selectedElement
      const {x1, y1, x2, y2} = resizedCoordinates(clientX, clientY, position, coordinates)
      handleUpdateElement(id, tool, x1, y1, x2, y2, true)
    }
  }
  const handleOnMouseUp = () => {
    if (selectedElement) {
      const index = selectedElement.id
      const {id, tool} = elements[index]
      // if (actions === 'drawing') {
      //   designDispatch({type: designTypes.SET_TOOL, activeTool: 'Move Tool', parent: '', shortcut: 'M'})
      // }
      if (actions === 'drawing' || actions === 'resizing') {
        const {x1, y1, x2, y2} = adjustElementCoordinates(elements[index])
        handleUpdateElement(id, tool, x1, y1, x2, y2, true)
      }
    }
    setActions('none')
    setSelectedElement(null)
  }

  return <div className=''>
    <ToolbarWrapper className='d-flex justify-content-center align-items-center'>
      <Toolbar />
    </ToolbarWrapper>
    <ElementInfo elements={elements} activeElement={activeElement} mouseX={x} mouseY={y} />
    <Canvas
      id='pre-view-tab'
      width={width}
      ref={ref}
      height={568}
      onMouseDown={handleOnMouseDown}
      onMouseMove={handleOnMouseMove}
      onMouseUp={handleOnMouseUp}
    />
  </div>
}