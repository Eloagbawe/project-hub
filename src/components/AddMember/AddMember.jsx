import "./AddMember.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import AddUserIcon from "../../assets/icons/person_add.svg";
import RemoveUserIcon from "../../assets/icons/person_remove.svg";
import { ProjectContext } from "../../contexts/projectContext";
import { AlertContext } from "../../contexts/alertContext";
import projectHubApi from "../../utils/projectHubApi";

const AddMember = ({
  isOpen,
  onClose,
  userList,
  handleSearch,
  handleAddMember,
  handleRemoveMember,
  members,
}) => {
  const [search, setSearch] = useState("");

  const closeAddMember = () => {
    setSearch("");
    onClose();
  };

  const isInMembers = (user) => {
    const userFound = members.find((member) => member.id === user.id);
    return !!userFound;
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAddMember}>
      <ModalOverlay />
      <ModalContent className="add-member__content mx-4">
        <ModalHeader className="mt-4">Add Team Member</ModalHeader>
        <ModalCloseButton className="mt-6" />
        <ModalBody>
          <div>
            <form
              onSubmit={handleSearch}
              className="flex justify-between items-center"
            >
              <input
                className="add-member__search border-b w-8/12 outline-0 py-1 px-3 rounded-lg"
                placeholder="Search users"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button type="submit" className="add-member__search">
                Search
              </button>
            </form>
          </div>
          <div className="my-5">
            {userList?.length > 0 ? (
              <div>
                {userList.map((user) => (
                  <div
                    key={user.id}
                    className=""
                    onClick={() => {
                      isInMembers(user)
                        ? handleRemoveMember(user)
                        : handleAddMember(user);
                    }}
                  >
                    <div
                      className={`flex flex-wrap gap-2 items-center justify-between py-3 px-2 my-2 rounded-lg add-member__user ${
                        isInMembers(user) && "add-member__user--selected"
                      }`}
                    >
                      <div>
                        <p className="add-member__name">
                          {user.first_name} {user?.last_name}
                        </p>
                        <p className="add-member__email">{user.email}</p>
                      </div>

                      {!isInMembers(user) ? (
                        <button
                          className=""
                          onClick={() => handleAddMember(user)}
                        >
                          <img src={AddUserIcon} alt="add user icon" />
                        </button>
                      ) : (
                        <button
                          className=""
                          onClick={() => handleRemoveMember(user)}
                        >
                          <img src={RemoveUserIcon} alt="remove user icon" />
                        </button>
                      )}
                    </div>
                    <Divider />
                  </div>
                ))}
              </div>
            ) : (
              <p>No results</p>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const AddTeamMembers = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);
  const { project, loadProject } = useContext(ProjectContext);
  const { displayAlert } = useContext(AlertContext);

  const closeAddTeamMembers = () => {
    setSearch("");
    onClose();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await projectHubApi.getUsers(search, project.id);
      setUserList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addMember = async (user) => {
    const payload = {
      title: project.title,
      description: project.description,
      team: [`${user.id}`],
    };
    try {
      await projectHubApi.updateProject(project.id, payload);
      loadProject(project.id);
      displayAlert({
        text: "Project Member Added Successfully",
      });
      closeAddTeamMembers();
    } catch (err) {
      console.error(err);
      displayAlert({
        text: "An error occurred while adding project member",
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAddTeamMembers}>
      <ModalOverlay />
      <ModalContent className="add-member__content mx-4">
        <ModalHeader className="mt-4">Add Team Member</ModalHeader>
        <ModalCloseButton className="mt-6" />
        <ModalBody>
          <div>
            <form
              onSubmit={handleSearch}
              className="flex justify-between items-center"
            >
              <input
                className="add-member__search border-b w-8/12 outline-0 py-1 px-3 rounded-lg"
                placeholder="Search users"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button type="submit" className="add-member__search">
                Search
              </button>
            </form>
          </div>
          <div className="my-5">
            {userList?.length > 0 ? (
              <div>
                {userList.map((user) => (
                  <div key={user.id} className="">
                    <div
                      className={`flex flex-wrap gap-2 items-center justify-between py-3 px-2 my-2 rounded-lg add-member__user`}
                    >
                      <div>
                        <p className="add-member__name">
                          {user.first_name} {user?.last_name}
                        </p>
                        <p className="add-member__email">{user.email}</p>
                      </div>
                      <button className="" onClick={() => addMember(user)}>
                        <img src={AddUserIcon} alt="add user icon" />
                      </button>
                    </div>
                    <Divider />
                  </div>
                ))}
              </div>
            ) : (
              <p>No results</p>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddMember;
