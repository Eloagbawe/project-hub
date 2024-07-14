import "./Alert.scss";

const Alert = ({ status, text, end }) => {
  return (
    <div className="alert">
      <div
        className={`alert__container alert__container--${status} ${
          end && "alert__container--removed"
        }`}
      >
        <p className="alert__text">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
