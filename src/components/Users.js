import React, {useEffect, useState} from "react";
import {FormControl, InputGroup, Table} from "react-bootstrap";
import {getUsers} from "../services/UserService";
import '../App.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

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
            <div className="col-3">
                <InputGroup>
                    <FormControl onChange={(e) => setSearch(e.target.value)} placeholder="Search users"/>
                </InputGroup>
            </div>
            <p></p>
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
                {users.filter((user) => {
                    if (search.toLowerCase() === '') {
                        return user;
                    } else {
                        return user.first_name.toLowerCase().includes(search) ||
                            user.last_name.toLowerCase().includes(search) ||
                            user.age.toString().includes(search) ||
                            user.gender.toLowerCase().includes(search) ||
                            user.city.toLowerCase().includes(search);
                    }
                }).map((user) =>
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