import { useDesign } from '../design.context'
import { LineIcon, RectangleIcon, EllipseIcon, PenIcon, PencilIcon, MoveIcon, HandIcon } from './Icons'

import { ToolbarItem } from './ToolbarItem'

const Toolbar = () => {
  const [designState] = useDesign()
  const activeIcon = designState.activeIcon
  const activeTool = designState.activeTool
  let StylesToolsIcon = activeIcon[1]['tool'] === 'Rectangle' ? <RectangleIcon /> :
    activeIcon[1]['tool'] === 'Line' ? <LineIcon /> :
      activeIcon[1]['tool'] === 'Ellipse' && <EllipseIcon />
  let PenToolsIcon = activeIcon[2]['tool'] === 'Pen' ? <PenIcon /> :
    activeIcon[2]['tool'] === 'Pencil' && <PencilIcon />


  return <div className='d-flex border rounded shadow p-1 px-2 justify-content-center align-items-center' style={{ justifyItems: 'center' }}>
    {/* <DropdownToolbarItem
      icon={StylesToolsIcon}
      active={includes(['Rectangle', 'Line', 'Ellipse'], activeTool)}
      title={activeIcon[1]['tool']}
      shortcut={activeIcon[1]['sh']}
    >
      <ToolbarMenuItem
        icon={RectangleIcon}
        title='Rectangle'
        shortcut='R'
        active={activeIcon[1]['tool'] === 'Rectangle'}
        parent='StylesTool'
      />
      <Divider size='xs' />
      <ToolbarMenuItem
        icon={LineIcon}
        title='Line'
        shortcut='L'
        active={activeIcon[1]['tool'] === 'Line'}
        parent='StylesTool'
      />
      <Divider size='xs' />
      <ToolbarMenuItem
        icon={EllipseIcon}
        title='Ellipse'
        shortcut='E'
        active={activeIcon[1]['tool'] === 'Ellipse'}
        parent='StylesTool'
      />
    </DropdownToolbarItem> */}
    {/* <DropdownToolbarItem
      icon={PenToolsIcon}
      active={includes(['Pen', 'Pencil'], activeTool)}
      title={activeIcon[2]['tool']}
      shortcut={activeIcon[1]['sh']}
    >
      <ToolbarMenuItem
        icon={PenIcon}
        title='Pen'
        shortcut='P'
        active={activeIcon[2]['tool'] === 'Pen'}
        parent='PenTool'
      />
      <Divider size='xs' />
      <ToolbarMenuItem
        icon={PencilIcon}
        title='Pencil'
        shortcut='Shift+P'
        active={activeIcon[2]['tool'] === 'Pencil'}
        parent='PenTool'
      />
    </DropdownToolbarItem> */}
    <ToolbarItem
      icon={<MoveIcon color="#fff" />}
      active={activeTool === 'Move Tool'}
      shortcut='M'
      title='Move Tool'
    />
    <ToolbarItem
      icon={<RectangleIcon />}
      active={activeTool === 'Rectangle'}
      shortcut='R'
      title='Rectangle'
    />
    <ToolbarItem
      icon={<LineIcon />}
      active={activeTool === 'Line'}
      shortcut='L'
      title='Line'
    />
    <ToolbarItem
      icon={<HandIcon />}
      active={activeTool === 'Hand Tool'}
      shortcut='H'
      title='Hand Tool'
    />
  </div>
}

export default Toolbar
