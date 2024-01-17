import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/UserService";
import Pagination from "../Pagination/Pagination";
import ModalAdd from "../Modal/ModalAddUser";
import ModalEdit from "../Modal/ModalEditUser";
import ModalConfirm from "../Modal/ModalConfirm";
import { fetchAllRole } from "../../services/RoleService";

const TableUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [listRoles, setListRoles] = useState([]);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [selectId, setSelectId] = useState(0);

  const handleClose = () => {
    setIsShowModalAdd(false);
    setIsShowModalEdit(false);
    setIsShowModalConfirm(false);
  };

  const handleDeleteUser = (user) => {
    setSelectId(user?.id);
    setIsShowModalConfirm(true);
  };

  const handleEditUser = (user) => {
    setIsShowModalEdit(true);
    setDataUserEdit(user);
  };

  const handleUpdateTable = () => {
    getUsers();
  };

  useEffect(() => {
    getUsers(page);
    getRoles();
  }, [page]);

  const getRoles = async (page) => {
    let res = await fetchAllRole(page);
    if (res && res.data) {
      setListRoles(res.data);
    }
  };

  const getUsers = async (page) => {
    let res = await fetchAllUser(page || 1);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalPages(Math.ceil(res.totalItem / res.pageSize));
    }
  };
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List User:</b>
        </span>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAdd(true)}
        >
          Add
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Date of birth</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              const formattedDateOfBirth = new Date(
                item.dateOfBirth
              ).toLocaleDateString();
              const roleNames =
                item.roles && item.roles.length > 0
                  ? item.roles.map((role) => role.name).join(", ")
                  : "";
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.userName}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{formattedDateOfBirth}</td>
                  <td>{roleNames}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Pagination
        setTotalPages={setTotalPages}
        totalPages={totalPages}
        setPage={setPage}
        page={page}
        getUsers={getUsers}
      />
      <ModalAdd
        show={isShowModalAdd}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
        listRoles={listRoles}
      />
      <ModalEdit
        show={isShowModalEdit}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
        dataUserEdit={dataUserEdit}
        listRoles={listRoles}
      />
      <ModalConfirm
        show={isShowModalConfirm}
        handleClose={handleClose}
        selectId={selectId}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};

export default TableUser;
