import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="form-group">
      <input className="form-group-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : null
          } form-group-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
