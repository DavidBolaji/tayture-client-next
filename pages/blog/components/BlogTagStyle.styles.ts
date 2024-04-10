import styled from "styled-components";

import BlogTag from "./BlogTag";

type Props = {
    bg_color: string;
    text_color: string;
    hover_bg_color: string;
    hover_text_color:string;
}

export const BlogTagStyle = styled(BlogTag)<Props>`

&{
    background-color: ${(props)=>props.bg_color};
    color: ${({text_color})=> text_color};
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    padding-block: 0.25rem;
    padding-inline: 0.625rem;
    transition-duration:0.3s;
    transition-property: color background-color border-color text-decoration-color fill stroke

}

&:hover{
         background-color: ${({hover_bg_color})=> hover_bg_color};
         color: ${({hover_text_color})=> hover_text_color};
     }


` 