import { dogsData } from "./data";
import { useState } from "react";
import DogDetails from "./DogDetails";

import { v1 as generateUniqueID } from "uuid";

function App() {
  const [dogs, setDogs] = useState(dogsData);
  const [showNewDogForm, setNewDogForm] = useState(false);
  const [newDog, setNewDog] = useState({
    id: "",
    name: "",
    present: false,
    grade: 100,
    age: "",
    likesSwimming: "",
    favFlavor: "",
    contact: "",
  });

const [checked, setChecked] = useState(false);
const [selectOption, setSelectOption] = useState("");

function handleSelectChange(event) {
  setSelectOption(event.target.value)
  console.log(selectOption)
}

function handleCheckboxChange() {
  setChecked(!checked); 
}

function handleSubmit(event) {
  event.preventDefault();
  //console.log("form submitted");
  addDog();
  resetDogForm();
  toggleNewDogForm();
}

function resetDogForm() {
  setNewDog({
    id: "",
    name: "",
    present: false,
    grade: 100,
    age: "",
    likesSwimming: "",
    favFlavor: "",
    contact: "",
  });
  setChecked(false);
  setSelectOption("");
}



  function addDog() {
    const createDog = {
      id: generateUniqueID(),
      name: newDog.name,
      present: false,
      grade: 100,
      notes: "",
      age: newDog.age,
      likesSwimming: checked,
      favFlavor: selectOption,
      contact: newDog.contact,
    };
    setDogs([createDog, ...dogs]);
  }

  function handleTextChange(event) {
    // handle multiple text inputs.  id is the key.  takes all keys as the object
    setNewDog({
      ...newDog, 
      [event.target.id]: event.target.value
    })
  }

  function removeDog(dogID) {
    const filteredDogArray = dogs.filter((dog) => dog.id !== dogID);
    setDogs(filteredDogArray);
  }

  function toggleNewDogForm() {
    setNewDogForm(!showNewDogForm);
  }

  function updateDogAttendance(dogId) {
    const dogArray = [...dogs];
    const index = dogArray.findIndex((dog) => dogId === dog.id);
    dogArray[index].present = !dogArray[index].present;
    setDogs(dogArray);
  }
  return (
    <div className="App">
      <header>
        <h1> Bark and Bowl Doggy Day Care</h1>
      </header>
      <main>
        <div>
          <button onClick={toggleNewDogForm}>
            {showNewDogForm ? "hide form" : "Add a new dog"}
          </button>
          {showNewDogForm ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                onChange={handleTextChange}
                value={newDog.name}
              />

              <label htmlFor="age">Age:</label>
              <input
                type="number"
                min="0"
                id="age"
                onChange={handleTextChange}
                value={newDog.age}
              />

              <label htmlFor="contact">Contact:</label>
              <input
                type="email"
                id="contact"
                onChange={handleTextChange}
                value={newDog.contact}
              />
              <label htmlFor="favFlavor">Favorite flavor:</label>

              <select id="favFlavor" onChange={handleSelectChange}>
                <option value=""></option>
                <option value="beef">Beef</option>
                <option value="chicken">Chicken</option>
                <option value="carrot">Carrot</option>
                <option value="bacon">Bacon</option>
              </select>

              <label>Likes swimming:</label>
              <input type="checkbox" checked={checked} onChange={handleCheckboxChange}/>
              <br />
              <input type="submit" />
            </form>
          ) : null}
        </div>
        <div>
          <ul>
            {dogs.map((dog) => {
              return (
                <li key={dog.id}>
                  <span
                    onClick={() => updateDogAttendance(dog.id)}
                    style={
                      dog.present
                        ? { textDecoration: "none" }
                        : { textDecoration: "line-through" }
                    }
                  >
                    {dog.name}{" "}
                  </span>

                  <button onClick={() => removeDog(dog.id)}>remove</button>
                  <DogDetails dog={dog} />
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
