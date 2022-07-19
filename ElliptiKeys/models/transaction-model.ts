export class TransactionModel
{
    hash: string = "";
    time: number = 0;
    block: number = 0;
    fee: number = 0;
    result: number = 0;
    balance: number = 0;

    inputs: TransactionIOModel[] = [];
    outputs: TransactionIOModel[] = []
}

export class TransactionIOModel
{
    value: number = 0;
    address: string = ""
}
