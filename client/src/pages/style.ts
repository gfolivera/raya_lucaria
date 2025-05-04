import styled from "styled-components";
import { Link } from "react-router-dom";

// ====COMPONENTS====

// NAVBAR

export const StyledNav = styled.nav`
    border-radius: 3px;
    background-color: var(--div_bg);
    color: white;
    vertical-align: text-top;
    display:flex;
    justify-content: center;
`;

export const StyledLink  = styled(Link)`
    color: whitesmoke;
    margin: .15em;
    padding: 0px 10px;
    border-radius: 8px;
    border: 2px solid black;
    
    &:hover{
        background: linear-gradient(var(--shadow), transparent);
        color: white;
    }
    &:active{
        background-image:url("src/assets/btn_img.jpg");
    }
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
    background-color: var(--div_bg);
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
background-color:var(--btn_bg);
width: 5em;
height: 2em;
justify-content: center;
align-items: center;
display: flex;

&:hover{
    background-color:rgb(31, 63, 124);
}

&:active{
    background-color:rgb(20, 87, 150);
}
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
background-color: var(--div_bg);
color: white;
`;


// profile

export const Table = styled.table`

border-color: rgba(10,10,10,.7);
border-width: 2px;
border-style: solid;
margin: 5px;
border-radius: 8px;
font-size: .8em;
text-align: center;

th{
    background:
    linear-gradient(to bottom, var(--bg),var(--shadow));
    padding: 5px;
    text-align: center;
    border-color: rgba(187, 217, 224, 0.5);
    border-width: 2px;
    border-style: solid;
    border-radius: 5px;
}
td{
    background:
    linear-gradient(to bottom, var(--shadow), var(--bg));
    padding: 0;
    font-size: inherit;
    border-color: rgba(10,10,10,.7);
    border-width: 2px;
    border-style: solid;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
}

thead{
    text-align: center;
}

select{
width:100%;
height: 100%;
padding:0;
background: var(--shadow);
border-radius: 5px;
border: 2px solid rgba(10,10,10,.7);
option{
    background-color: var(--shadow);
    color: whitesmoke;
}
}

`;

export const ProfileContainer = styled.div`
    /* height: 500px;
    width: 800px; */
    background-color: var(--div_bg);
    position: relative;
    margin: 60px auto;
    border-radius: 8px;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
`;