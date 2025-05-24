const PersonForm = ({
  handleSubmit,
  newName,
  handleChange,
  newNumber,
  handleNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleChange} />
      </div>
      <div>
        number : <input value={newNumber} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
export default PersonForm