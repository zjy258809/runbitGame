
/**
 * 
 * @param {*} contract 获取装备，传装备合约equipContract；属性卡传cardContract
 * @returns 
 */
//获取装备详情，通过equipId获取
export async function getEquip(contract,equipId){
    var equip = {}
    return contract.tokenMeta(equipId).then(e=>{
        equip.equip = e
        equip.id = equipId        
        // return contract.tokenURI(0).then(uri=>{
        //     equip.img=uri
            return equip
        // })
    })

}
export async function getCard(contract,cardId){
    var card = {}
    return contract.tokenMeta(cardId).then(e=>{
        card.card = e
        card.id = cardId
        // return contract.tokenURI(1).then(uri=>{
        //     card.img=uri
            return card
        // })
    })

}
export async function getMyCards(account,contract) {
    //获取属性卡数量numOfCard和属性卡合集cardCollect
    //cardLoading=true获取数据中
    var cardCollect=[]

    return contract.balanceOf(account).then(num => {
        for (let i = 0;i < num; i++) {
            contract.tokenOfOwnerByIndex(account,i).then(cardId => {
                    getCard(contract,cardId).then(card=>{
                    cardCollect[i] = card
                })
            })
        }
        return cardCollect
    });
}
//获取我的装备集合
export async function  getMyEquips(account,contract) {
    //获取装备数量numOfEquip和装备合集equipCollect
    var  equipCollect = []
    return contract.balanceOf(account).then(num => {
        for (let i = 0; i < num; i++) {
            contract.tokenOfOwnerByIndex(account,i).then(equipId => {
                    getEquip(contract,equipId).then(equip=>{			
                    equipCollect[i] = equip
                })
            })
        }
        return equipCollect
    });
}

