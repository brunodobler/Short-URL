export const adapterUrls = (urls) => {
    if(!urls) return null;

    return urls.map(item => ({
        id: item.nanoid,
        url: item.origin,
        isEnabled: item.enabled,
        uid: item.uid,
    }))
}