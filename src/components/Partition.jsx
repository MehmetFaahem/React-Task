import React from "react";
import { motion } from "framer-motion";
import { Card, Button, Space } from "antd";
import {
  BorderHorizontalOutlined,
  BorderVerticleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function Partition({ id, onSplit, onDelete, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ height: "100%", width: "100%" }}
    >
      <Card
        style={{ background: gradient, height: "100%", width: "100%" }}
        bodyStyle={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.h2
          className="text-white text-sm my-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            type: "spring",
            stiffness: 120,
          }}
        >
          Nested Partition {id}
        </motion.h2>
        <Space
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              type="primary"
              icon={<BorderHorizontalOutlined />}
              onClick={() => onSplit(id, "horizontal")}
            >
              Split Horizontal
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              type="primary"
              icon={<BorderVerticleOutlined />}
              onClick={() => onSplit(id, "vertical")}
            >
              Split Vertical
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(id)}
            >
              Remove
            </Button>
          </motion.div>
        </Space>
      </Card>
    </motion.div>
  );
}

export default Partition;
