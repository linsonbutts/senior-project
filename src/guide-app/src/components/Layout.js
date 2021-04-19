import React from 'react'
import styled from 'styled-components'
import { mediaController } from './mediaController';

const Page = styled.div`
  margin: auto;
  font-family: "sans-serif";
  text-align: center;


`;
let Container = styled.div`
margin: auto;
font-family: "sans-serif";
display:flex;
flex-direction: row;
flex-wrap: wrap;

@media ${mediaController.laptop} { 
    max-width: 800px;
  }

  @media ${mediaController.desktop} {
    max-width: 1400px;
  }
`
function Layout(props){
    return (
        <Container>
            {props.children}
        </Container>
    )
}

export default Layout