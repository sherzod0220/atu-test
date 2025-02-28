import { useState } from "react";
import { useGetTeachers } from "../hooks/queries";
import { Button } from "antd";

const Teachers = () => {

  const [id,setId] = useState()
  const {data} = useGetTeachers(id) || {}

  const save = () => {
    setId(233); // ID ni o‘rnatamiz
  };
  console.log(data);
  


  return (
    <div>
      <h1>Teacher</h1>
      <Button onClick={save}>ID 233 ni yuborish</Button>
    </div>
  );
};

export default Teachers;
