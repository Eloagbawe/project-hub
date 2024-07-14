import "./ProjectTeam.scss";
import ProjectLayout from "../../layouts/ProjectLayout/ProjectLayout";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { ProjectContext } from "../../contexts/projectContext";
import { useParams } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

const ProjectTeam = () => {
  const { projectLoading, setProjectId, teamData } = useContext(ProjectContext);
  const [team, setTeam] = useState(null);
  const { id } = useParams();

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

  return (
    <ProjectLayout>
      {projectLoading ? (
        <div className="flex justify-center h-[30vh] py-20">
          <Loader />
        </div>
      ) : (
        <section className="project-team mt-10">
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td className="project-team__text">
                  {team?.manager?.first_name} {team?.manager?.last_name}
                </Td>
                <Td className="project-team__text">Manager</Td>
              </Tr>
              {team?.members?.map((user) => (
                <Tr key={user.id}>
                  <Td className="project-team__text">
                    {user.first_name} {user.last_name}
                  </Td>
                  <Td className="project-team__text">Member</Td>
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
