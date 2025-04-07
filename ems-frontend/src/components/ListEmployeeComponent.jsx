import React, {use, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

{/* Au premier rendu du composant, useEffect s'exécute.
Il appelle listEmployees() pour récupérer les données depuis une API.
Quand les données sont disponibles, setEmployees(response.data) met à jour employees.
Le composant est rerendu avec les nouvelles données.
 Ce code permet de récupérer dynamiquement une liste d’employés et de l’afficher.*/}
const ListEmployeeComponent = () => {
   const [employees, setEmployees] = useState([])
   
   const navigator = useNavigate();
   useEffect(() => {
       getAllEmployees();
   },[])

   function getAllEmployees(){
    listEmployees().then((response) => {
      setEmployees(response.data);
    }).catch(error =>{
      console.error(error);
    })
   }

 function addNewEmployee(){
    navigator('/add-employee')
 }

 function updateEmployee(id) {
  navigator(`/edit-employee/${id}`)
 }

function removeEmployee(id) {
  console.log(id);

  deleteEmployee(id).then((response) => {
      getAllEmployees();

  }).catch(error => {
    console.error(error);
  })
}


  return (
    <div className="container mx-auto">
 
      <h2 className="text-center mb-4">List of Employees</h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee </button>
  
      <div className="d-flex justify-content-center">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Employee Id</th>
              <th >Employee FirstName</th>
              <th>Employee LastName</th>
              <th>Employee Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button className="btn btn-info" onClick={ () => updateEmployee(employee.id)}>Update</button>
                  <button className="btn btn-danger" onClick={ () => removeEmployee(employee.id)} style={ {marginLeft:'10px'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
