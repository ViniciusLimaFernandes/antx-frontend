import styled from 'styled-components'

export const Container = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #00000011;
  margin: 0px 5px 5px 0px;
  border-radius: 5px;

  &:hover {
    background: #00000022;
  }
`