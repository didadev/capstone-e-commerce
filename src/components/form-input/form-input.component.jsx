import {
  FormGroup,
  FormGroupInput,
  FormGroupLabel,
} from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <FormGroup>
      <FormGroupInput {...otherProps} />
      {label && (
        <FormGroupLabel shrink={!!otherProps.value.length}>
          {label}
        </FormGroupLabel>
      )}
    </FormGroup>
  );
};

export default FormInput;
