import React, { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import Card from "./card";

const Task = () => {

    const [userData, setUserData] = useState(null)
    const [values, setValues] = useState();
    const [task, setTasks] = useState();
    const [taskUser, setTasksUser] = useState();
    const [totaltask, setTotaltasks] = useState([]);




    useEffect(() => {
        const fetchUserDate = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUserData(response.data.usuario);
            } catch (err) {
                console.log('Error Fetching user profile data: ' + err)
            }
        }
        fetchUserDate();
    }, [])
    //console.log("userData", userData)


    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }
    const areAllFieldsFilled = (values) && (values.name_task) && (values.name_task !== "")&& (values.amount)  && (values.amount !== "") 
    //console.log("values", values)

    const handleClickButton = () => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/task`, {
            name_task: values.name_task,
            username: userData.username,
            date: new Date(Date.now()),
            email: userData.email,
            amount: 85000,
        }).then((response) => {
            console.log(response)
        });
        window.location.reload()
    }

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/task`)
            .then((response) => {
                setTasks(response.data)
            })
    }, [])
    //console.log("task", task)


    useEffect(() => {
        if (task) {
            let tasksDone = []
            for (let i = 0; i < task.length; i++) {
                if (task[i].email === userData.email) {
                    tasksDone.push(task[i])
                }
            }
            setTasksUser(tasksDone)
        }
    }, [task, userData])
    //console.log("taskUser", taskUser)

    useEffect(() => {
        if (taskUser) {
            let newAr = taskUser.reduce((previousValue, currentValue) => previousValue + parseInt(currentValue.amount), 0);
            setTotaltasks(newAr)
        }
    }, [taskUser])
    //console.log("totaltask",totaltask)

    return (

        <div>
            <div>
                <h3 className="title">AGREGAR TAREAS</h3>
                <div className="cards">
                    <input className="register-input" type="text" name="name_task" placeholder="Nombre tarea" onChange={handleChangeValues} />
                    <input className="register-input" type="text" name="amount" placeholder="Valor tarea" onChange={handleChangeValues} />
                    <button className="register-input"
                        disabled={!areAllFieldsFilled}
                        onClick={handleClickButton}>Agregar</button>
                </div>
                <br />
                <h3 className="title">

                    <b className="titleLeft">{taskUser && taskUser.length > 0 ? 'TAREAS AGREGADAS' : 'NO TIENE TAREAS AÚN'}</b>

                    <b className="titleRight">{taskUser && taskUser.length > 0 ? `VALOR TOTAL  $${totaltask.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : ''}</b>

                </h3>
                <div className="cards">
                    {typeof taskUser !== 'undefined' &&
                        taskUser.map((task) => {
                            return <Card
                                key={task.id}
                                id={task.id}
                                name_task={task.name_task}
                                date={task.date}
                                email={task.email}
                                username={task.username}
                                amount={task.amount}
                            >
                            </Card>;
                        })}
                </div>

            </div>
        </div>

    )

}
export default Task;