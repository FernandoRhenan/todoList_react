import { useState } from 'react'
import styles from './Form.module.css'

function Form({ list, childToParent }) {

    class newItem {

        static lastId = 0

        constructor(task) {
            this.id = newItem.lastId++
            this.task = task
            this.done = false;

        }
    }

    const [inpValue, setInpValue] = useState('');

    function changeValue(e) {
        setInpValue(e.target.value);
    }

    function addNewTask(e) {
        e.preventDefault()
        if (inpValue) {

            let item = new newItem(inpValue)

            let currentBody = {
                id: item.id,
                task: item.task,
                done: item.done,
            }

            fetch('http://localhost:5000/list', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentBody)
            }).then(res => res.json()).then((data) => {
                childToParent([...list, data])
                setInpValue('')

            })
        }

    }

    return (
        <div>
            <form onSubmit={addNewTask}>
                <div className={styles.container}>
                    <input maxLength='70' onChange={changeValue} placeholder="Digite uma nova tarefa..." value={inpValue} type="text" ></input>
                    <span className={styles.span}><button>+</button></span>
                </div>
            </form>
        </div>
    )
}

export default Form