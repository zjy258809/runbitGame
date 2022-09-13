
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
export async function getEquip(runContract, equipContract, equipId, account,flag) {
    var equip = {}
    var copy = {}
    const e = equipContract.tokenMetaData(equipId)
    const uri = equipContract.tokenURI(equipId)
    const cards = getBindCards(runContract, equipId, account,flag)
    return Promise.all([e, cards, uri]).then(results => {
        let equipInfo = results[0]
        Object.keys(equipInfo).forEach((key, index) => {
            copy[key] = typeof equipInfo[key] == 'number' ? equipInfo[key] : equipInfo[key].toNumber()

        })
        equip.equip = copy
        equip.id = equipId.toNumber()
        equip.cards = results[1]

        equip.img = results[2]
        return equip
    })






}
export async function getCard(runContract, cardContract, cardId) {
    var card = {}
    var copy = {}
    const cardInfo = cardContract.tokenMetaData(cardId)
    const status = runContract.getCardInfo(cardId)
    const consume = runContract.getCardConsume(cardId)
    const uri = cardContract.tokenURI(cardId)
    return Promise.all([cardInfo, status, consume, uri]).then(results => {
        let e = results[0]

        Object.keys(e).forEach((key, index) => {
            copy[key] = typeof e[key] == 'number' ? e[key] : e[key].toNumber()

        })
        card.card = copy
        card.id = cardId.toNumber()
        card.status = results[1][0].toNumber()
        card.consume = results[2].toNumber()
        card.img = results[3]
        return card

    })

}
export async function getMyCards(runContract, account, contract) {
    //获取属性卡数量numOfCard和属性卡合集cardCollect
    //cardLoading=true获取数据中
    var cardCollect = []
    return contract.balanceOf(account).then(async num => {
        for (let i = 0; i < num; i++) {
            await contract.tokenOfOwnerByIndex(account, i).then(cardId => {
                cardCollect[i] = getCard(runContract, contract, cardId)

            })
        }

        return Promise.all(cardCollect).then(res => {
            return res
        })
    });
}
//获取我的装备集合
export async function getMyEquips(runContract, account, contract) {
    //获取装备数量numOfEquip和装备合集equipCollect
    var equipCollect = []

    return contract.balanceOf(account).then(async num => {
        for (let i = 0; i < num; i++) {
            await contract.tokenOfOwnerByIndex(account, i).then(async equipId => {
                equipCollect[i] = getEquip(runContract, contract, equipId, account,2)
            })
        }      

        return  Promise.all(equipCollect).then(res => {
            console.log("-myequip",res)
            return res
        })
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

