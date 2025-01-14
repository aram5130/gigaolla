import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import PoliceIcon from "../image/PoliceIcon.svg";

const OverviewCard = ({ Class, Color }) => {
  const [totalStudent, setTotalStudent] = useState("");
  const [attendStudent, setAttendStudent] = useState("");
  const [totalScore, setTotalScore] = useState("");
  const [lastTotalScore, setLastTotalScore] = useState("");
  const [topTotalScore, setTopTotalScore] = useState("");
  const [losTotalScore, setLowTotalScore] = useState("");

  const fetchData = async () => {
    let today = new Date();
    let year = today.getFullYear();
    let lastMonth = today.getMonth();
    let month = today.getMonth() + 1;
    // const totalUrl = `https://kimcodi.kr/external_api/dashboard/numberOfTotalStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Class}`;
    // const attendedUrl = `https://kimcodi.kr/external_api/dashboard/numberOfTestedStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${Class}`;
    // const scoreUrl = `https://kimcodi.kr/external_api/dashboard/avgOfSeriesByMonth.php?%20yyyy=${year}&mm=${month}&series=${Class}`;
    // const lastScoreUrl = `https://kimcodi.kr/external_api/dashboard/avgOfSeriesByMonth.php?%20yyyy=${year}&mm=${lastMonth}&series=${Class}`;
    // const topScoreUrl = `https://kimcodi.kr/external_api/dashboard/avgOfSeriesTopLowPerByMonth.php?yyyy=${year}&mm=${month}&toplow=top&per=10&series=${Class}`;
    // const lowScoreUrl = `https://kimcodi.kr/external_api/dashboard/avgOfSeriesTopLowPerByMonth.php?yyyy=${year}&mm=${month}&toplow=low&per=10&series=${Class}`;
    //화면 구현 확인용 URL
    const totalUrl = `https://kimcodi.kr/external_api/dashboard/numberOfTotalStudentsByMonth.php?yyyy=2021&mm=12&class=${Class}`;
    const attendedUrl = `https://kimcodi.kr/external_api/dashboard/numberOfTestedStudentsByMonth.php?yyyy=2021&mm=12&class=${Class}`;
    const scoreUrl = `https://kimcodi.kr/external_api/dashboard/avgOfSeriesByMonth.php?%20yyyy=2021&mm=12&series=${Class}`;
    const lastScoreUrl = `https://kimcodi.kr/external_api/dashboard/avgOfSeriesByMonth.php?%20yyyy=2021&mm=11&series=${Class}`;
    const topScoreUrl = `https://kimcodi.kr/external_api/dashboard/avgOfSeriesTopLowPerByMonth.php?yyyy=2021&mm=12&toplow=top&per=10&series=${Class}`;
    const lowScoreUrl = `https://kimcodi.kr/external_api/dashboard/avgOfSeriesTopLowPerByMonth.php?yyyy=2021&mm=12&toplow=low&per=10&series=${Class}`;

    await axios.get(totalUrl).then((res) => {
      if (res.data.code === "001") {
        setTotalStudent(res.data.result[0].STUDENT_COUNT);
      } else {
        return;
      }
    });
    await axios.get(attendedUrl).then((res) => {
      if (res.data.code === "001") {
        setAttendStudent(res.data.result[0].STUDENT_COUNT);
      } else {
        return;
      }
    });

    await axios.get(scoreUrl).then((res) => {
      if (res.data.code === "001") {
        setTotalScore(Math.round(res.data.result[0].AVG));
      } else {
        return;
      }
    });

    await axios.get(lastScoreUrl).then((res) => {
      if (res.data.code === "001") {
        setLastTotalScore(Math.round(res.data.result[0].AVG));
      } else {
        return;
      }
    });

    await axios.get(topScoreUrl).then((res) => {
      if (res.data.code === "001") {
        setTopTotalScore(Math.round(res.data.result[0].AVG));
      } else {
        return;
      }
    });

    await axios.get(lowScoreUrl).then((res) => {
      if (res.data.code === "001") {
        setLowTotalScore(Math.round(res.data.result[0].AVG));
      } else {
        return;
      }
    });
  };

  const TestRate = Math.floor(
    (parseInt(attendStudent) / parseInt(totalStudent)) * 100
  );
  const TestMinusLast = Math.floor(
    parseInt(totalScore) - parseInt(lastTotalScore)
  );
  const TestIncrease = Math.floor(
    (parseInt(totalScore) / parseInt(lastTotalScore)) * 100
  );

  useEffect(() => {
    fetchData();
  }, []);

  const ContWrap = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 31.82%;
    height: 0;
    padding-bottom: 31.82%;
    background: #fff;
    border-radius: 25px;
    box-shadow: 0px 17px 26px rgba(0, 0, 0, 0.06),
      0px 2px 6.5px rgba(0, 0, 0, 0.04), 0px 0px 1.09208px rgba(0, 0, 0, 0.04);
    @media screen and (max-width: 1712px) {
      font-size: 0.9346vw;
    }
  `;
  const Cont = styled.div`
    padding: 1.56em;
    box-sizing: border-box;
    font-family: "Noto Sans KR", sans-serif;
  `;
  const ClassName = styled.span`
    font-size: 2.13em;
    font-weight: bold;
    color: ${Color};
  `;
  const IconCont = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1.63em;
    right: 1.69em;
    width: 3em;
    height: 3em;
    background-color: ${Color};
    border-radius: 2em;
  `;
  const Icon = styled.img`
    width: 2em;
  `;
  const StudentCounterCont = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 3.44em;
    height: 7.94em;
  `;
  const StudentCounter = styled.div`
    position: relative;
    + div {
      margin-left: 1.44em;
      padding-left: 1.4em;
    }
  `;
  const Student = styled.span`
    display: block;
    color: #696969;
    font-size: 0.88em;
    line-height: 1.36em;
  `;
  const Line = styled.div`
    position: absolute;
    width: 100%;
    height: 60%;
    left: 0;
    bottom: 0;
    border-left: 1px solid #c4c4c4;
  `;
  const Counter = styled.span`
    display: flex;
    align-items: flex-end;
    margin-top: 1.88em;
    font-size: 1.25em;
  `;
  const Number = styled.span`
    display: inline-block;
    font-size: 1.9em;
    font-weight: bold;
    margin-right: 0.1em;
    line-height: 0.79em;
  `;
  const Increase = styled.span`
    display: block;
    font-size: 0.75em;
    margin-top: 0.83em;
    text-align: right;
    line-height: 1.36em;
    color: #2dce89;
  `;
  const Chart = styled.div`
    margin-top: 1.13em;
    width: 5.94em;
    height: 5.94em;
    transform: rotate(90deg);
    background: conic-gradient(${Color} 0% ${TestRate}%, #c4c4c4 0% 100%);
    border-radius: 3em;
    display: flex;
    ::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      content: "";
      width: 4em;
      height: 4em;
      background: #fff;
      border-radius: 3em;
    }
  `;
  const ChartScoreCont = styled.div`
    position: absolute;
    width: 40%;
    top: 3.73em;
    right: 1.55em;
  `;
  const ScoreAllCont = styled.div`
    display: flex;
    margin-top: 3.8em;
    justify-content: space-between;
  `;
  const ScoreCont = styled.div`
    position: relative;
    display: block;
  `;
  const ScoreName = styled.span`
    display: block;
    text-align: center;
    width: 100%;
    color: #696969;
    font-size: 0.88em;
    line-height: 2.14em;
    margin-bottom: 0.36em;
  `;
  const Score = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 0.88em;
    line-height: 2.14em;
  `;
  const ScoreNumber = styled.span`
    font-size: 1.57em;
    font-weight: bold;
    line-height: 0.73em;
    margin-right: 0.18em;
  `;
  const ScoreIncrease = styled.span`
    display: block;
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 0.75em;
    line-height: 1.33em;
    margin-top: 0.2em;
    color: #2dce89;
  `;
  return (
    <ContWrap>
      <Cont>
        <ClassName>{Class}직</ClassName>
        <IconCont>
          <Icon src={PoliceIcon} alt="policeIcon" fill="#FFF" />
        </IconCont>
        <StudentCounterCont>
          <StudentCounter>
            <Student>재학생</Student>
            <Counter>
              <Number>{totalStudent}</Number>명
            </Counter>
            <Increase>+123명</Increase>
          </StudentCounter>
          <StudentCounter>
            <Line></Line>
            <Student>응시생</Student>
            <Counter>
              <Number>{attendStudent}</Number>명
            </Counter>
            <Increase>+3명</Increase>
          </StudentCounter>
          <StudentCounter>
            <Student>응시율</Student>
            <Chart></Chart>
            <ChartScoreCont>
              <ScoreCont>
                <Score>
                  <ScoreNumber>{TestRate}</ScoreNumber>%
                </Score>
                <ScoreIncrease>+2.5%</ScoreIncrease>
              </ScoreCont>
            </ChartScoreCont>
          </StudentCounter>
        </StudentCounterCont>
        <ScoreAllCont>
          <ScoreCont>
            <ScoreName>평균점수</ScoreName>
            <Score>
              <ScoreNumber>{totalScore}</ScoreNumber>점
            </Score>
            <ScoreIncrease>
              {TestMinusLast >= 0 ? `+${TestMinusLast}` : `-${TestMinusLast}`}점
            </ScoreIncrease>
          </ScoreCont>
          <ScoreCont>
            <ScoreName>점수향상</ScoreName>
            <Score>
              <ScoreNumber>
                {TestIncrease >= 0 ? `+${TestIncrease}` : -`${TestIncrease}`}
              </ScoreNumber>
              %
            </Score>
          </ScoreCont>
          <ScoreCont>
            <ScoreName>상위10%</ScoreName>
            <Score>
              <ScoreNumber>{topTotalScore}</ScoreNumber>%
            </Score>
          </ScoreCont>
          <ScoreCont>
            <ScoreName>하위10%</ScoreName>
            <Score>
              <ScoreNumber>{losTotalScore}</ScoreNumber>%
            </Score>
          </ScoreCont>
        </ScoreAllCont>
      </Cont>
    </ContWrap>
  );
};

export default OverviewCard;
