import React from 'react'
import styled from '@emotion/styled'

const LoadingStyled = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  background-color: #282c34;
  border-radius: 50%;
  margin: 1px;
  animation: jump .5s linear infinite;
`

const Loading = () => {
  return (
    <div className="d-flex">

    </div>
  )
}

export default Loading