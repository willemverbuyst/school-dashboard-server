import { Col, Layout, Row } from "antd";
import { useEffect } from "react";
import { useLoggedInGuard } from "../../hooks";
import { BarChartHome } from "./BarChartHome";
import { LineChartHome } from "./LineChartHome";
import { PolarChartHome } from "./PolarChartHome";

const { Content } = Layout;

export function Home(): JSX.Element {
  const { loggedInGuard } = useLoggedInGuard();

  useEffect(() => loggedInGuard());

  return (
    <Content className="site-layout-content">
      <Row justify="space-around">
        <Col>
          <div style={{ width: "35vw", height: "35vh" }}>
            <BarChartHome />
          </div>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col>
          <div style={{ width: "35vw", height: "35vh" }}>
            <PolarChartHome />
          </div>
        </Col>
        <Col>
          <div style={{ width: "35vw", height: "35vh" }}>
            <LineChartHome />
          </div>
        </Col>
      </Row>
    </Content>
  );
}
