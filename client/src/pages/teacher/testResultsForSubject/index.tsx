import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { genericSort } from "../../../business/genericSort";
import { SortAndSelect } from "../../../components/SortAndSelect";
import { useTeacherGuard, useTestResultForSubject } from "../../../hooks";
import { BarChartTestsSubject } from "./BarChartTestsSubject";
import { DoughnutChartSubject } from "./DoughnutChartSubject";

export interface TestResult {
  numberOfTests: number;
  score: number;
  studentId: string;
  subjectName: string;
  userName: string;
}

const { Content } = Layout;

export function TestResultsForSubject(): JSX.Element {
  const { subjectid } = useParams<{ subjectid: string }>();
  const { testResultsForSubject, setSubjectId } = useTestResultForSubject();
  const results: Array<TestResult> = testResultsForSubject || [];
  const { teacherGuard } = useTeacherGuard();
  const selectOptions = results.map((result) => result.userName);

  const [selectionAverage, setSelectionAverage] = useState("name");
  const [selectStudentAverage, setSelectStudentAverage] = useState("");

  const sortedResults =
    selectionAverage === "userName"
      ? genericSort(results, { key: "userName" })
      : genericSort(results, { key: "score" });

  const filteredResults = selectStudentAverage
    ? sortedResults.filter((result) => result.userName === selectStudentAverage)
    : sortedResults;

  useEffect(() => teacherGuard());

  useEffect(() => {
    setSubjectId(subjectid);
  }, [subjectid, setSubjectId]);

  return (
    <Content
      className="site-layout-content"
      style={{ padding: 90, height: 80, overflow: "scroll" }}
    >
      <SortAndSelect
        title="AVERAGE GRADES"
        radio1={{ label: "Name", value: "userName" }}
        radio2={{ label: "Score", value: "score" }}
        onChangeRadio={setSelectionAverage}
        value={selectStudentAverage || undefined}
        onChangeSelection={setSelectStudentAverage}
        results={selectOptions}
        selectStudentData={selectStudentAverage}
        onClick={() => setSelectStudentAverage("")}
        placeholder="Select a student"
        textBtn="All students"
      />
      <DoughnutChartSubject results={filteredResults} />
      <BarChartTestsSubject results={filteredResults} />
    </Content>
  );
}
