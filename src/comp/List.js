import { AiFillCheckSquare as Check, AiFillCloseSquare as Remove } from "react-icons/ai";
import styles from './List.module.css'
import { useEffect, useState } from 'react'

function List({ list, removeItem, updateList }) {

    const [doneState, setDoneState] = useState('')

    function removeTask(li) {
        fetch(`http://localhost:5000/list/${li.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then().then(() => {
            removeItem(li)
        }).catch(err => console.log(err))

    }

    function changeDone(li) {

        fetch(`http://localhost:5000/list/${li.id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((data) => {
            setDoneState(data.done)

            let newState = {
                done: !doneState
            }

            fetch(`http://localhost:5000/list/${li.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newState)
            }).then(res => res.json()).then((data) => {
                setDoneState(data.done)
                updateList()

            }).catch(err => console.log(err))

        })



    }

    return (
        
        <div className={styles.container}>

            <ul>
                {
                    list.map((li) => (
                        <li className={li.done ? styles.done : styles.notDone} key={li.id}>{li.task}
                            <div className={styles.btns}>
                                <span onClick={() => changeDone(li)} className={li.done === true ? styles.checkedBtn : styles.checkBtn}><Check /></span>
                                <span onClick={() => removeTask(li)} className={styles.removeBtn}><Remove /></span>
                            </div>
                        </li>
                    )
                    )
                }

            </ul>
        </div>
            
    )

}

export default List