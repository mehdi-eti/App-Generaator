import { useState } from 'react'
import styled from '@emotion/styled'
import { Menu, Text, Popper, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

const DropDownMenuItem = styled(IoMdArrowDropdown)`
  height: inherit;
  margin-left: 2px;
`

export const DropdownToolbarItem = ({ children, icon: Icon, title, shortcut, active }) => {
    const [opened, handlers] = useDisclosure(false)
    const [referenceElement, setReferenceElement] = useState(null)
    const [visible, setVisible] = useState(false)
    const theme = useMantineTheme()

    return <>
        <div style={{ backgroundColor: active && '#d3fff5', borderRadius: '6px', padding: '15px 10px' }}>
            <Menu
                position='right'
                shadow='xl'
                transition='rotate-right'
                transitionDuration={100}
                transitionTimingFunction='ease'
                opened={opened}
                onOpen={handlers.open}
                onClose={handlers.close}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                ref={setReferenceElement}
                control={
                    <div className='d-flex'> {Icon && Icon} {<DropDownMenuItem />}</div>
                }
            >
                {children}
            </Menu>
        </div>
        <Popper
            arrowSize={5}
            withArrow
            mounted={visible}
            referenceElement={referenceElement}
            transition='scale-x'
            transitionDuration={300}
            transitionTimingFunction='ease'
            arrowStyle={{ backgroundColor: theme.colors.gray[9] }}
            gutter={10}
            position='right'
            placement='center'
        >
            <div className='d-flex bg-dark p-2'>
                <Text size="xs" className='me-2' color='orange'>{title}</Text>
                <Text size="xs" className='ms-1' color='dimmed'>{shortcut}</Text>
            </div>
        </Popper>
    </>
}