import * as S from "../pages/style";
import { useUser } from "./UserContext";
function Navbar() {
  const { user, logout } = useUser();

  return (
    <>
      <S.NavContainer>
        <S.StyledNav>
          <S.StyledLink to="/">Home</S.StyledLink>
          <S.StyledLink to="/courses">Cursos</S.StyledLink>
          {user !== null ? (
            <>
              <S.StyledLink to="/profile">Perfil</S.StyledLink>
              <S.StyledButton onClick={() => logout()}>Logout</S.StyledButton>
            </>
          ) : (
            <>
              <S.StyledLink to="/user/create">Criar usuário</S.StyledLink>
              <S.StyledLink to="/login">Login</S.StyledLink>{" "}
            </>
          )}
        </S.StyledNav>
      </S.NavContainer>
    </>
  );
}

export default Navbar;
