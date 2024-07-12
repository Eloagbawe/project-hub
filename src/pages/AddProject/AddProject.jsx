import "./AddProject.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import AddMember from "../../components/AddMember/AddMember";
import projectHubApi from "../../utils/projectHubApi";
import { capitalizeInitials } from "../../utils";
import MemberList from "../../components/MemberList/MemberList";
import InputError from "../../components/InputError/InputError";
import { AlertContext } from "../../contexts/alertContext";
import { Spinner } from "@chakra-ui/react";

const AddProject = () => {
  const { user } = useContext(UserContext);
  const { displayAlert } = useContext(AlertContext);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [displayMembersModal, setDisplayMembersModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [addProjectLoading, setAddProjectLoading] = useState(false);

  const [members, setMembers] = useState([]);
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const openAddMembersModal = () => {
    setAddMemberModal(true);
  };
  const openDisplayMembersModal = () => {
    setDisplayMembersModal(true);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;

    if (!searchValue) {
      setUserList([]);
      return;
    }

    try {
      const { data } = await projectHubApi.getUsers(searchValue);
      setUserList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMember = (member) => {
    setMembers([...members, member]);
  };

  const handleRemoveMember = (member) => {
    setMembers(
      members.filter((project_member) => project_member.id !== member.id)
    );
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    if (!title) {
      setTitleError(true);
      return;
    }
    setAddProjectLoading(true);

    try {
      const projectPayload = {
        title,
        description,
        team: members.map((val) => val.id),
      };

      const { data } = await projectHubApi.addProject(projectPayload);
      setAddProjectLoading(false);
      displayAlert({
        text: data.message,
      });
      navigate("/projects");
    } catch (err) {
      setAddProjectLoading(false);
      displayAlert({
        text: err.response?.data?.message,
        status: "error",
      });
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <section className="add-project">
        <h2 className="add-project__heading">New Project</h2>

        <form className="add-project__form my-4" onSubmit={handleAddProject}>
          <div className="md:flex gap-8 justify-between">
            <div className="w-full md:w-8/12 my-8">
              <div className="mb-8">
                <label
                  htmlFor="title"
                  className="add-project__label mb-1 block"
                >
                  Project Title:{" "}
                </label>
                <input
                  className={`border rounded-lg add-project__input px-4 py-3 w-full ${
                    titleError && "add-project__input--error"
                  }`}
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    setTitleError(false);
                    setTitle(e.target.value);
                  }}
                />
                {titleError && <InputError text="Project title is required" />}
              </div>

              <div className="my-8">
                <label
                  htmlFor="description"
                  className="add-project__label mb-1 block"
                >
                  Project Description:{" "}
                </label>
                <textarea
                  className="border rounded-lg add-project__input add-project__input--textarea px-4 py-3 w-full"
                  placeholder="Description"
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="my-8 md:w-3/12">
              <button
                type="button"
                className="add-project__btn add-project__btn--team px-4 py-2 rounded-lg hover:opacity-95 md:mt-7"
                onClick={openAddMembersModal}
              >
                Add Team Members
              </button>

              <div className="mt-8 mb-2 flex items-center">
                {members[0] && (
                  <div>
                    <Profile
                      name={capitalizeInitials(
                        members[0].first_name,
                        members[0].last_name
                      )}
                      small={true}
                    />
                  </div>
                )}
                {members[1] && (
                  <div className="add-project__member">
                    <Profile
                      name={capitalizeInitials(
                        members[1].first_name,
                        members[1].last_name
                      )}
                      small={true}
                    />
                  </div>
                )}
                {members[2] && (
                  <div className="add-project__member">
                    <Profile
                      name={capitalizeInitials(
                        members[2].first_name,
                        members[2].last_name
                      )}
                      small={true}
                    />
                  </div>
                )}
                {members.length > 3 && (
                  <p className="add-project__team ml-1">
                    + {members.length - 3}
                  </p>
                )}
                {members.length > 0 && (
                  <button
                    className="add-project__manage block ml-2 rounded-lg px-2 py-1"
                    type="button"
                    onClick={() => openDisplayMembersModal()}
                  >
                    Manage Team
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="add-project__btn add-project__btn--save px-8 py-2 rounded-lg hover:opacity-95 flex gap-1 items-center"
            >
              <span>SAVE</span>
              {addProjectLoading && <Spinner size={"sm"} />}
            </button>
          </div>
        </form>
        <AddMember
          isOpen={addMemberModal}
          onClose={() => {
            setUserList([]);
            setAddMemberModal(false);
          }}
          userList={userList}
          handleAddMember={handleAddMember}
          handleRemoveMember={handleRemoveMember}
          handleSearch={handleSearch}
          members={members}
        />
        <MemberList
          isOpen={displayMembersModal}
          onClose={() => setDisplayMembersModal(false)}
          members={members}
          handleRemoveMember={handleRemoveMember}
        />
      </section>
    </MainLayout>
  );
};

export default AddProject;
