// src/pages/index.tsx
import { Button, Form, Input } from "antd";
import './style.css';
import { useCreateTeacherMutation } from "../hooks/mutation";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
  const navigate = useNavigate()
  const { mutate } = useCreateTeacherMutation(); // Barcha propriyetlarni olish
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    mutate(values); // Formadan kelgan qiymatlarni serverga yuboramiz
    form.resetFields(); // Formani tozalash
  };

  const move =()=>{
    navigate("/"); // Sign-in sahifasiga o'tish
  }
  return (
    <div className="card w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="box w-[300px] sm:w-[600px] lg:w-[50%] py-[20px] flex flex-col gap-[20px] justify-center items-center">
        <h2>Yangi o‘qituvchi qo‘shish</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <Form.Item
            name="firstName"
            label="Ism"
            rules={[{ required: true, message: "Iltimos, ismni kiriting!" }]}
          >
            <Input placeholder="Ismni kiriting" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Familiya"
            rules={[{ required: true, message: "Iltimos, familiyani kiriting!" }]}
          >
            <Input placeholder="Familiyani kiriting" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telefon raqam"
            rules={[
              { required: true, message: "Iltimos, telefon raqamni kiriting!" },
            ]}
          >
            <Input placeholder="+998901234567" />
          </Form.Item>

          <Form.Item
            name="pinfl"
            label="PINFL"
            rules={[{ required: true, message: "Iltimos, PINFLni kiriting!" }]}
          >
            <Input placeholder="PINFLni kiriting" />
          </Form.Item>

          <Form.Item
            name="degree"
            label="Daraja"
            rules={[{ required: true, message: "Iltimos, darajani kiriting!" }]}
          >
            <Input placeholder="Masalan, Bakalavr" />
          </Form.Item>

          <Form.Item
            name="position"
            label="Lavozim"
            rules={[{ required: true, message: "Iltimos, lavozimni kiriting!" }]}
          >
            <Input placeholder="Masalan, O‘qituvchi" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              // loading={isLoading}
              style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6" }}
            >
              { "Qo‘shish"}
            </Button>
            {/* {isSuccess && <p style={{ color: "green" }}>O‘qituvchi muvaffaqiyatli qo‘shildi!</p>}
            {isError && <p style={{ color: "red" }}>Xatolik yuz berdi! Qayta urinib ko‘ring.</p>} */}
          </Form.Item>
        </Form>
          <p className="cursor-pointer" onClick={move} style={{color:'blue'}}>If you have an accout</p>
      </div>
    </div>
  );
};

export default Teacher;