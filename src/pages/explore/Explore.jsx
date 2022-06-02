import RightSideBar from "components/RightSideBar";
import Sidebar from "components/Sidebar";
import TextEditor from "components/TextEditor";

export default function UserFeed() {
  return (
    <div className="flex bg-slate-100">
      <Sidebar />
      <TextEditor />
      <RightSideBar />
    </div>
  );
}
