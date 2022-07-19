export class TransactionModel
{
    hash: string = "";
    time: number = 0;
    block: number|null = 0;
    fee: number = 0;
    result: number = 0;
    balance: number = 0;
    isCoinbase: boolean = false;

    inputs: TransactionIOModel[] = [];
    outputs: TransactionIOModel[] = []
}

export class TransactionIOModel
{
    value: number = 0;
    address: string = ""
}
