import * as S from "../pages/style";

function Navbar() {
  return (
    <>
      <S.Nav>
        <S.StyledLink to="/user/create">Criar usuário</S.StyledLink>
        <S.StyledLink to="/login">Login</S.StyledLink>
        <S.StyledLink to="/courses">Cursos</S.StyledLink>
      </S.Nav>
    </>
  );
}

export default Navbar;
