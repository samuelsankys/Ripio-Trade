import { Entity } from 'src/shared/application/domain/entity';
import { EventEmitterCustomerService } from './events/event-emitter-custormer';

interface CustomerProps {
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer extends Entity<CustomerProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: CustomerProps, id?: string) {
    super(props, id);
    eventEmitterService: EventEmitterCustomerService;
  }

  public static create(props: CustomerProps, id?: string): Customer {
    eventEmitterService: EventEmitterCustomerService;

    const isNewCustomer = id === null;
    const customer = new Customer(
      {
        ...props,
        updatedAt: props.updatedAt ?? new Date(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    // if (isNewCustomer) {
    //   this.eventEmitterService.emitCustomerCreatedEvent(customer.id);
    // }

    return customer;
  }
}
