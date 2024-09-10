import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Typography } from "antd";
import { Layout } from "antd";

const { Title } = Typography;
const { Content } = Layout;

export default function Home() {
  return (
    <Content style={{ padding: "50px", width: "100vw", height: "100vh" }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Title level={2}>
          Welcome to the Layout Builder and Alphabet Tiles!
        </Title>
        <motion.div
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: "flex", flexDirection: "row", gap: "10px" }}
        >
          <Button type="primary">
            <Link to="/layout-builder">Start Building</Link>
          </Button>
          <Button type="primary">
            <Link to="/alphabet">Alphabet Tiles</Link>
          </Button>
        </motion.div>
      </motion.div>
    </Content>
  );
}
