function RemoveItem({ li, removedItem }) {

    return (
        fetch(`http://localhost:5000/list/${li.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then().then(() => {
            removedItem(li)
        }).catch(err => console.log(err))
    )

}

export default RemoveItem