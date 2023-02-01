import React from "react";
import { Button, Header, Form, Segment, Modal } from "semantic-ui-react";
import { useState, useEffect, useContext } from "react";
import { create } from "../../utils/itemApi";
import { RestaurantContext } from "../../App";
function AddItemForm() {
    const restaurant = useContext(RestaurantContext)
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    restaurant: restaurant?._id,
    price: "",
    description: "",
  });
  const [photo, setPhoto] = useState()

  function handleFileInput(e) {
    setPhoto(e.target.files[0]);
  }
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
 async function handleSubmit(e){
	e.preventDefault(); 
    setOpen(false)
const formData = new FormData();
formData.append("photo", photo);
for (let key in state) {
  formData.append(key, state[key]);
}
try {
  await create(formData);
} catch (err) {
  console.log(err)
}
}
  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button>Add Item</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header content="Create New Item" />
      <Modal.Content>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="name"
              placeholder="Item Name"
              value={state.name}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="price"
              placeholder="$"
              value={state.price}
              onChange={handleChange}
              required
            />
    
            <Form.TextArea
              label="Description"
              name="description"
              value={state.description}
              placeholder="Item description"
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload item image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Add Item to Menu
            </Button>
          </Segment>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddItemForm;
