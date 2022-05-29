export default class LocalStorageHelper
{
    static PRIVATE_KEY_SEARCH_QUERY: string = "elliptikeys_PrivateKeySearchQuery";

    static SetPrivateKeySearchQuery(privateKey : string)
    {
        window.localStorage.setItem(LocalStorageHelper.PRIVATE_KEY_SEARCH_QUERY, privateKey)
    }

    static GetPrivateKeySearchQuery()
    {
        return window.localStorage.getItem(LocalStorageHelper.PRIVATE_KEY_SEARCH_QUERY)
    }

    static ClearPrivateKeySearchQuery()
    {
        return window.localStorage.removeItem(LocalStorageHelper.PRIVATE_KEY_SEARCH_QUERY)
    }
}