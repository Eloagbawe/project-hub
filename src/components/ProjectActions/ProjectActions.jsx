import "./ProjectActions.scss";
import {
  Popover,
  PopoverContent,
  // PopoverCloseButton,
  PopoverTrigger,
} from "@chakra-ui/react";
import moreIcon from "../../assets/icons/more.svg";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/projectContext";
import { useNavigate } from "react-router-dom";

const ProjectActions = () => {
  const { project } = useContext(ProjectContext);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/projects/${project.id}/edit`);
  }

  return (
    <div className="popover">
      <Popover
        placement="right"
      >
        <PopoverTrigger>
          <img src={moreIcon} alt="project options" className=""/>
        </PopoverTrigger>

        <PopoverContent className="popover__content px-2 pb-2">
          {/* <PopoverCloseButton /> */}
          <div className="mt-3 popover__btn-container rounded-lg px-2">
            <button className="popover__btn" onClick={handleEdit}>Edit</button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProjectActions;
