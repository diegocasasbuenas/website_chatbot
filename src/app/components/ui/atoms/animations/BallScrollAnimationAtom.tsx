"use client";

import { motion } from "motion/react";

export default function BallScrollAnimation() {
  return <motion.div style={ball} />;
}

const ball = {
  width: 150,
  heigth: 150,
  backgroundColor: "#FFFFFF",
  borderRadius: "50%",
};
