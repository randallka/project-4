import React from "react";
import { Button, Header, Form, Segment, Modal } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { addItem, getMenuItems } from "../../utils/itemApi";
function EditMenuForm({ restaurant, setRestaurant }) {
  const [open, setOpen] = useState(false);
  

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button>Edit Menu</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header content="Edit Your Menu" />
      <Modal.Content>
        
      </Modal.Content>
    </Modal>
  );
}

export default EditMenuForm;
