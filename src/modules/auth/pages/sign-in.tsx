// src/pages/Login.tsx
import { Button, Form, Input, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import './style.css';
import { useRegisterFaceMutation } from "../hooks/mutation";
import { Notification } from "@notification"; // Agar mavjud bo‘lsa

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mutate, isError, isSuccess } = useRegisterFaceMutation();

  const handleFinish = (values: { id: string; faceImage: File | null }) => {
    if (!values.faceImage) {
      Notification({
        type: "error",
        message: "Rasm yuklanmagan!",
      });
      return;
    }

    mutate({
      teacherId: values.id,
      faceImage: values.faceImage,
    });
  };

  const move = () => {
    navigate("/sign-up");
  };

  // Rasm yuklash uchun handler
  const handleUpload = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="card w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="box w-[50%] h-[60%] flex flex-col gap-[20px] justify-center items-center">
        <h2 className="text-[35px] text-[darkblue] font-serif font-bold">Kirish</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <Form.Item
            name="id"
            label="Teacher ID"
            rules={[{ required: true, message: "Iltimos, Teacher IDni kiriting!" }]}
          >
            <Input placeholder="Teacher IDni kiriting" />
          </Form.Item>

          <Form.Item
            name="faceImage"
            label="Face ID (Rasm yuklash)"
            rules={[{ required: true, message: "Iltimos, rasm yuklang!" }]}
          >
            <Upload
              name="file" // `curl` dagi "file" nomiga moslashtirdik
              listType="picture"
              maxCount={1}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  Notification({
                    type: "error",
                    message: "Faqat rasm fayllarini yuklang!",
                  });
                  return Upload.LIST_IGNORE;
                }

                const isLt5M = file.size / 1024 / 1024 < 5; // 5MB dan kichik
                if (!isLt5M) {
                  Notification({
                    type: "error",
                    message: "Rasm hajmi 5MB dan kichik bo‘lishi kerak!",
                  });
                  return Upload.LIST_IGNORE;
                }

                handleUpload(file);
                return false; // Avtomatik yuklashni o‘chirish
              }}
              onChange={(info) => {
                if (info.file.status === "done") {
                  form.setFields([
                    {
                      name: "faceImage",
                      value: info.file.originFileObj,
                    },
                  ]);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Rasm yuklash</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              // loading={isLoading}
              style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6" }}
            >
              Cheking
            </Button>
            {isSuccess && <p style={{ color: "green" }}>Kirish muvaffaqiyatli!</p>}
            {isError && <p style={{ color: "red" }}>Xatolik yuz berdi! Qayta urinib ko‘ring.</p>}
          </Form.Item>
        </Form>
        <p className="cursor-pointer" onClick={move} style={{ color: 'blue' }}>
          If you don't have an account
        </p>
      </div>
    </div>
  );
};

export default Login;