import { faker } from '@faker-js/faker';
import { Address } from '@modules/address/entities/address.entity';

export const AddressMock = () => {
  const address = new Address();

  Object.assign(address, {
    id: faker.datatype.uuid(),
    street: faker.address.street(),
    number: faker.address.buildingNumber(),
    complement: faker.address.secondaryAddress(),
    neighborhood: faker.address.direction(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip_code: faker.address.zipCode(),
  });

  return address;
};

export const AddressMocks = (mocks: number) => {
  const addresses: Address[] = [];
  for (let i = 0; i < mocks; i++) addresses.push(AddressMock());
  return addresses;
};
