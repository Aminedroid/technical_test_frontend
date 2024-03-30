import axios from "axios";

export async function getUsers() {
    return await axios.get('http://127.0.0.1:8000/users/')
        .then(res => res.data)
        .catch(err => {
            console.log(err.response.data.error)
        })
}
export function createUser(user) {
    return axios.post('http://127.0.0.1:8000/users/', {
        user_id: null,
        first_name: user.first_name.value,
        last_name: user.last_name.value,
        age: user.age.value,
        gender: user.gender.value,
        city: user.city.value
    })
        .then(res => res.data)
        .catch(err => {
            console.log(err.response.data.error)
        })
}

export function updateUser(user_id, user) {
    return axios.put(`http://127.0.0.1:8000/users/${user_id}/`, {
        first_name: user.first_name.value,
        last_name: user.last_name.value,
        age: user.age.value,
        gender: user.gender.value,
        city: user.city.value
    })
        .then(res => res.data)
        .catch(err => {
            console.log(err.response.data.error)
        })
}
export function deleteUser(user_id, user) {
    return axios.delete(`http://127.0.0.1:8000/users/${user_id}/`)
        .then(res => res.data)
        .catch(err => {
            console.log(err.response.data.error)
        })
}