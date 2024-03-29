export default class PriceViewModel
{
    usdPrice: Number = 0;
    changePercentage: Number = 0;
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