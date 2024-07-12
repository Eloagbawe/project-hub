import "./MemberList.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider
} from "@chakra-ui/react";
import RemoveUserIcon from "../../assets/icons/person_remove.svg";

const MemberList = ({
  isOpen,
  onClose,
  handleRemoveMember,
  members,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="member-list__content mx-4">
        <ModalHeader className="mt-4">Team Members</ModalHeader>
        <ModalCloseButton className="mt-6"/>
        <ModalBody>
          <div className="">
            {members?.length > 0 ? (
              <div>
                {members.map((user) => (
                  <div key={user.id} className="">
                    <div className="flex flex-wrap gap-2 items-center justify-between py-1 px-2 my-1 rounded-lg member-list__user">
                      <div>
                        <p className="member-list__name">
                          {user.first_name} {user?.last_name}
                        </p>
                        <p className="add-member__email">{user.email}</p>
                      </div>
                    <button
                      className=""
                      onClick={() => handleRemoveMember(user)}
                    >
                      <img src={RemoveUserIcon} alt="remove user icon"/>
                    </button>
                    </div>
                    <Divider/>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Team Members</p>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MemberList;
