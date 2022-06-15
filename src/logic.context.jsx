import { createContext, useContext, useReducer } from 'react'

export const LogicContext = createContext(null)

const initialState = {
    menuOpen: '',
    activeIcon: [],
    activeTool: 'Rectangle',
    toolbarMenuItems: [],
    elements: [],
}

export const logicTypes = {
    'SET_TOOL': 'SET_TOOL',
}

const reducer = (state, action) => {
    switch (action.type) {
        case logicTypes.SET_TOOL:
            return state
        default:
            throw Error(`An unknown Action to Menus Reducer ${action.type}`)
    }
}

export function LogicProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState, () => initialState)
    return (
        <LogicContext.Provider value={[state, dispatch]}>
            {children}
        </LogicContext.Provider>
    )
}

export const useLogic = () => {
    const context = useContext(LogicContext)
    if (!context) {
        throw Error('useLogic should be use inside LogicProvider')
    }
    const [state, dispatch] = context

    return [state, dispatch]
}