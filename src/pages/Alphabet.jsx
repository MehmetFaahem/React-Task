import React, { useState, useEffect } from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

const Alphabet = () => {
  const [outputString, setOutputString] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTileClick = (letter) => {
    setOutputString((prevString) => {
      const newString = prevString + letter;
      return replaceConsecutiveLetters(newString);
    });
  };

  const replaceConsecutiveLetters = (str) => {
    return str.replace(/(.)\1{2,}/g, (match) => "_".repeat(match.length));
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Title
        level={2}
        style={{
          marginBottom: "16px",
          position: "absolute",
          top: "70px",
          left: "32px",
        }}
      >
        Alphabet Tiles
      </Title>
      <div
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: "32px",
          width: "100%",
          marginTop: "64px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(64px, 1fr))",
            gap: "16px",
            width: isSmallScreen ? "100%" : "60%",
          }}
        >
          {alphabet.map((letter) => (
            <Card
              key={letter}
              hoverable
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "64px",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
              }}
              onClick={() => handleTileClick(letter)}
            >
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                {letter}
              </span>
            </Card>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: isSmallScreen ? "100%" : "40%",
            marginTop: isSmallScreen ? "32px" : "0",
          }}
        >
          <Title level={4}>Output:</Title>
          <div
            id="outputString"
            style={{
              padding: "16px",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              fontSize: "20px",
              fontFamily: "monospace",
              height: "256px",
              overflowY: "auto",
            }}
          >
            {outputString}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alphabet;
