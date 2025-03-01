// src/pages/logout.tsx
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Popconfirm } from "antd";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("teacherId"); // Cookie’dan teacherId ni o‘chirish
    navigate("/"); // Login sahifasiga qaytish
  };

  // Komponent avtomatik ishlaydi, foydalanuvchiga xabar ko‘rsatish mumkin
  return (
    <div className="">
      <Popconfirm
        title="Hisobni o‘chirishni tasdiqlaysizmi?"
        onConfirm={handleLogout}
        okText="Ha"
        cancelText="Yo‘q"
        okButtonProps={{
          style: { backgroundColor: "#ef4444", borderColor: "#ef4444" },
        }}
      >
        <Button danger type="primary" className="">
          Chiqish
        </Button>
      </Popconfirm>
    </div>
  );
};

export default Logout;
