import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SortAndSelect } from "../../../components/SortAndSelect";
import { useTeacherGuard, useTestResultForStudent } from "../../../hooks";
import { BarChartTestsStudent } from "./BarChartTestsStudents";
import { DoughnutChartStudent } from "./DoughnutChartStudents";

const { Content } = Layout;

export function TestResultsForStudent(): JSX.Element {
  const { studentid } = useParams<{ studentid: string }>();
  const { data, setStudentId } = useTestResultForStudent();
  const results = data || [];
  const selectOptions = results.map((result) => result.subjectName);

  const { teacherGuard } = useTeacherGuard();

  const [selectionAverage, setSelectionAverage] = useState("name");
  const [selectSubjectAverage, setSelectSubjectAverage] = useState("");

  const sortedResults =
    selectionAverage === "subjectName"
      ? [...results].sort((a, b) => a.subjectName.localeCompare(b.subjectName))
      : [...results].sort((a, b) => b.score - a.score);

  const filteredResults = selectSubjectAverage
    ? sortedResults.filter(
        (result) => result.subjectName === selectSubjectAverage
      )
    : sortedResults;

  useEffect(() => teacherGuard());

  useEffect(() => {
    setStudentId(studentid);
  }, [studentid, setStudentId]);

  return (
    <Content
      className="site-layout-content"
      style={{ padding: 90, height: 80, overflow: "scroll" }}
    >
      <SortAndSelect
        title="AVERAGE GRADES"
        radio1={{ label: "Name", value: "subjectName" }}
        radio2={{ label: "Score", value: "score" }}
        onChangeRadio={setSelectionAverage}
        value={selectSubjectAverage || undefined}
        onChangeSelection={setSelectSubjectAverage}
        results={selectOptions}
        selectStudentData={selectSubjectAverage}
        onClick={() => setSelectSubjectAverage("")}
        placeholder="Select a student"
        textBtn="All students"
      />
      <DoughnutChartStudent results={filteredResults} />
      <BarChartTestsStudent results={filteredResults} />
    </Content>
  );
}
