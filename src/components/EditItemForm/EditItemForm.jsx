import React from "react";
import { Button, Header, Form, Segment, Modal } from "semantic-ui-react";
import { useState, useEffect } from "react";

import { edit } from "../../utils/itemApi";

function EditItemForm({ item, setItem, updateCard }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    setState({
      name: item?.name,
      price: item?.price,
      description: item?.description,
    });
  }, [item]);
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const update = await edit(item?._id, state);
      updateCard(state)
      setOpen(false);
    } catch (err) {
      console.log(err);
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
              value={state.name}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="address"
              name="price"
              value={state.price}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="description"
              name="description"
              value={state.description}
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

export default EditItemForm;
