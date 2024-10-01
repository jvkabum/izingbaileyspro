import FastReply from "../../models/FastReply";
import { join } from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid"; // Para gerar nomes de arquivos únicos

interface Request {
  key: string;
  message: string;
  userId: number;
  tenantId: number | string;
  medias?: Express.Multer.File[];
}

const CreateFastReplyService = async ({
  key,
  message,
  userId,
  tenantId,
  medias
}: Request): Promise<FastReply> => {
  // Criação inicial do registro sem medias
  const fastReplyData = await FastReply.create({
    key,
    message,
    userId,
    tenantId
  });

  if (medias && medias.length > 0) {
    // Diretório para salvar arquivos
    const mediaPaths = await Promise.all(
      medias.map(async media => {
        const uniqueFileName = `${uuidv4()}-${media.originalname}`;
        const mediaPath = join(__dirname, "..", "..", "..", "public", uniqueFileName);

        // Certificar que a pasta existe
        await fs.promises.mkdir(join(__dirname, "..", "..", "..", "public"), { recursive: true });

        // Salvar o arquivo de forma assíncrona
        await fs.promises.writeFile(mediaPath, media.buffer);

        return uniqueFileName; // Retornar o nome do arquivo ou a URL relativa
      })
    );

    // Atualizar o campo medias com o caminho dos arquivos
    fastReplyData.medias = mediaPaths;
  }

  await fastReplyData.save();

  return fastReplyData;
};

export default CreateFastReplyService;

