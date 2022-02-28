import React from "react";
import styled from "styled-components";

const CardTemplate = ({ Element, Name, Count, Info }) => {
  // Card Template Wrap
  const Cont = styled.div`
    padding: 2.19em;
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    font-family: "Noto Sans KR", sans-serif;
    background: #fff;
    border-radius: 25px;
    box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06),
      0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
  `;
  // 전체 위치 고정
  const TitleCont = styled.div`
    position: relative;
  `;
  // Chart Title
  const Title = styled.span`
    display: block;
    font-weight: bold;
    font-size: 1.5em;
    line-height: 3.44rem;
    color: #545454;
  `;
  // Chart Detail Wrap
  const DetailCont = styled.div`
    position: absolute;
  `;
  // Chart Datail 증감율
  const DetailCount = styled.span`
    font-weight: bold;
    font-size: 1.38em;
    line-height: 1.44rem;
    color: #149d52;
  `;
  // Chart Datail 설명
  const Detail = styled.span`
    font-size: 1.38em;
    line-height: 1.44rem;
    color: #8898aa;
  `;
  return (
    <Cont>
      <TitleCont>
        <Title>{Name}</Title>
        <DetailCont>
          <DetailCount>{Count}</DetailCount>
          <Detail>{Info}</Detail>
        </DetailCont>
      </TitleCont>
      <Element />
    </Cont>
  );
};

export default CardTemplate;