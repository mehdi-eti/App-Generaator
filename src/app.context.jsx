import { createContext, useContext, useReducer } from 'react'

export const AppContext = createContext(null)

const initialState = {
    menuOpen: '',
    activeIcon: [],
    activeTool: 'Rectangle',
    toolbarMenuItems: [],
    elements: [],
}

export const appTypes = {
    'SET_TOOL': 'SET_TOOL',
}

const reducer = (state, action) => {
    switch (action.type) {
        case appTypes.SET_TOOL:
            return state
        default:
            throw Error(`An unknown Action to Menus Reducer ${action.type}`)
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState, () => initialState)
    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw Error('useApp should be use inside AppProvider')
    }
    const [state, dispatch] = context

    return [state, dispatch]
}