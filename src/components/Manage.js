import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {Button, ButtonToolbar} from "react-bootstrap";
import {getUsers, deleteUser} from "../services/UserService";
import CreateUserModal from "./CreateUserModal";
import '../App.css';
import UpdateUserModal from "./UpdateUserModal";

const Manage = () => {
    const [users, setUsers] = useState([]);
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [updateUser, setUpdateUser] = useState([]);
    const [isUpdated, setUpdated] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (users.length && !isUpdated) {
            return;
        }
        getUsers()
            .then(data => {
                if (mounted) {
                    setUsers(data);
                }
            });
        return () => {
            mounted = false;
            setUpdated(false);
        }
    }, [isUpdated, users]);

    const handleCreateUserModal = (e) => {
        e.preventDefault();
        setShowCreateUserModal(true);
    };
    const handleUpdateUserModal = (e, user) => {
        e.preventDefault();
        setShowUpdateUserModal(true);
        setUpdateUser(user);
    };

    const handleDeleteUserModal = (e, user_id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            e.preventDefault();
            deleteUser(user_id)
                .then((res) => {
                    alert(res);
                    setUpdated(true);
                },
                (err) => {
                    alert(err);
                });
        }
    }

    let hideCreateUserModal = () => setShowCreateUserModal(false);
    let hideUpdateUserModal = () => setShowUpdateUserModal(false);

    return (
        <div className="row side-row">
            <ButtonToolbar className="toolbar-button">
                <Button variant="dark" onClick={handleCreateUserModal}>Create new user</Button>{' '}
                <CreateUserModal show={showCreateUserModal} onHide={hideCreateUserModal} setUpdated={setUpdated}></CreateUserModal>
            </ButtonToolbar>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {users.map((user) =>
                  <tr key={user.user_id}>
                      <td>{user.user_id}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.age}</td>
                      <td>{user.gender}</td>
                      <td>{user.city}</td>
                      <td>
                          <Button className="mr-2" variant="primary"
                                  onClick={e => handleUpdateUserModal(e, user)}>Update</Button>{' '}
                          <span>&nbsp;&nbsp;&nbsp;</span>
                          <Button className="mr-2" variant="danger" onClick={e => handleDeleteUserModal(e, user.user_id)}>Delete</Button>{' '}
                          <UpdateUserModal show={showUpdateUserModal} onHide={hideUpdateUserModal}
                                           setUpdated={setUpdated} user={updateUser}></UpdateUserModal>
                      </td>
                  </tr>
              )}
              </tbody>
            </Table>
        </div>
    );
}

export default Manage;