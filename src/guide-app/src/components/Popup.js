import React from 'react'
import styled,{keyframes} from 'styled-components'

const FadeOutDiv = styled.span`
  display: flexbox;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOut : fadeIn} 1s linear;
  transition: visibility 1s linear;
  border: solid rgba(210,0,0,0.6);
  margin: 20px;
  padding 20px
  flex-wrap: nowrap;
  flex-direction: row;
`
const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(.25);
    opacity: 0;
  }
`;

function Popup(props) {

return(props.trigger)?
(
<FadeOutDiv>
{props.children}
</FadeOutDiv>
):""
}

export default Popup