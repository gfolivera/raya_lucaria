import styled from "styled-components";
import { Link } from "react-router-dom";

// ====COMPONENTS====

// NAVBAR

export const StyledNav = styled.nav`
    border-radius: 3px;
    background-color: rgba(31, 18, 3, 0.65);
    color: white;
    vertical-align: text-top;
    display:flex;
    justify-content: center;
`;

export const StyledLink  = styled(Link)`
    color: whitesmoke;
    margin: .5em;

`;

// SIDEBAR

export const SidebarContainer = styled.ul`
    width: 250px;
    background-color: #2c2c2c;
    padding: 20px;
    position: fixed;
    left: 10px;
    top: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style-type: none;
`;

export const SidebarContent = styled.li`
    background-color:rgb(167, 167, 167);
    width: 220px;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
`;

export const SidebarNestedContent = styled.li`
    background-color:rgb(119, 119, 119);
    width: 200px;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    cursor: pointer;
    
`;

export const CourseContainer = styled.div`
    background-color:rgb(59, 60, 63);
    margin-left: 255px;
    margin-top: 2px;
    width: 900px;
    height: 90vh;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CourseDescription = styled.div`
    background-color:rgb(173, 175, 184);   
    width: 80%;
    height: 80%;
    border-width: 5px;
    border-style: solid;
    border-radius: 10px;
    
`


// ====PAGES====

// CREATE USER

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color:rgba(178, 206, 206, .25);
    display: flex;
    justify-content: center;
`;

export const FormContainer = styled.form`
    height: 500px;
    width: 400px;
    background-color: var(--bg);
    position: relative;
    margin: 60px auto;
    border-radius: 8px;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 30px;
`;

export const StyledButton = styled.button`
//padding: .5em;
color: white;
background-color:var(--bg_btn);
width: 5em;
height: 2em;
justify-content: center;
align-items: center;
display: flex;
`;

export const Heading1 = styled.h1`
display: flex;
justify-content: center;
`;


export const Heading2 = styled.h2`
display: flex;
justify-content: center;
z-index: 10;
`;



export const Greet = styled.div`
width: 100px;
height: 75px;
border-radius: 8px;
background-color: rgb(65, 56, 56);
color: white;
`;

