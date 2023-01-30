import React from "react";
import { Button, Header, Form, Segment, Modal } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { edit } from "../../utils/restaurantApi";
function EditRestaurantForm({ restaurant, setRestaurant }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    setState({
      name: restaurant.name,
      address: restaurant.address,
      description: restaurant.description,
    });}, [restaurant])
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    try { 
        e.preventDefault();
        const update = await edit(restaurant._id, state);
        setOpen(false);
        console.log(update.data)
        setRestaurant(update.data)
        
    } catch(err) { 
        console.log(err)
    } 
  }
  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button>Edit Info</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header content="Edit Restaurant Info" />
      <Modal.Content>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="name"
              placeholder="Restaurant Name"
              value={state.name}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="address"
              name="address"
              placeholder="Restaurant Address"
              value={state.address}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="description"
              name="description"
              value={state.description}
              placeholder="Describe your restaurant"
              onChange={handleChange}
            />
            <Button type="submit" className="btn">
              Save Changes
            </Button>
          </Segment>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default EditRestaurantForm;
