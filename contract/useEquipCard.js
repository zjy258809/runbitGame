
/**
 * 
 * @param {*} contract 获取装备，传装备合约equipContract；属性卡传cardContract
 * @returns 
 */
//获取装备详情，通过equipId获取
import {
    useContract,
} from '../contract/useContract.js'
import {
    cardAddress, cardAbi, equipAddress, equipAbi, RunbitAbi, RunbitAddress
} from '../contract/address.js'
import { getBindCards } from '../contract/useRunbit'
export async function getEquip(contract, equipId,account) {
    var equip = {}
    var copy ={}
    return useContract(RunbitAddress, RunbitAbi).then(runContract => {
        return contract.tokenMetaData(equipId).then(async e => {            
            Object.keys(e).forEach((key, index) => {
                copy[key] = typeof e[key] == 'number'?e[key]:e[key].toNumber()
                
              })
            equip.equip = copy
            equip.id = equipId.toNumber()
            await getBindCards(runContract, equipId,account).then(async cards => {
                equip.cards = cards
            })
            return contract.tokenURI(equipId).then(uri => {
                equip.img = uri
                return equip
            })

        })
    })


}
export async function getCard(contract, cardId) {
    var card = {}
    var copy ={}
	
    return useContract(RunbitAddress, RunbitAbi).then(async runContract => {
		
    return contract.tokenMetaData(cardId).then(async e => {   
        Object.keys(e).forEach((key, index) => {
            copy[key] = typeof e[key] == 'number'?e[key]:e[key].toNumber()
            
          })
        card.card = copy
        card.id = cardId.toNumber()
        await runContract.getCardInfo(cardId).then(async data=>{
            card.status = data[0].toNumber()
        })
        await runContract.getCardConsume(cardId).then(async res => {
            card.consume = res.toNumber()
        })
        return contract.tokenURI(cardId).then(async uri => {
            card.img = uri
            return card
        })
    })
})

}
export async function getMyCards(account,contract) {
    //获取属性卡数量numOfCard和属性卡合集cardCollect
    //cardLoading=true获取数据中
    var cardCollect=[]
    return contract.balanceOf(account).then(async num => {
		
        for (let i = 0;i < num; i++) {
		
		
           await contract.tokenOfOwnerByIndex(account,i).then(async cardId => {
			  
                  await  getCard(contract,cardId).then(card=>{
					 
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
    return contract.balanceOf(account).then(async num => {
        for (let i = 0; i < num; i++) {
           await contract.tokenOfOwnerByIndex(account,i).then(async equipId => {
                   await getEquip(contract,equipId,account).then(equip=>{
                            equipCollect[i] = equip
                })
            })
        }
        return equipCollect
    });
}
//获取授权情况 tokenContract对operate授权的情况
export async function getNFTApprove(tokenContract, owner, operator) {
    return tokenContract.isApprovedForAll(owner, operator)
}
//授权 tokenContract对operate授权
export async function approveNFT(tokenContract, operate) {
    return tokenContract.setApprovalForAll(operate, true)

}
//转让 
export async function transferNFT(ntfToken, from, to, nftId) {
    return ntfToken["safeTransferFrom(address,address,uint256)"](from, to, nftId)
}

