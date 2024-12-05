const Label = ({ id, label }) => {
  return (
    <label htmlFor={id} className="text-black ">
      {label}
    </label>
  );
};

export default Label;
