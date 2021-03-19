import React from 'react'

let Container = styled.div`
margin: 10px;
`
function Layout(props){
    return (
        <Container>
            {props.children}
        </Container>
    )
}

export default Layout