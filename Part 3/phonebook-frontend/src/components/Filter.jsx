const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      Filter:
      <input value={filter} onChange={handleFilter} />
    </div>
  );
};

export default Filter