import { createContext, useContext, useReducer } from 'react'

export const ViewContext = createContext(null)

const initialState = {
    menuOpen: '',
    activeIcon: [],
    activeTool: 'Rectangle',
    toolbarMenuItems: [],
    elements: [],
}

export const viewTypes = {
    'SET_TOOL': 'SET_TOOL',
}

const reducer = (state, action) => {
    switch (action.type) {
        case viewTypes.SET_TOOL:
            return state
        default:
            throw Error(`An unknown Action to Menus Reducer ${action.type}`)
    }
}

export function ViewProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState, () => initialState)
    return (
        <ViewContext.Provider value={[state, dispatch]}>
            {children}
        </ViewContext.Provider>
    )
}

export const useView = () => {
    const context = useContext(ViewContext)
    if (!context) {
        throw Error('useView should be use inside ViewProvider')
    }
    const [state, dispatch] = context

    return [state, dispatch]
}