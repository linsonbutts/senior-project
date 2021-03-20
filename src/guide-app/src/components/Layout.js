import React from 'react'
import styled from 'styled-components'

let Container = styled.div`
margin: 10px;
display: flex;
`
function Layout(props){
    return (
        <Container>
            {props.children}
        </Container>
    )
}

export default Layout