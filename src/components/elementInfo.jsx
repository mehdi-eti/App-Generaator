import {Divider} from '@mantine/core'

const ElementInfo = ({elements, activeElement, mouseX, mouseY}) => {

  return <div className='justify-content-center align-items-center bg-white position-absolute shadow p-3 rounded ms-2'>
    <div className='d-inline-block'>
      <strong className='d-block mb-4'>Status for nerds</strong>
    </div>
    <div className='mb-4'>
      <div className='align-items-center justify-content-center w-100 h-auto'>
        <h6 className='text-center'>Scene</h6>
      </div>
      <Divider my='sm' />
      <div className='align-items-center justify-content-between d-flex'>
        <small>Elements</small>
        <small className='fw-bold'>{elements?.length || 0}</small>
      </div>
      <div className='align-items-center justify-content-between d-flex'>
        <small>MouseX</small>
        <small className='fw-bold'>{mouseX || 0}</small>
      </div>
      <div className='align-items-center justify-content-between d-flex'>
        <small>MouseY</small>
        <small className='fw-bold'>{mouseY || 0}</small>
      </div>
    </div>
    {activeElement && (
      <div className='mb-2'>
        <div className='align-items-center justify-content-center w-100 h-auto'>
          <h6 className='text-center'>Element</h6>
        </div>
        <Divider my='sm' />
        <div className='align-items-center justify-content-between d-flex'>
          <small>x1</small>
          <small className='fw-bold'>{Math.round(activeElement?.x1) || 0}</small>
        </div>
        <div className='align-items-center justify-content-between d-flex'>
          <small>y1</small>
          <small className='fw-bold'>{Math.round(activeElement?.y1) || 0}</small>
        </div>
        <div className='align-items-center justify-content-between d-flex'>
          <small>x2</small>
          <small className='fw-bold'>{Math.round(activeElement?.x2) || 0}</small>
        </div>
        <div className='align-items-center justify-content-between d-flex'>
          <small>y2</small>
          <small className='fw-bold'>{Math.round(activeElement?.y2) || 0}</small>
        </div>
        <div className='align-items-center justify-content-between d-flex'>
          <small>Height</small>
          <small className='fw-bold'>{Math.abs(activeElement?.x1 - activeElement?.x2) || 0}</small>
        </div>
        <div className='align-items-center justify-content-between d-flex'>
          <small>Width</small>
          <small className='fw-bold'>{Math.abs(activeElement?.y1 - activeElement?.y2) || 0}</small>
        </div>
        <div className='align-items-center justify-content-between d-flex'>
          <small>Type</small>
          <small className='fw-bold'>{activeElement?.tool || '___'}</small>
        </div>
      </div>
    )}
  </div>
}
export default ElementInfo