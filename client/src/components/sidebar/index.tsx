import { useUser } from "../../hooks";
import { SidebarForStudent } from "../../pages/student/sidebar";
import { SidebarForTeacher } from "../../pages/teacher/sidebar";

export function Sidebar(): JSX.Element | null {
  const { user } = useUser();
  const role = user?.data.user.role;

  if (!user) {
    return null;
  }

  return role === "STUDENT" ? <SidebarForStudent /> : <SidebarForTeacher />;
}
