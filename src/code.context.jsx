import { createContext, useContext, useReducer } from 'react'
import { findIndex } from 'lodash'

export const CodeContext = createContext(null)

const initialState = {
    menuOpen: '',
    activeIcon: [],
    activeTool: 'Rectangle',
    toolbarMenuItems: [],
    elements: [],
}

export const codeTypes = {
    'SET_TOOL': 'SET_TOOL',
}

const reducer = (state, action) => {
    switch (action.type) {
        case codeTypes.SET_TOOL:
            return state
        default:
            throw Error(`An unknown Action to Menus Reducer ${action.type}`)
    }
}

export function DesignProvider({ children }) {
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