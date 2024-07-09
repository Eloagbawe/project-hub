import "./Profile.scss";

const Profile = ({ name }) => {
  return (
    <div className="profile rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
      <span className="profile__text">{name}</span>
    </div>
  );
};

export default Profile;
