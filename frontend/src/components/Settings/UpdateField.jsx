import PropTypes from "prop-types";

function UpdateField({
  mode,
  toBeUpdated,
  handleChange,
  type,
  heading,
  fieldKey,
}) {
  return (
    <div className="mt-3 w-full">
      <span className="pt-3 text-xl md:text-2xl">{heading}</span>
      <input
        type={type}
        className={`w-full p-2 rounded border ${
          mode === "light"
            ? "bg-gray-100 text-black border-gray-800"
            : "bg-priDark text-white border-gray-300"
        } duration-200 text-sm mt-2 md:text-xl`}
        value={toBeUpdated}
        onChange={(e) =>
          handleChange((prevState) => ({
            ...prevState,
            [fieldKey]: e.target.value,
          }))
        }
        placeholder={heading}
      />
    </div>
  );
}

UpdateField.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
  toBeUpdated: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
};

export default UpdateField;
