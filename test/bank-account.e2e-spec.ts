import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BankAccountModule } from 'src/modules/bank-account/bank-account.module';
import { IBankAccountRepository } from 'src/modules/bank-account/repositories/bank-account-repository.interface';
import { InMemoryBankAccountRepository } from 'src/modules/bank-account/repositories/in-memory/in-memory-bank-account.repository';

describe('BankAccountController (e2e)', () => {
  let app: INestApplication;
  let createdBankAccountId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BankAccountModule],
    })
      .overrideProvider(IBankAccountRepository)
      .useClass(InMemoryBankAccountRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/bank-account (POST)', async () => {
    const createBankAccountDto = {
      name: 'any_name',
      email: 'any@example.com',
    };

    const response = await request(app.getHttpServer())
      .post('/bank-account')
      .send(createBankAccountDto)
      .expect(201);
    createdBankAccountId = response.body.id;

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(createBankAccountDto.name);
    expect(response.body.email).toBe(createBankAccountDto.email);
  });

  it('/bank-account/:bankAccountId/balance (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/bank-account/${createdBankAccountId}/balance`)
      .expect(200);

    expect(response.body).toHaveProperty('currentBalance');
  });
});
