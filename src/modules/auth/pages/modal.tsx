// src/components/Modal.tsx
import { Modal, Form, Input, Button } from "antd";
import { CreateTeacher } from "../types"; // TypeScript turi oldingi fayldan olinadi

interface TeacherModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: CreateTeacher) => void;
}

const TeacherModal = ({ visible, onCancel, onCreate }: TeacherModalProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: CreateTeacher) => {
    onCreate(values); // Formadan olingan qiymatlarni yuboramiz
    form.resetFields(); // Formani tozalash
    onCancel(); // Modalni yopish
  };

  return (
    <Modal
      title="Yangi o‘qituvchi qo‘shish"
      visible={visible}
      onCancel={onCancel}
      footer={null} // Standart tugmalarni o‘chiramiz, o‘zimiz qo‘shamiz
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
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
          <Button type="primary" htmlType="submit" block>
            Qo‘shish
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TeacherModal;