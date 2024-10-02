import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  AllowNull,
  DataType
} from "sequelize-typescript";
import Tenant from "./Tenant";
import User from "./User";

@Table({ freezeTableName: true })
class FastReply extends Model<FastReply> {
  // Chave primária da tabela
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // Chave única ou identificador da resposta rápida
  @AllowNull(false)
  @Column
  key: string;

  // Mensagem da resposta rápida
  @AllowNull(false)
  @Column
  message: string;

  // Chave estrangeira para o usuário que criou a resposta
  @ForeignKey(() => User)
  @Column
  userId: number;

  // Relação de pertencimento com o modelo User
  @BelongsTo(() => User)
  user: User;

  // Chave estrangeira para o tenant ao qual a resposta rápida pertence
  @ForeignKey(() => Tenant)
  @Column
  tenantId: number;

  // Relação de pertencimento com o modelo Tenant
  @BelongsTo(() => Tenant)
  tenant: Tenant;

  // Armazenamento de mídias associadas à resposta rápida
  @AllowNull(true)
  @Column(DataType.JSON)  // Usar JSON para armazenar arrays de strings
  medias: string[];

  // Data de criação da resposta rápida
  @CreatedAt
  createdAt: Date;

  // Data da última atualização da resposta rápida
  @UpdatedAt
  updatedAt: Date;
  
  tableName: "FastReply";
}

// Exporta o modelo para uso em outros arquivos
export default FastReply;

