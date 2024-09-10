import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Button, Typography, Space } from "antd";
import { motion } from "framer-motion";
import "./App.css";
import Home from "./pages/Home";
import LayoutBuilder from "./pages/LayoutBuilder";
import Alphabet from "./pages/Alphabet";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header style={{ padding: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography.Text strong style={{ color: "white", fontSize: 20 }}>
              Task
            </Typography.Text>
            <Space>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button type="link">
                  <Link to="/" style={{ color: "white" }}>
                    Home
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button type="link">
                  <Link to="/layout-builder" style={{ color: "white" }}>
                    Layout Builder
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button type="link">
                  <Link to="/alphabet" style={{ color: "white" }}>
                    Alphabet Tiles
                  </Link>
                </Button>
              </motion.div>
            </Space>
          </motion.div>
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/layout-builder" element={<LayoutBuilder />} />
            <Route path="/alphabet" element={<Alphabet />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
