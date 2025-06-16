import { motion } from "motion/react";
import Form from "./form/form";

const modalVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    y: 20,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Modal = ({ close }: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <Backdrop close={close} />

      {/* Modal Content*/}
      <ModalContent>
        <Form close={close} />
      </ModalContent>
    </div>
  );
};

const ModalContent = ({ children }: any) => {
  return (
    <motion.div
      className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
    >
      {children}
    </motion.div>
  );
};

const Backdrop = ({ close }: any) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/10 backdrop-blur-sm"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
      onClick={close}
      transition={{ duration: 0.2 }}
    />
  );
};

export default Modal;
