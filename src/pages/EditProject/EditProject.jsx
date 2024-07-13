import "./EditProject.scss";
import ProjectLayout from "../../layouts/ProjectLayout/ProjectLayout";
import { ProjectContext } from "../../contexts/projectContext";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Spinner } from "@chakra-ui/react";
import InputError from "../../components/InputError/InputError";
import projectHubApi from "../../utils/projectHubApi";

const EditProject = () => {
  const { project, projectLoading, setProjectId, teamData, loadProject } =
    useContext(ProjectContext);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setProjectId(id);
  }, [id, setProjectId]);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
    }
  }, [project]);

  const handleEditProject = async (e) => {
    e.preventDefault();

    if (!title) {
      setTitleError(true);
      return;
    }

    const payload = {
      title,
      description,
      team: teamData.team.map((user) => user.id),
    };

    setUpdateLoading(true);

    try {
      await projectHubApi.updateProject(project.id, payload);
      setUpdateLoading(false);
      loadProject(project.id);
      navigate(`/projects/${id}/overview`);
    } catch (err) {
      console.log(err);
      setUpdateLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/projects/${id}/overview`);
  };

  return (
    <ProjectLayout>
      {projectLoading ? (
        <div className="flex justify-center h-[30vh] py-20">
          <Loader />
        </div>
      ) : (
        <section className="edit-project mt-10">
          <h3 className="edit-project__heading">Update Project</h3>
          <form onSubmit={handleEditProject} className="mt-5">
            <div className="my-8">
              <input
                className={`edit-project__input ${
                  titleError && "edit-project__input--error"
                } w-full border rounded-lg py-2 px-3`}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project Title"
              />
              {titleError && <InputError text={"Project title is required"} />}
            </div>
            <div className="my-8">
              <textarea
                className="edit-project__input edit-project__input--desc rounded-lg w-full border py-2 px-3"
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                type="submit"
                className="edit-project__btn edit-project__btn--save rounded-lg px-8 py-2 hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center"
              >
                Save
                {updateLoading && <Spinner size="xs" />}
              </button>
              <button
                type="button"
                className="edit-project__btn edit-project__btn--cancel px-8 py-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}
    </ProjectLayout>
  );
};

export default EditProject;
