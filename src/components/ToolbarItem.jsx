import { useState } from 'react'
import { Text, ActionIcon, Popper, useMantineTheme } from '@mantine/core'

import { useDesign, designTypes } from '../design.context'

export const ToolbarItem = ({ icon: Icon, title, active, shortcut }) => {
    const [, designDispatch] = useDesign()
    const [referenceElement, setReferenceElement] = useState(null)
    const [visible, setVisible] = useState(false)
    const theme = useMantineTheme()

    function changeToolHandler(title) {
        designDispatch({
            type: designTypes.SET_TOOL,
            activeTool: title,
            shortcut
        })
    }

    return <>
        <div style={{ backgroundColor: active && '#fff1a0a0' }} className="rounded">
            <ActionIcon
                ref={setReferenceElement}
                variant='transparent'
                style={{ margin: '8px 10px' }}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                onClick={() => changeToolHandler(title)}
            >
                {Icon}
            </ActionIcon>
        </div>
        <Popper
            arrowSize={5}
            withArrow
            mounted={visible}
            referenceElement={referenceElement}
            transition='fade'
            transitionDuration={400}
            transitionTimingFunction='ease'
            arrowStyle={{ backgroundColor: theme.colors.gray[9] }}
            gutter={10}
            position='bottom'
            placement='center'
        >
            <div className='d-flex bg-dark p-2'>
                <Text size="xs" className='me-2' color='orange'>{title}</Text>
                <Text size="xs" className='ms-1' color='dimmed'>{shortcut}</Text>
            </div>
        </Popper>
    </>
}