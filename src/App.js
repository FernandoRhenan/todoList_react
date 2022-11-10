import React from 'react'
import { useState, useEffect } from 'react'
import Form from './comp/Form'
import List from './comp/List'



function App() {

  const [list, setList] = useState([])

  const childToParent = (childData) => {
    setList(childData);
  }

  function updateList() {
    fetch('http://localhost:5000/list', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then((data) => {
      setList(data)
    }).catch(err => console.log(err))
  }


  function removeItem(li) {

    let updatedList = list.filter((item)=>{
      return item.id != li.id
    })
     setList(updatedList)
  }


  useEffect(() => {

    fetch('http://localhost:5000/list', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then((data) => {
      setList(data)
    }).catch(err => console.log(err))

  }, [])




  return (
    <div>
      <Form list={list} childToParent={childToParent} />
      <List list={list} removeItem={removeItem} updateList={updateList}/>
    </div>
  )


}
export default App