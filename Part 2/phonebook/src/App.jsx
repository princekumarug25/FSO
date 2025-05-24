import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import services from "./services/persons";
import "./index.css";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState("");
  const [errorNotification, setErrorNotification] = useState("");
  useEffect(() => {
    services.getAll().then((data) => {
      setPersons(data);
    });
  }, []);
  const handleChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = { name: newName, number: newNumber };
    const userExists = persons.find((user) => user.name === newObject.name);

    const handleErrorNotification = (newObject) => {
      setErrorNotification(`${newObject.name} is already deleted`);
      setTimeout(() => setErrorNotification(null), 5000);
    };
    const handleNotification = (newObject) => {
      setNotification(`${newObject.name} is added to the phonebook`);
      setTimeout(() => setNotification(null), 3000);
    };
    if (userExists) {
      if (window.confirm(`do you want to update ${userExists.name}'s number`)) {
        services
          .update(userExists.id, newObject)
          .then(() => {
            setPersons(
              persons.map((person) => {
                person = person.name === userExists.name ? newObject : person;
                return person;
              })
            );
            setNewName("");
            setNewNumber("");
            handleNotification(newObject);
          })
          .catch((error) => {
            handleErrorNotification(newObject);
            console.log(error);
          });
      }
      return null;
    }
    services.create(newObject).then((data) => setPersons(persons.concat(data)));
    setNewName("");
    setNewNumber("");
    handleNotification(newObject);
  };
  const handleNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };
  let personsToShow = persons.filter((person) => {
    const lowerCasePerson = person.name.toLowerCase();
    const lowerCaseFilter = filter.toLowerCase();
    return lowerCasePerson.includes(lowerCaseFilter);
  });
  const handleDelete = (id, name) => {
    if (window.confirm(`do you want to detele ${name}`)) {
      services.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
    } else return null;
  };
  personsToShow = personsToShow ? personsToShow : persons;
  return (
    <div>
      {errorNotification && (
        <div className="error-notification">{errorNotification}</div>
      )}
      {notification && <div className="notification">{notification}</div>}
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Phonebook</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Persons
          person={person}
          key={person.name}
          handleDelete={() => handleDelete(person.id, person.name)}
        />
      ))}
    </div>
  );
};
export default App;
