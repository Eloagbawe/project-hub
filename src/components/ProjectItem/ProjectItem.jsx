import "./ProjectItem.scss";
import { Divider } from "@chakra-ui/react";
import Profile from "../Profile/Profile";

const ProjectItem = ({ project }) => {
  return (
    <div className="project rounded-sm">
      <div className="project__content px-2 py-4 flex flex-wrap gap-3 justify-between align-center">
        <p className="project__name">{project?.title}</p>
        <div className="project__details flex flex-wrap gap-3 items-center">
          <div className="project__lead-container flex gap-1 items-center">
            <Profile name="OI" small={true} />
            <p className="project__lead">{project?.manager}</p>
          </div>
          <p className="project__timestamp">Last Updated: {project.updated_at}</p>
        </div>
      </div>

      <Divider />
    </div>
  );
};

export default ProjectItem;
