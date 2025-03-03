// src/components/Spinner.tsx
import React from "react";
import { Spin, Flex } from "antd";

const Spinner: React.FC = () => {
  return (
    <Flex justify="center" align="center" className="w-screen h-screen">
      <Spin tip="Loading" size="large" />
    </Flex>
  );
};

export default Spinner;