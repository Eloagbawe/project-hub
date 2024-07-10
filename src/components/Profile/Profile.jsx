import "./Profile.scss";

const Profile = ({ name, small }) => {
  return (
    <div className={`profile rounded-full w-8 h-8 flex items-center justify-center overflow-hidden ${small && 'profile--small w-6 h-6'}`}>
      <span className={`profile__text ${small && 'profile__text--small'}`}>{name}</span>
    </div>
  );
};

export default Profile;
