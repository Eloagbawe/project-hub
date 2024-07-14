import "./ProjectTeam.scss";
import ProjectLayout from "../../layouts/ProjectLayout/ProjectLayout";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { ProjectContext } from "../../contexts/projectContext";
import { UserContext } from "../../contexts/userContext";
import { useParams } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { AddTeamMembers } from "../../components/AddMember/AddMember";
import RemoveUserIcon from "../../assets/icons/person_remove.svg";
import { RemoveMember } from "../../components/DeleteConfirm/DeleteConfirm";

const ProjectTeam = () => {
  const { projectLoading, setProjectId, teamData, project } =
    useContext(ProjectContext);
  const { user } = useContext(UserContext);
  const [team, setTeam] = useState(null);
  const { id } = useParams();
  const [addTeamMember, setAddTeamMember] = useState(false);
  const [removeTeamMember, setRemoveTeamMember] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  const mapTeam = (data) => {
    const manager = data?.find((user) => user.role === "manager");
    const members = data?.filter((user) => user.role === "member");

    setTeam({
      manager,
      members,
    });
  };

  useEffect(() => {
    setProjectId(id);
  }, [id, setProjectId]);

  useEffect(() => {
    if (teamData) {
      mapTeam(teamData?.team);
    }
  }, [teamData]);

  const openRemoveMember = (member) => {
    setMemberToRemove(member);
    setRemoveTeamMember(true);
  };

  return (
    <ProjectLayout>
      {projectLoading ? (
        <div className="flex justify-center h-[30vh] py-20">
          <Loader />
        </div>
      ) : (
        <section className="project-team mt-10">
          <RemoveMember
            isOpen={removeTeamMember}
            onClose={() => setRemoveTeamMember(false)}
            member={memberToRemove}
          />
          {project?.manager_id === user?.id && (
            <div className="my-4 md:mt-3 md:mb-5 flex md:justify-end">
              <button
                className="task-list__btn rounded-lg px-6 py-2"
                onClick={() => setAddTeamMember(true)}
              >
                Add Team Member
              </button>
              <AddTeamMembers
                isOpen={addTeamMember}
                onClose={() => setAddTeamMember(false)}
              />
            </div>
          )}
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Role</Th>
                {project?.manager_id === user?.id && <Th></Th>}
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td className="project-team__text">
                  {team?.manager?.first_name} {team?.manager?.last_name}
                </Td>
                <Td className="project-team__text">Manager</Td>
                {project?.manager_id === user?.id && (
                  <Td className="project-team__text"></Td>
                )}
              </Tr>
              {team?.members?.map((member) => (
                <Tr key={member.id}>
                  <Td className="project-team__text">
                    {member.first_name} {member.last_name}
                  </Td>
                  <Td className="project-team__text">Member</Td>
                  <Td className="project-team__text">
                    {project?.manager_id === user?.id && (
                      <button onClick={() => openRemoveMember(member)}>
                        <img src={RemoveUserIcon} alt="remove user icon" />
                      </button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </section>
      )}
    </ProjectLayout>
  );
};

export default ProjectTeam;
