import Input from "./Input";
import Label from "./Label";

const InputElement = ({ type, id, label, placeholder, value, onChange, className }) => {
  return (
    <div className="mt-2">
      <Label id={id} label={label} />
      <Input type={type} id={id} className={className} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default InputElement;
