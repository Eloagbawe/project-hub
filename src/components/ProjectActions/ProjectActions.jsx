import "./ProjectActions.scss";
import {
  Popover,
  PopoverContent,
  // PopoverCloseButton,
  PopoverTrigger,
} from "@chakra-ui/react";
import moreIcon from "../../assets/icons/more.svg";

const ProjectActions = () => {

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
            <button className="popover__btn">Edit</button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProjectActions;
