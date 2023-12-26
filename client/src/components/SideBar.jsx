import { MdSpaceDashboard } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';
import { BiTask } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

function SideBar() {

  return (
    <div
      className="relative pt-4 lg:my-20 rounded-tr-2xl flex flex-row items-center  lg:flex-col lg:items-start gap-8 pb-6 px-6"
    >

      <Link to={'/dashboard'}>
        <div className="flex items-center gap-4">
          {/* Dashboard icon */}
          <MdSpaceDashboard size={25} color="white" />
          <span className="text-white font-bold">dashboard</span>
        </div>
      </Link>
      <Link to="/dashboard/addTask">
        <div className="flex items-center gap-4">
          {/* addTask */}
          <BiTask size={25} color="white" />
          <span className="text-white font-bold">add Task</span>
        </div>
      </Link>

      <Link to={'/dashboard/profile'}>
        <div className="flex items-center gap-4">
          {/*  */}
          <CgProfile size={25} color="white" />
          <span className="text-white font-bold">profile</span>
        </div>
      </Link>
      <Link to={"/dashboard/report"}>
      <div className="flex items-center gap-4">
        {/**/}
        <TbReportSearch size={25} color="white" />
        <span className="text-white font-bold">report bug</span>
      </div>
      </Link>
    </div>
  );
}

export default SideBar;
