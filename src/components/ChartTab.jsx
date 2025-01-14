import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import reset from "../image/reset.svg";
import calendar from "../image/calendar.svg";
import { forwardRef } from "react";
import { ko } from "date-fns/esm/locale";

const ChartTab = ({
  setChartView,
  view,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  maxDate,
  setMaxDate,
  compareStartDate,
  setCompareStartDate,
  compareEndDate,
  setCompareEndDate,
}) => {
  const Tab = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 11px;
    button {
      cursor: pointer;
      padding: 10px 20px;
      margin-left: 10px;
      background: #f4f4f4;
      border-radius: 8px;
      border: none;
      &.active {
        background: #5d5fef;
        color: #fff;
      }
    }
    .reset {
      margin-right: 15px;
      margin-left: 0;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .calendarcontainer {
      position: relative;
      min-width: 165px;
      max-width: 215px;
      .datepicker-wrap {
        display: flex;
        background: #f4f4f4;
        padding: 11px 15px 10px 48px;
        box-sizing: border-box;
        border-radius: 8px;
        .custom-input {
          font-family: "Noto Sans";
          font-size: 14px;
          letter-spacing: -0.6px;
        }
        .react-datepicker {
          width: 344px;
          height: 258px;
          border-radius: 25px;
          border: none;
          padding: 24px 0;
          box-sizing: border-box;
          filter: drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.06))
            drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.04))
            drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.04));
          .react-datepicker__triangle {
            display: none;
          }
          .react-datepicker__header {
            background-color: #fff;
            border-bottom: none;
            border-radius: 25px;
            padding: 0;
          }
          .react-datepicker__month-container {
            height: 100%;
            #year {
              width: 82px;
              height: 40px;
              background: #f8f7fa;
              border-radius: 8px;
              border: none;
              padding-left: 16px;
              box-sizing: border-box;
              color: #5d5fef;
              font-size: 14px;
            }
            .react-datepicker__month {
              display: flex;
              flex-wrap: wrap;
              .react-datepicker__month-text {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .react-datepicker__month-wrapper {
                flex-basis: 100%;
                display: flex;
                justify-content: space-evenly;
                .react-datepicker__month--in-range {
                  background: rgba(93, 95, 239, 0.3);
                  color: #000;
                }
                .react-datepicker__month--range-start,
                .react-datepicker__month--range-end,
                .react-datepicker__month-text--keyboard-selected {
                  background: #5d5fef;
                  color: #fff;
                }
                .react-datepicker__month--disabled {
                  background: #fff !important;
                  color: #ccc !important;
                }
              }
            }
          }
          &.compare {
            .react-datepicker__month {
              .react-datepicker__month-wrapper {
                .react-datepicker__month--in-range {
                  background: #fff;
                }
                .react-datepicker__month--range-start,
                .react-datepicker__month--range-end,
                .react-datepicker__month-text--keyboard-selected {
                  background: #5d5fef;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 17px;
        z-index: 1;
        width: 24px;
      }
    }
  `;
  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    const compareValue = value.split("-").join(",");
    const lineValue = value.split("-").join("~");
    return (
      <div className="custom-input" onClick={onClick} ref={ref}>
        {view === "bar"
          ? value
          : view === "compareBar"
          ? compareValue
          : lineValue}
      </div>
    );
  });

  const MIN_YEAR = 2021;
  const MAX_YEAR = new Date().getFullYear();
  let select = [];
  for (let i = 0; i <= MAX_YEAR - MIN_YEAR; i++) {
    const option = 2021 + i;
    select.push(option);
  }
  let date = new Date();
  date.setMonth(date.getMonth() - 5);

  return (
    <Tab>
      <button
        className="reset"
        onClick={() => {
          setChartView("bar");
          setStartDate(date);
          setEndDate(new Date());
          setMaxDate(new Date());
          setCompareStartDate(new Date());
          setCompareEndDate(new Date());
        }}
      >
        <img src={reset} alt="reset" />
      </button>
      <div className="calendarcontainer">
        <img src={calendar} alt="calendar" className="navicon" />
        <div className="datepicker-wrap">
          {view === "bar" ? (
            <DatePicker
              className="datepicker"
              selected={new Date()}
              dateFormat="yyyy년 MM월 dd일"
              disabled
              customInput={<CustomInput />}
              locale={ko}
            />
          ) : view === "compareBar" ? (
            <DatePicker
              className="datepicker"
              calendarClassName="compare"
              renderCustomHeader={({ date, changeYear }) => (
                <div>
                  <select
                    value={new Date(date).getFullYear()}
                    name="year"
                    id="year"
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {select.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              selected={compareStartDate}
              startDate={compareStartDate}
              endDate={compareEndDate}
              minDate={new Date("2021/10")}
              maxDate={new Date()}
              dateFormat="yyyy년 MM월"
              showMonthYearPicker
              customInput={<CustomInput />}
              shouldCloseOnSelect={false}
              locale={ko}
              selectsRange
              disabledKeyboardNavigation
              onChange={(dates) => {
                const [start, end] = dates;
                setCompareStartDate(start);
                setCompareEndDate(end);
              }}
            />
          ) : (
            <DatePicker
              className="datepicker"
              renderCustomHeader={({ date, changeYear }) => (
                <div>
                  <select
                    value={new Date(date).getFullYear()}
                    name="year"
                    id="year"
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {select.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              selected={startDate}
              locale={ko}
              showMonthYearPicker
              startDate={startDate}
              endDate={endDate}
              minDate={new Date("2021/10")}
              maxDate={maxDate}
              dateFormat="yyyy년 MM월"
              customInput={<CustomInput />}
              shouldCloseOnSelect={false}
              selectsRange
              disabledKeyboardNavigation
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
                let startdate = new Date(start);
                startdate.setMonth(start.getMonth() + 5);
                setMaxDate(startdate);
              }}
            />
          )}
        </div>
      </div>
      {/* 원하시는 함수 props 로 내려서 쓰시면 됩니다. */}
      <button
        className={view === "compareBar" ? "active" : ""}
        onClick={() => setChartView("compareBar")}
      >
        비교
      </button>
      <button
        className={view === "line" ? "active" : ""}
        onClick={() => setChartView("line")}
      >
        추이
      </button>
    </Tab>
  );
};

export default ChartTab;
