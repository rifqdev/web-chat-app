const Input = ({ type, id, label, placeholder, value, onChange, className }) => {
  return <input type={type} id={id} label={label} placeholder={placeholder} value={value} onChange={onChange} className={className} />;
};

export default Input;
