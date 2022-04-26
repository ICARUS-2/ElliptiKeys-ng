import Keys from "./Keys";
import KeyRowModel from './../models/key-row-model';

export default class PageHelper
{
    static ROWS_PER_PAGE = BigInt('128');
    static DELAY = 4;

    static CalculatePageNumber(num)
    {
        if (num <= PageHelper.ROWS_PER_PAGE)
            return 1;

        let remainder = num % PageHelper.ROWS_PER_PAGE;
        
        let pageNum = ((num - remainder) / PageHelper.ROWS_PER_PAGE) + BigInt('1');

        return pageNum;
    }

    static GetMaxPage()
    {
        console.log(Keys.MAX_PRIVATE_KEY)

        let division = Keys.MAX_PRIVATE_KEY / this.ROWS_PER_PAGE
        let modulo = Keys.MAX_PRIVATE_KEY / this.ROWS_PER_PAGE
        
        if (modulo != 0)
            division++

        return division
    }

    static GetKeysForPage(pageNumber)
    {
        let models = []

        let firstKeyNum = (pageNumber * PageHelper.ROWS_PER_PAGE - PageHelper.ROWS_PER_PAGE) + BigInt('1');

        for(let i = firstKeyNum; i < firstKeyNum + PageHelper.ROWS_PER_PAGE; i++)
        {
            models.push(new KeyRowModel(i))
        }

        return models
    }
}