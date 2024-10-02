import express from "express";
import { v4 as uuidv4 } from "uuid";
import { users } from "./users.js";
import { validateEmail } from "../middleware/validation.js";

export const messagesRouter = express.Router();

let messages = [];

messagesRouter.post("/", validateEmail, (req, res) => {
  const { email, title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Por favor, forneça título e descrição.",
    });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado.",
    });
  }

  const newMessage = {
    id: uuidv4(),
    title,
    description,
    userId: user.id,
  };
  messages.push(newMessage);

  return res.status(201).json({
    message: "Mensagem criada com sucesso!",
    data: newMessage,
  });
});

messagesRouter.get("/:email", (req, res) => {
  const { email } = req.params;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado.",
    });
  }

  const userMessages = messages.filter((m) => m.userId === user.id);

  return res.status(200).json({
    message: "Seja bem-vinde!",
    data: userMessages,
  });
});

messagesRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const message = messages.find((m) => m.id === id);
  if (!message) {
    return res.status(404).json({
      message: "Mensagem não encontrada.",
    });
  }

  if (!title || !description) {
    return res.status(400).json({
      message: "Por favor, forneça título e descrição.",
    });
  }

  message.title = title;
  message.description = description;

  return res.status(200).json({
    message: "Mensagem atualizada com sucesso!",
    data: message,
  });
});

messagesRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const messageIndex = messages.findIndex((m) => m.id === id);

  if (messageIndex === -1) {
    return res.status(404).json({
      message: "Mensagem não encontrada.",
    });
  }

  messages.splice(messageIndex, 1);

  return res.status(200).json({
    message: "Mensagem apagada com sucesso",
  });
});