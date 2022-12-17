import { Path } from 'nestjs-i18n';

export type I18nTranslations = {
  exception: {
    not_found: string;
    invalid_credentials: string;
  };
  model: {
    user: {
      entity: string;
      field: {
        first_name: string;
        last_name: string;
        full_name: string;
        email: string;
        password: string;
        password_confirmation: string;
      };
    };
    role: {
      entity: string;
      field: {
        name: string;
        description: string;
      };
    };
    phone: {
      entity: string;
      field: {
        number: string;
        type: string;
      };
    };
    address: {
      entity: string;
      field: {
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
        state: string;
        zip_code: string;
      };
    };
    collaborator: {
      entity: string;
      field: {
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
      };
    };
    bank: {
      entity: string;
      field: {
        name: string;
        agency: string;
        account: string;
        pix: string;
      };
    };
    client: {
      entity: string;
      field: {
        cpf: string;
        rg: string;
        birth_date: string;
      };
    };
  };
  validation: {
    required: string;
    is_unique: string;
  };
};
export type I18nPath = Path<I18nTranslations>;
