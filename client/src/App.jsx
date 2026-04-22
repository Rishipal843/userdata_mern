import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  // Add user
  const addUser = async () => {
    if (!name || !age || !mobile) {
      return alert("Fill all fields");
    }

    await axios.post("http://localhost:5000/api/users", {
      name,
      age,
      mobile,
    });

    setName("");
    setAge("");
    setMobile("");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Form</h1>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Enter Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <br /><br />

      <button onClick={addUser}>Submit</button>

      <hr />

      <h2>Users List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;