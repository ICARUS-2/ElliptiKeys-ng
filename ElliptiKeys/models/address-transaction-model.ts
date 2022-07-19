import AddressModel from './address-model';
import { TransactionModel } from './transaction-model';

export default class AddressTransactionModel
{
    addressModel: AddressModel;
    transactionModels: TransactionModel[];

    constructor(addrModel: AddressModel, txModel: TransactionModel[])
    {
        this.addressModel = addrModel;
        this.transactionModels = txModel;
    }
}