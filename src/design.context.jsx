import {createContext, useContext, useReducer} from 'react'
import {findIndex} from 'lodash'

import {getLocalStorage} from './functions'

export const DesignContext = createContext(null)

const initialState = {
  activeIcon: [
    {name: 'HandTool', tool: 'Move', sh: 'H'},
    {name: 'StylesTool', tool: 'Rectangle', sh: 'R'},
    {name: 'PenTool', tool: 'Pen', sh: 'P'},
  ],
  activeTool: 'Rectangle',
  toolbarMenuItems: [],
  elements: getLocalStorage('elements', []),
  elementSelected: {},
  currentChartType: "bar",
  currentItemBackgroundColor: "transparent",
  currentItemEndArrowhead: "arrow",
  currentItemFillStyle: "hachure",
  currentItemFontFamily: 1,
  currentItemFontSize: 36,
  currentItemLinearStrokeSharpness: "round",
  currentItemOpacity: 100,
  currentItemRoughness: 0,
  currentItemStartArrowhead: "bar",
  currentItemStrokeColor: "#000000",
  currentItemStrokeSharpness: "sharp",
  currentItemStrokeStyle: "solid",
  currentItemStrokeWidth: 1,
  currentItemTextAlign: "center",
  cursorButton: "down",
  editingGroupId: null,
  exportBackground: true,
  exportEmbedScene: false,
  exportScale: 1,
  exportWithDarkMode: false,
  gridSize: 20,
  lastPointerDownWith: "mouse",
  name: "",
  openMenu: null,
  penDetected: false,
  penMode: false,
  previousSelectedElementIds: {},
  scrollX: -5504.951414543297,
  scrollY: 5247.29156652932,
  scrolledOutside: false,
  selectedElementIds: {},
  selectedGroupIds: {},
  shouldCacheIgnoreZoom: false,
  showStats: true,
  theme: "light",
  viewBackgroundColor: "#ffffff",
  zenModeEnabled: false,
  zoom: {value: 1},
}

export const designTypes = {
  'SET_TOOL': 'SET_TOOL',
  'SET_ACTIVE_ELEMENT': 'SET_ACTIVE_ELEMENT',
  'SET_ELEMENT': 'SET_ELEMENT',
  'UPDATE_ELEMENT': 'UPDATE_ELEMENT',
  'DELETE_ELEMENT': 'DELETE_ELEMENT',
}

const reducer = (state, action) => {
  switch (action.type) {
    case designTypes.SET_TOOL:
      const originalActiveIcon = state.activeIcon
      const indexActiveIcon = findIndex(originalActiveIcon, (i) => i.name === action.parent)
      originalActiveIcon[indexActiveIcon] = {...state.activeIcon[indexActiveIcon]}
      originalActiveIcon[indexActiveIcon].tool = action.activeTool
      originalActiveIcon[indexActiveIcon].sh = action.shortcut
      // const updateIcon = find(originalIconActive, (p) => p.name === action.parent ? p.tool = action.activeTool : null)
      return {
        ...state,
        activeTool: action.activeTool,
        activeIcon: originalActiveIcon,
      }
    case designTypes.SET_ACTIVE_ELEMENT:
      return {
        ...state,
        elementActive: action.elementActive,
      }
    case designTypes.SET_ELEMENT:
      return {
        ...state,
        elements: [...action.elements],
      }
    case designTypes.UPDATE_ELEMENT:
      return {
        ...state,
        elements: [...state.elements, action.element],
      }
    case designTypes.DELETE_ELEMENT:
      const copyElements = [...state.elements]
      const newElements = copyElements.filter(m => m.id !== action.activeId)
      return {
        ...state,
        elements: [...newElements],
      }
    default:
      throw Error(`An unknown Action to Menus Reducer ${action.type}`)
  }
}

export function DesignProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState, () => initialState)
  return (
    <DesignContext.Provider value={[state, dispatch]}>
      {children}
    </DesignContext.Provider>
  )
}

export const useDesign = () => {
  const context = useContext(DesignContext)
  if (!context) {
    throw Error('useDesign should be use inside DesignProvider')
  }
  const [state, dispatch] = context

  return [state, dispatch]
}