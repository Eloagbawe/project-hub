import "./ProjectItem.scss";
import { Divider } from "@chakra-ui/react";
import Profile from "../Profile/Profile";
import { capitalizeInitials } from "../../utils";
import moment from "moment";

const ProjectItem = ({ project }) => {
  return (
    <div className="project rounded-sm py-2">
      <div className="project__content p-2 flex flex-wrap gap-3 justify-between items-center">
        <div className="">
          <p className="project__content__label mb-1">TITLE</p>
          <p className="project__name">{project?.title}</p>
        </div>
        <div className="">
          <p className="project__content__label mb-1">MANAGER</p>
          <div className="project__lead-container flex gap-1 items-center">
            <Profile
              name={capitalizeInitials(
                project?.manager_first_name,
                project?.manager_last_name
              )}
              small={true}
            />
            <p className="project__lead">
              {project?.manager_first_name} {project?.manager_last_name}
            </p>
          </div>
        </div>
      </div>
      <div className="project__details p-2">
        <p className="project__timestamp">
          Last Updated: {moment(project.updated_at).format("MMMM Do YYYY")}
        </p>
      </div>

      <Divider />
    </div>
  );
};

export default ProjectItem;
