import { BaseEntity } from '@common/entities/base.entity';
import { DateTime } from 'luxon';
import { Pojo } from 'objection';

export class Collaborator extends BaseEntity {
  static tableName = 'collaborators';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   */
  code: string;
  cpf: string;
  rg: string;
  birth_date: string;
  job: string;
  sex: string;
  work_type: string;
  status: string;
  civil_status: string;
  note: string;
  user_id: string;

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   */
  static relationMappings = {
    phones: {
      relation: BaseEntity.ManyToManyRelation,
      modelClass: `${__dirname}/../../phone/entities/phone.entity`,
      join: {
        from: 'collaborators.id',
        through: {
          from: 'phone_collaborators.collaborator_id',
          to: 'phone_collaborators.phone_id',
        },
        to: 'phones.id',
      },
    },
    addresses: {
      relation: BaseEntity.ManyToManyRelation,
      modelClass: `${__dirname}/../../address/entities/address.entity`,
      join: {
        from: 'collaborators.id',
        through: {
          from: 'address_collaborators.collaborator_id',
          to: 'address_collaborators.address_id',
        },
        to: 'addresses.id',
      },
    },
    bank: {
      relation: BaseEntity.HasOneRelation,
      modelClass: `${__dirname}/../../bank/entities/bank.entity`,
      join: {
        from: 'collaborators.id',
        to: 'banks.collaborator_id',
      },
    },
    user: {
      relation: BaseEntity.BelongsToOneRelation,
      modelClass: `${__dirname}/../../user/entities/user.entity`,
      join: {
        from: 'collaborators.user_id',
        to: 'users.id',
      },
    },
  };

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  async $beforeUpdate() {
    this.updated_at = DateTime.local().toISO();
  }

  /**
   * ------------------------------------------------------
   * Scopes
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Methods
   * ------------------------------------------------------
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'code',
        'cpf',
        'rg',
        'birth_date',
        'job',
        'sex',
        'work_type',
        'status',
        'civil_status',
        'note',
      ],

      properties: {
        code: { type: 'string', minLength: 8, maxLength: 8 },
        cpf: { type: 'string', minLength: 10, maxLength: 14 },
        rg: { type: 'string', minLength: 10, maxLength: 18 },
        birth_date: { type: 'string' },
        job: { type: 'string' },
        sex: { type: 'string' },
        work_type: { type: 'string' },
        status: { type: 'string' },
        civil_status: { type: 'string' },
        note: { type: 'string' },
        user_id: { type: 'string' },
      },
    };
  }

  /**
   * ------------------------------------------------------
   * Serializer
   * ------------------------------------------------------
   */
  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return json;
  }
}
