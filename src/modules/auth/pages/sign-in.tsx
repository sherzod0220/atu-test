// src/pages/Login.tsx
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import './style.css';

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = (values: { id: string; faceId: string }) => {
    console.log("Login ma’lumotlari:", values); // Bu yerda API chaqiruvi bo‘ladi
  };

  const move =()=>{
    navigate("/sign-up"); // Sign-up sahifasiga o'tish
  }

  return (
    <div className="card w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="box w-[50%] h-[60%] flex flex-col gap-[20px] justify-center items-center">
        <h2>Kirish</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: "Iltimos, IDni kiriting!" }]}
          >
            <Input placeholder="IDni kiriting" />
          </Form.Item>

          <Form.Item
            name="faceId"
            label="Face ID"
            rules={[{ required: true, message: "Iltimos, Face IDni kiriting!" }]}
          >
            <Input placeholder="Face IDni kiriting" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6" }}
            >
              Kirish
            </Button>
          </Form.Item>
        </Form>
        <p className="cursor-pointer" onClick={move} style={{color:'blue'}}>If you don't have an accout</p>
      </div>
    </div>
  );
};

export default Login;