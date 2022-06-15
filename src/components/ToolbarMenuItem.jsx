import { Menu, Text } from '@mantine/core'

import { useDesign, designTypes } from '../../context/design.context'

export const ToolbarMenuItem = ({ icon: Icon, title, shortcut, active, parent }) => {
    const [, designDispatch] = useDesign()

    function changeToolHandler(title) {
        designDispatch({
            type: designTypes.SET_TOOL,
            activeTool: title,
            parent,
            shortcut
        })
    }

    return (
        <Menu.Item
            component='button'
            onClick={() => changeToolHandler(title, Icon)}
            icon={<Icon />}
            rightSection={<Text size='xs' color={active ? 'cyan' : 'dimmed'}>{shortcut}</Text>}
            color={active && 'cyan'}
        >
            {title}
        </Menu.Item>
    )
}