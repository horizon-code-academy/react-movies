import React from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DeleteIcon from "../../assets/images/delete.svg";

const DeleteMovieModal = props => {
  const currentUser = useSelector(store => store.currentUser);

  const handleDelete = async id => {
    await fetch(`http://localhost:5000/movie/${id}`, {
      method: "delete",
      headers: {
        authorization: currentUser.token
      }
    });
    props.toggle();
    props.refresh();
  };

  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader className="bg-danger" toggle={props.toggle}>
        <strong>Delete:</strong> {props.movie.title}
      </ModalHeader>
      <ModalBody>Do you really want to delete this movie?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => handleDelete(props.movie._id)}>
          <span role="img" aria-label="delete">
            <img src={DeleteIcon} alt="Delete" />
          </span>{" "}
          Delete
        </Button>
        <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteMovieModal;
