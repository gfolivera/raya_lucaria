import * as S from "../pages/style";

function Navbar() {
  return (
    <>
      <S.StyledNav>
        <S.StyledLink to="/">Home</S.StyledLink>
        <S.StyledLink to="/user/create">Criar usuário</S.StyledLink>
        <S.StyledLink to="/login">Login</S.StyledLink>
        <S.StyledLink to="/courses">Cursos</S.StyledLink>
        <S.StyledLink to="/profile">Perfil</S.StyledLink>
      </S.StyledNav>
    </>
  );
}

export default Navbar;
