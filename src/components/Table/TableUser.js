import Table from "react-bootstrap/Table";

const TableUser = (props) => {
  const { listUsers, handleDeleteUser, handleEditUser } = props;
  return (
    <>
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
    </>
  );
};

export default TableUser;
