import * as Yup from "yup";
import { Request, Response } from "express";
import AppError from "../errors/AppError";

import CreateFastReplyService from "../services/FastReplyServices/CreateFastReplyService";
import ListFastReplyService from "../services/FastReplyServices/ListFastReplyService";
import DeleteFastReplyService from "../services/FastReplyServices/DeleteFastReplyService";
import UpdateFastReplyService from "../services/FastReplyServices/UpdateFastReplyService";

// Interface para os dados da resposta rápida
interface FastReplyData {
  key: string;
  message: string;
  userId: number;
  tenantId: number | string;
  medias?: Express.Multer.File[];
}

// Função para armazenar uma nova resposta rápida
export const store = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;

  // Verifica se o usuário tem permissão para criar uma resposta rápida
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const medias = req.files as Express.Multer.File[];
  const newReply: FastReplyData = {
    ...req.body,
    userId: req.user.id,
    tenantId,
    medias
  };

  // Schema de validação com Yup
  const schema = Yup.object().shape({
    key: Yup.string().required("Key is required"),
    message: Yup.string().required("Message is required"),
    userId: Yup.number().required(),
    tenantId: Yup.number().required()
  });

  try {
    // Valida os dados da nova resposta rápida
    await schema.validate(newReply);
  } catch (error) {
    throw new AppError(error.message);
  }

  // Cria a nova resposta rápida
  const reply = await CreateFastReplyService(newReply);

  // Retorna a resposta criada
  return res.status(200).json(reply);
};

// Função para listar as respostas rápidas
export const index = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;
  const queues = await ListFastReplyService({ tenantId });
  return res.status(200).json(queues);
};

// Função para atualizar uma resposta rápida existente
export const update = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;

  // Verifica se o usuário tem permissão para atualizar uma resposta rápida
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const fastReplyData: FastReplyData = {
    ...req.body,
    userId: req.user.id,
    tenantId
  };

  // Schema de validação com Yup
  const schema = Yup.object().shape({
    key: Yup.string().required("Key is required"),
    message: Yup.string().required("Message is required"),
    userId: Yup.number().required()
  });

  try {
    // Valida os dados da resposta rápida a ser atualizada
    await schema.validate(fastReplyData);
  } catch (error) {
    throw new AppError(error.message);
  }

  const { fastReplyId } = req.params;
  const queueObj = await UpdateFastReplyService({
    fastReplyData,
    fastReplyId
  });

  // Retorna a resposta atualizada
  return res.status(200).json(queueObj);
};

// Função para remover uma resposta rápida
export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;

  // Verifica se o usuário tem permissão para remover uma resposta rápida
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  const { fastReplyId } = req.params;

  // Remove a resposta rápida
  await DeleteFastReplyService({ id: fastReplyId, tenantId });
  return res.status(200).json({ message: "Fast Reply deleted" });
};
