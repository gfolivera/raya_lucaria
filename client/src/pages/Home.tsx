import * as S from "./style";
import carianStudiesThumb from "../assets/carian-studies.jpg";

function Home() {
  return (
    <>
      <S.Heading1>Home Page</S.Heading1>
      <S.CardContainer>
        <S.CardImageContainer>
          <S.CardImage src={carianStudiesThumb}></S.CardImage>
        </S.CardImageContainer>
        <S.CardTextContainer>
          <p>Lorem ipsum dolor sit amet.</p>
          <S.StyledButton>Cadastre-se</S.StyledButton>
          <S.StyledButton>Sobre o Site</S.StyledButton>
        </S.CardTextContainer>
      </S.CardContainer>
    </>
  );
}

export default Home;
