import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { validateEmail } from "../middleware/validation.js";

export const usersRouter = express.Router();

let users = [];

const isEmailRegistered = (email) => users.some((user) => user.email === email);

usersRouter.post("/signup", validateEmail, async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Por favor, verifique se passou o nome.",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Por favor, verifique se passou a senha.",
    });
  }

  if (isEmailRegistered(email)) {
    return res.status(400).json({
      message: "Email já cadastrado, insira outro.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
  };
  users.push(newUser);

  return res.status(201).json({
    message: `Seja bem-vindo ${name}! Pessoa usuária registrada com sucesso!`,
  });
});

usersRouter.post("/login", validateEmail, async (req, res) => {
  const { email, password } = req.body;

  if (!password) {
    return res.status(400).json({
      message: "Insira uma senha válida.",
    });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({
      message: "Email não encontrado no sistema, verifique ou crie uma conta.",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      message: "Senha incorreta.",
    });
  }

  return res.status(200).json({
    message: `Seja bem-vindo ${user.name}! Pessoa usuária logada com sucesso!`,
  });
});