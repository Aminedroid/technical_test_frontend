import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {getUsers} from "../services/UserService";
import '../App.css';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let mounted = true;
        getUsers()
            .then(data => {
                if (mounted) {
                    setUsers(data)
                }
            })
        return () => mounted = false
    }, []);

    return (
        <div className="row side-row">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>City</th>
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
                  </tr>
              )}
              </tbody>
            </Table>
        </div>
    );
}

export default Users;