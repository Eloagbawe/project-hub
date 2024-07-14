import "./Profile.scss";

const Profile = ({ name, small }) => {
  return (
    <div
      className={`profile rounded-full flex items-center justify-center overflow-hidden ${
        small && "profile--small"
      }`}
    >
      <span className={`profile__text ${small && "profile__text--small"}`}>
        {name}
      </span>
    </div>
  );
};

export default Profile;
