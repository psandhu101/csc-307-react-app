import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {

  async function fetchAll(){
   try {
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;     
   }
   catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;         
   }
  }

  async function makePostCall(person){
   try {
      const response = await axios.post('http://localhost:5000/users', person);
      //person = response.data;
      return response;
   }
   catch (error) {
      console.log(error);
      return false;
   }
  }

  useEffect(() => {
   fetchAll().then( result => {
      if (result)
         setCharacters(result);
    });
  }, [] );

  const [characters, setCharacters] = useState([]);  

  async function removeOneCharacter (index) {
   try {
      const response = await axios.delete('http://localhost:5000/users/'.concat(characters[index]._id));
      if (response && response.status == 204)
      {
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
      }
   }
   catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;         
   }
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201)
      setCharacters([...characters, result.data] );
    });
  }

  return (
  <div className="container">
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />
  </div>
  )
}

export default MyApp;