// src/pages/index.tsx
import { useEffect, useState } from "react";
import { Button, Result, Popconfirm } from "antd";
import { LogoutOutlined,DeleteOutlined,EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTeacherById } from "../hooks/queries";
import {
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} from "../hooks/mutation";
import EditModal from "./modal"; // Modal komponentini import qilamiz
import { Teacher } from "../types";

const Settings = () => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const teacherId = Cookies.get("teacherId");

  const { data, isLoading, isError, error } = useTeacherById(teacherId);
  const deleteMutation = useDeleteTeacherMutation();
  const updateMutation = useUpdateTeacherMutation();

  useEffect(() => {
    if (data) {
      setTeacher(data);
    }
  }, [data]);

  const handleDelete = () => {
    if (teacherId) {
      deleteMutation.mutate(teacherId);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = (values: Partial<Teacher>) => {
    if (teacherId) {
      const updatedTeacher: Teacher = {
        id: teacherId,
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        phone: values.phone || "",
        pinfl: values.pinfl || "",
        degree: values.degree || "",
        position: values.position || "",
      };
      updateMutation.mutate(updatedTeacher, {
        onSuccess: (updatedData: Teacher) => {
          setTeacher(updatedData); // Yangilangan ma’lumotlarni state’da yangilash
          setIsModalVisible(false); // Modalni yopish
        },
      });
    }
  };

  const handleLogout = () => {
    Cookies.remove("teacherId");
    navigate("/");
  };

  if (!teacherId) {
    return (
      <Result
        status="warning"
        title="Siz tizimga kirmagansiz!"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Kirish sahifasiga qaytish
          </Button>
        }
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        Yuklanmoqda...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[100vh] text-red-500">
        Xatolik yuz berdi: {error?.message || "Qayta urinib ko‘ring"}
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        Ma’lumot topilmadi
      </div>
    );
  }

  return (
    <div className="card w-full h-[100%] flex flex-col justify-center items-center">
      <div className="box w-[100%] h-[100%] flex flex-col gap-[20px] p-[30px] items-center">
        <h2 className="text-[25px] font-bold">Hisob sozlamalari</h2>
        <div className="w-full text-left">
          <p>
            <strong>ID:</strong> {teacher.id}
          </p>
          <p>
            <strong>Ism:</strong> {teacher.firstName}
          </p>
          <p>
            <strong>Familiya:</strong> {teacher.lastName}
          </p>
          <p>
            <strong>Telefon:</strong> {teacher.phone}
          </p>
          <p>
            <strong>PINFL:</strong> {teacher.pinfl}
          </p>
          <p>
            <strong>Daraja:</strong> {teacher.degree}
          </p>
          <p>
            <strong>Lavozim:</strong> {teacher.position}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            type="primary"
            onClick={showModal}
            style={{ backgroundColor: "#3b82f6", borderColor: "#3b82f6" }}
          >
            <EditOutlined />Edit account
          </Button>
          <Popconfirm
            title="Hisobni o‘chirishni tasdiqlaysizmi?"
            onConfirm={handleDelete}
            okText="Delete"
            cancelText="Concel"
            okButtonProps={{
              style: { backgroundColor: "#ef4444", borderColor: "#ef4444" },
            }}
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#ef4444", borderColor: "#ef4444" }}
              // loading={deleteMutation.isLoading}
            >
              <DeleteOutlined />Delete account
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Hisobdan chiqishni tasdiqlaysizmi?"
            onConfirm={handleLogout}
            okText="confirm"
            cancelText="concel"
            okButtonProps={{
              style: { backgroundColor: "#ef4444", borderColor: "#ef4444" },
            }}
          >
            <Button danger type="primary" className="">
            <LogoutOutlined />Chiqish
            </Button>
          </Popconfirm>
        </div>

        <EditModal
          visible={isModalVisible}
          teacherId={teacherId}
          onCancel={handleCancel}
          onUpdate={handleUpdate}
          updatedTeacher={updateMutation.data as Teacher} // Yangilangan teacher ma’lumotlarini props sifatida yuborish
        />
      </div>
    </div>
  );
};

export default Settings;
