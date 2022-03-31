import { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { useUser } from '../../auth/hooks/useUser';

const { Content } = Layout;

const StudentMainPage = (): ReactElement => {
  const history = useHistory();
  const { user } = useUser();

  useEffect(() => {
    if (!user || user.token === null) {
      history.push('/');
    }
  }, [user, history]);

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          test
          {/* {user? (
            <AllCharts subjects={user.data.subjects} results={results} />
          ) : null} */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentMainPage;
