import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import React, { ReactElement } from 'react';

export interface IStudent {
  name: string;
  id: number;
}

export interface ISubject {
  name: string;
  id: number;
}

interface IProps {
  navsToRender: IStudent[] | ISubject[];
  owner: string;
  ownerId: number;
  param: string;
}

const SideBarNav = ({
  navsToRender,
  owner,
  ownerId,
  param,
}: IProps): ReactElement[] => {
  const history = useHistory();
  const goTo = (goto: string): void => {
    history.push(goto);
  };

  return navsToRender.map(({ name, id }, i) => (
    <Menu.Item
      key={`sub2-${i + 1}`}
      onClick={() => goTo(`/${owner}/${ownerId}/${param}/${id}`)}
    >
      {name.toUpperCase()}
    </Menu.Item>
  ));
};

export default SideBarNav;
