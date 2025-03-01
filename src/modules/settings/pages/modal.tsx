// src/pages/modal.tsx
import { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useTeacherById } from "../hooks/queries";
// import { useUpdateTeacherMutation } from "../hooks/mutation";
import { Teacher, UpdateTeacher } from "../types";

interface ModalProps {
  visible: boolean;
  teacherId: string | undefined;
  onCancel: () => void;
  onUpdate: (values: Partial<UpdateTeacher>) => void;
  updatedTeacher?: Teacher; // Yangilangan teacher ma’lumotlari uchun yangi prop
}

const EditModal = ({ visible, teacherId, onCancel, onUpdate, updatedTeacher }: ModalProps) => {
  const [form] = Form.useForm();
  const { data: teacher, isLoading, isError, error } = useTeacherById(teacherId);

  useEffect(() => {
    // Agar updatedTeacher mavjud bolsa, uni forma uchun ishlatamiz, aks holda asosiy teacher’ni
    const teacherData = updatedTeacher || teacher;
    if (teacherData) {
      form.setFieldsValue({
        id: teacherData.id,
        firstName: teacherData.firstName,
        lastName: teacherData.lastName,
        phone: teacherData.phone,
        pinfl: teacherData.pinfl,
        degree: teacherData.degree,
        position: teacherData.position,
      });
    }
  }, [teacher, updatedTeacher, form]);

  const handleUpdate = (values: Partial<UpdateTeacher>) => {
    onUpdate(values);
  };

  if (isLoading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Xatolik yuz berdi: {error?.message || "Qayta urinib ko‘ring"}
      </div>
    );
  }

  return (
    <Modal
      title="Hisobni tahrirlash"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        style={{ width: "100%" }}
      >
        <Form.Item
          name="id"
          label="ID"
          hidden // ID ni forma ichida ko‘rsatmaslik uchun, lekin body’da qo‘shish uchun ishlatamiz
          initialValue={teacherId}
        >
          <Input disabled />
        </Form.Item>

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
          rules={[{ required: true, message: "Iltimos, telefon raqamni kiriting!" }]}
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
            // loading={updateMutation.isLoading}
            style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6" }}
          >
            Yangilash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;