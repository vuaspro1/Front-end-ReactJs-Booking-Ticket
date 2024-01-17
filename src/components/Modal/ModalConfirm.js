import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../services/UserService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { handleClose, show, selectId, handleUpdateTable } = props;

  const handleSave = async () => {
    let res = await deleteUser(selectId);
    if (res) {
      handleClose();
      toast.success("Delete successed!");
      handleUpdateTable();
    } else {
      toast.error("Delete false!");
    }
  };

  return (
    <Modal backdrop="static" keyboard={false} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete user</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
