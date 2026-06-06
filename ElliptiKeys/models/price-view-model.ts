export default class PriceViewModel
{
    usdPrice: number = 0;
    changePercentage: number = 0;
    color: string = "white";

    constructor()
    {
        
    }

    getColor()
    {
        if (this.changePercentage < 0)
            return "red"

        return "lime"
    }
    
    getArrow()
    {
        if (this.changePercentage < 0)
            return "↓"

        return "↑"
    }
}