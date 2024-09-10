import React from "react";
import { motion } from "framer-motion";
import { Card, Button, Space } from "antd";
import {
  BorderHorizontalOutlined,
  BorderVerticleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function Partition({ id, onSplit, onDelete, gradient, parentGradient }) {
  const childGradient = React.useMemo(() => {
    if (parentGradient) {
      const [color1, color2] = parentGradient.match(
        /hsl\(\d+,\s*\d+%,\s*\d+%\)/g
      );
      const newHue = (parseInt(color1.match(/\d+/)[0]) + 30) % 360;
      return `linear-gradient(135deg, ${color1}, hsl(${newHue}, 70%, 60%))`;
    }
    return gradient;
  }, [gradient, parentGradient]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ height: "100%", width: "100%" }}
    >
      <Card
        style={{ background: childGradient, height: "100%", width: "100%" }}
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
          Partition {id}
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
              Split H
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              type="primary"
              icon={<BorderVerticleOutlined />}
              onClick={() => onSplit(id, "vertical")}
            >
              Split V
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
          </motion.div>
        </Space>
      </Card>
    </motion.div>
  );
}

export default Partition;
