import "./ProjectItem.scss";
import { Divider } from "@chakra-ui/react";
import Profile from "../Profile/Profile";
import { capitalizeInitials } from "../../utils";
import moment from "moment";

const ProjectItem = ({ project }) => {
  return (
    <div className="project rounded-sm">
      <div className="project__content px-2 py-4 flex flex-wrap gap-3 justify-between align-center">
        <div className="w-full md:w-fit">
          <p className="project__name">{project?.title}</p>
        </div>
        <div className="project__details flex flex-wrap gap-5 items-center">
          <div className="project__lead-container flex gap-1 items-center">
            <Profile name={capitalizeInitials(project?.manager_first_name, project?.manager_last_name)} small={true} />
            <p className="project__lead">{project?.manager_first_name} {project?.manager_last_name}</p>
          </div>
          <p className="project__timestamp">Last Updated: {moment(project.updated_at).format('MMMM Do YYYY')}</p>
        </div>
      </div>

      <Divider />
    </div>
  );
};

export default ProjectItem;
