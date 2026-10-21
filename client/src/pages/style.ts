import styled from "styled-components";
import { Link } from "react-router-dom";

// ====COMPONENTS====

// NAVBAR
export const NavContainer = styled.div`
  display: block;
  justify-items: center;
  margin-bottom: 10px;
`;

export const StyledNav = styled.nav`
  vertical-align: text-top;
  display: flex;
  justify-content: center;
  width: fit-content;
  border-style: solid;
  border-width: 1px;
  border-color: var(--border-clr);
  border-radius: 10px;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--shadow);
  margin: 0.15em;
  padding: 2px 10px;
  border-radius: 8px;
  background: transparent;
  outline-offset: 1px;
  outline-width: 1px;
  outline-style: solid;
  outline-color: transparent;
  transition: color 1s ease-in-out, outline 250ms ease-in-out;
  &:hover {
    outline-offset: 2px;
    outline-color: var(--border-clr);
  }
`;

// ====PAGES====

// HOME

export const CardContainer = styled.div`
  padding: 10px;
  background-color: white;
  display: inline-flex;
  border-radius: 15px;
  flex-wrap: wrap;
  max-width: 1000px;
  min-width: 150px;
  justify-self: center;
`;

export const CardImageContainer = styled.div`
  width: 300px;
  min-width: 150px;
  max-width: 600px;
  border-radius: 10px;
  margin: 5px;
  flex: 1 1 300px;
`;

export const CardImage = styled.img`
  display: flex;
  width: 100%;
  border-radius: 10px;
`;

export const CardTextContainer = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  min-width: 150px;
  justify-content: space-between;
  flex: 1 1 300px;
`;

// COURSES

interface Props {
  $show: boolean | null;
}

export const Ul = styled.ul<Props>`
  display: grid;
  grid-template-rows: ${(props) => (props.$show ? "1fr" : "0fr")};
  transition: 300ms ease-in-out;
  margin: 0;
  color: white;
  > div {
    overflow: hidden;
  }
`;

export const CampusCourse = styled.li`
  cursor: pointer;
  margin: 5px 0;
  line-height: 1em;
  :hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

export const CourseContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100vw;
`;

export const CourseDescription = styled.div`
  background-color: rgb(173, 175, 184);
  width: 80%;
  height: 80%;
  border-width: 5px;
  border-style: solid;
  border-radius: 10px;
`;

export const CampusContainer = styled.div`
  border-radius: 8px;
  border-style: solid;
  box-sizing: border-box;
  border-color: #988557;
  border-width: 1px;
  background-color: #988557;
  margin-bottom: 10px;
`;

export const CampusButton = styled.button`
  background: var(--bg);
  color: black;
  font-weight: 500;
  width: 100%;
  text-align: left;
`;

// CREATE USER, LOGIN
export const Container = styled.div`
  height: 100%;
  width: 100%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  border-style: solid;
  border-width: 2px;
  border-color: var(--border-clr);
`;

export const TextInput = styled.input`
  background: transparent;
  border-color: var(--border-clr);
  border-width: 1px;
  border-style: solid;
  font-family: inherit;
  transition: border-color 100ms 2s;
  color: var(--shadow);
  &:focus {
    outline: 2px solid black;
    outline-offset: 1px;
  }
`;

export const StyledButton = styled.button`
  background-color: var(--bg);
  padding: 1rem 1.4rem;
  justify-content: center;
  align-items: center;
  display: flex;
  color: var(--shadow);
  border: solid 1px var(--border-clr);
  transition: 100ms ease-in-out;
  &:hover {
    background-color: var(--border-clr);
  }

  &:active {
    background-color: transparent;
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
  background-color: var(--bg);
`;

export const LoginTable = styled.table`
  margin-bottom: 8px;
`;

// profile

export const Table = styled.table`
  border-color: var(--bg);
  border-width: 2px;
  border-style: solid;
  border-radius: 8px;
  width: max-content;
  margin: 5px;
  padding: 2px;
  font-size: 0.8em;
  text-align: center;
  display: inline-block;
  overflow: auto;
  @media (max-width: 600px) {
    width: 100vw;
    height: 40vh;
  }
  th {
    background: transparent;
    padding: 5px;
    text-align: center;
    border-color: var(--bg);
    border-width: 2px;
    border-style: solid;
    border-radius: 5px;
  }
  td {
    padding: 0;
    font-size: inherit;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }
  tr:nth-child(even) {
    background-color: var(--bg);
  }

  thead {
    text-align: center;
  }

  select {
    width: 100%;
    height: 100%;
    padding: 0;
    background: var(--bg);
    border-radius: 5px;
    border: 2px solid rgba(10, 10, 10, 0.7);
  }
`;

export const ProfileContainer = styled.div`
  /* height: 500px;
    width: 800px; */
  position: relative;
  margin: 60px auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  border: var(--border-clr);
`;
