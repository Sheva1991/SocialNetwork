
export const updateObjectArray = (items: Array<any>, itemID: number, objPropName: string, newObjProps: object) => {

    return items.map(u => {
        if (u[objPropName] === itemID) {
            return { ...u, ...newObjProps }
        }
        return u;
    })
}
