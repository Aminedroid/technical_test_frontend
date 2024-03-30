import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {getUsers} from "../services/UserService";
import '../App.css';
import Pagination from "./Pagination";
import pagination from "./Pagination";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(3);

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

    // get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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
              {currentUsers.map((user) =>
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
            <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} />
        </div>
    );
}

export default Home;