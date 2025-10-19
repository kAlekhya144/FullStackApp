import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', department: '', salary: '' });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const res = await axios.get('http://localhost:9090/api/employees');
    setEmployees(res.data);
  };

  const addEmployee = async () => {
    await axios.post('http://localhost:9090/api/employees', form);
    setForm({ name: '', department: '', salary: '' });
    loadEmployees();
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:9090/api/employees/${id}`);
    loadEmployees();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Management</h2>
      <div>
        <input placeholder="Name" value={form.name}
               onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Department" value={form.department}
               onChange={e => setForm({ ...form, department: e.target.value })} />
        <input placeholder="Salary" type="number" value={form.salary}
               onChange={e => setForm({ ...form, salary: e.target.value })} />
        <button onClick={addEmployee}>Add</button>
      </div>

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.department} - ₹{emp.salary}
            <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
