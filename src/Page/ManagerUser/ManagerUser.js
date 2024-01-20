import TableUser from "../../components/Table/TableUser";
import { useEffect, useState } from "react";
import ModalAdd from "../../components/Modal/ModalAddUser";
import ModalEdit from "../../components/Modal/ModalEditUser";
import ModalConfirm from "../../components/Modal/ModalConfirm";
import Pagination from "../../components/Pagination/Pagination";
import { fetchAllUser, findUsersBySearch } from "../../services/UserService";
import { fetchAllRole } from "../../services/RoleService";
import { Button, Container } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";

const ManagerUser = (props) => {
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [listRoles, setListRoles] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyWord] = useState("");

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

  const handleSearch = () => {
    if (keyword) {
      getUsersBySearch(keyword);
    } else {
      getUsers();
    }
  };

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

  const getUsersBySearch = async (search, page) => {
    let res = await findUsersBySearch(search, page || 1);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalPages(Math.ceil(res.totalItem / res.pageSize));
    }
  };

  useEffect(() => {
    getUsers(page);
    getRoles();
  }, [page]);

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
      <div className="row">
        <div className="col-md-4">
          <input
            className="form-control my-3"
            placeholder="Search user by name, username, address"
            value={keyword}
            onChange={(e) => setKeyWord(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <Button
            className="btn btn-primary my-3"
            variant="primary"
            onClick={() => handleSearch()}
          >
            <SearchOutlined />
          </Button>
        </div>
      </div>

      <Container>
        <TableUser
          listUsers={listUsers}
          handleDeleteUser={handleDeleteUser}
          handleEditUser={handleEditUser}
        />
      </Container>
      <Pagination
        setTotalPages={setTotalPages}
        totalPages={totalPages}
        setPage={setPage}
        page={page}
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

export default ManagerUser;
