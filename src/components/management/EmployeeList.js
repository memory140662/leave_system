import React from 'react';

const EmployeeList = ({employees, filter, onEmployeeSelected}) => {
    return (
        <table className='table table-striped table-hover'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Admin</th>
                </tr>
            </thead>
            <tbody>
                {employees.filter(emp => emp.username.indexOf(filter) > -1).map((emp, idx) => 
                <tr key={idx} onClick={e => onEmployeeSelected(emp)}>
                    <td>{emp._id}</td>
                    <td>{emp.username}</td>
                    <td>{emp.admin}</td>
                </tr>)}
            </tbody>
        </table>
    );
};

export default EmployeeList;