import { TransactionModel } from './transaction-model';

export default class TransactionViewModel
{
    MIN_VISIBLE_IO = 5;
    
    isCollapsed = true;

    model: TransactionModel;

    constructor(tm: TransactionModel)
    {
        this.model = tm;
    }

    toggleCollapse()
    {
        this.isCollapsed = !this.isCollapsed;
    }

    getVisibleInputs()
    {
        if (this.isCollapsed)
        {
            return this.model.inputs.slice(0, this.MIN_VISIBLE_IO);
        }
        return this.model.inputs;
    }

    getVisibleOutputs()
    {
        if (this.isCollapsed)
        {
            return this.model.outputs.slice(0, this.MIN_VISIBLE_IO);
        }
        return this.model.outputs;
    }

    shouldDisplayButton()
    {
        return this.model.inputs.length > this.MIN_VISIBLE_IO || this.model.outputs.length > this.MIN_VISIBLE_IO
    }

    getButtonText()
    {
        let totalEntries = this.model.inputs.length + this.model.outputs.length;
        
        return this.isCollapsed ? "Show all ("+totalEntries+")" : "Hide list"
    }

    getHiddenTotal()
    {
        return (this.model.inputs.length + this.model.outputs.length) - (this.getVisibleInputs().length + this.getVisibleOutputs().length)
    }
}