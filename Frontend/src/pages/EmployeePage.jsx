import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import EmpBody from "../components/empComponents/empBody";

const EmployeePage = () => {
    const { id } = useParams(); // Get Employee ID from URL
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/employee/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error("Error fetching employee details:", error);
            }
        };

        fetchEmployee();
    }, [id]);

    if (!employee) return <h2>Loading...</h2>;

    return (
      <>
      <Header user={employee.username}/>
      <EmpBody employee={employee}/>
      </>

    );
};

export default EmployeePage;
