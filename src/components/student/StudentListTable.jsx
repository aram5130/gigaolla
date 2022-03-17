import React, { useMemo } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import styled from "styled-components";

const Tr = styled.tr`
  cursor: pointer;
  &:hover {
    background: linear-gradient(
        0deg,
        rgba(93, 95, 239, 0.2),
        rgba(93, 95, 239, 0.2)
      ),
      #ffffff;
  }
`;
const Input = styled.input`
  display: block;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  border: none;
  width: 95%;
  margin: 0 auto;
  height: 48px;
  padding-left: 12px;
  box-sizing: border-box;
`;

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// Table Title Row
const COLUMNS = [
  {
    Header: "과목",
    accessor: "과목",
  },
  {
    Header: "반",
    accessor: "배정반",
  },
  {
    Header: "당월점수",
    accessor: "당월점수",
  },
  {
    Header: "이름",
    accessor: "회원명",
    sortType: "string",
  },
  {
    Header: "순위",
    accessor: "반별순위",
  },
];

const StudentListTable = ({
  getStudentDetailInfo,
  mockData,
  setCanBringData,
}) => {
  // const StudentListTable = ({ mockData }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mockData, [mockData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = tableInstance;

  return (
    <>
      <Input
        placeholder="이름을 입력하세요"
        onChange={(e) => setFilter("회원명", e.target.value)}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {/* <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽 ' : ' 🔼 ') : ''}</span> */}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  // console.log(cell.row.original)
                  return (
                    <td
                      onClick={() => {
                        getStudentDetailInfo(cell.row.original);
                        setCanBringData(true);
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </Tr>
            );
          })}
          {/* {mockData.map((data, idx) => {
          return (
            <StudentListItem
              key={idx}
              data={data}
              getStudentDetailInfo={getStudentDetailInfo}
              setCanBringData={setCanBringData}
            />
          )
        })} */}
        </tbody>
      </table>
    </>
  );

  // const tableInstance = useTable(
  //   {
  //     columns,
  //     data,
  //   },
  //   useSortBy
  // )

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   tableInstance;

  // return (
  //   <table >
  //     <thead>
  //       {/* 1행 */}
  //       <tr>
  //         <th>응시여부</th>
  //         <th>반</th>
  //         <th>당월점수</th>
  //         <th>이름</th>
  //         <th>순위</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {/* 2행 */}
  //       {mockData.map((data, idx) => {
  //         return (
  //           <StudentListItem
  //             key={idx}
  //             data={data}
  //             getStudentDetailInfo={getStudentDetailInfo}
  //             setCanBringData={setCanBringData}
  //           />
  //         )
  //       })}
  //     </tbody>
  //   </table>
  // )
};

export default StudentListTable;
