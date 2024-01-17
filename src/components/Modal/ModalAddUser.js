import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { postCreateUser } from "../../services/UserService";
import { toast } from "react-toastify";
import { postCreateUserRole } from "../../services/UserRoleService";

const ModalAdd = (props) => {
  const [selectedRole, setSelectedRole] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [userName, setUserName] = useState("");

  const handleSave = async () => {
    let res = await postCreateUser(
      name,
      phone,
      password,
      dateOfBirth,
      address,
      userName
    );
    if (res && res.id) {
      handleClose();
      setAddress("");
      setDateOfBirth("");
      setName("");
      setPassword("");
      setPhone("");
      setUserName("");
      toast.success("Create successed!");
      handlePostCreateUserRole(res.id);
      handleUpdateTable();
    } else {
      toast.error("Create false!");
    }
  };

  const handlePostCreateUserRole = async (id) => {
    const userId = id;
    const roleId = +selectedRole;
    let res = await postCreateUserRole(userId, roleId);
    if (res && res.id) {
      handleClose();
    } else {
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const { handleClose, show, handleUpdateTable, listRoles } = props;
  return (
    <Modal backdrop="static" keyboard={false} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date of birth</label>
              <input
                type="date"
                className="form-control"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option value="" disabled></option>
                {listRoles.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </Modal.Body>
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

export default ModalAdd;
