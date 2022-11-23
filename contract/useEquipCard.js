
/**
 * 
 * @param {*} contract 获取装备，传装备合约equipContract；属性卡传cardContract
 * @returns 
 */
//获取装备详情，通过equipId获取
import {
    useContract, useQuickContract,
} from '../contract/useContract.js'
import {
    cardAddress, cardAbi, equipAddress, equipAbi, RunbitAbi, RunbitAddress
} from '../contract/address.js'
import { getBindCards } from '../contract/useRunbit'

const runContractPromise = useQuickContract(RunbitAddress, RunbitAbi)
const equipContractPromise = useQuickContract(equipAddress, equipAbi)
const cardContractPromise = useQuickContract(cardAddress, cardAbi)
export async function getEquip(equipContract, equipId, account) {
    let equip = {}
    let copy = {}
    const e = equipContract.tokenMetaData(equipId)
    const uri = equipContract.tokenURI(equipId)
    const cards = getBindCards(equipId, account)
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
    let card = {}
    let copy = {}
    const cardInfo = cardContract.tokenMetaData(cardId)
    const status = runContract.getCardInfo(cardId)
    const consume = runContract.getCardConsume(cardId)
    const uri = cardContract.tokenURI(cardId)
    return  Promise.all([cardInfo, status, consume, uri]).then(results => {
        let e = results[0]

        Object.keys(e).forEach((key, index) => {
            copy[key] = typeof e[key] == 'number' ? e[key] : e[key].toNumber()

        })
		debugger
        card.card = copy
        card.id = cardId.toNumber()
        card.status = results[1][0].toNumber()
		card.cardIndex = results[1][1].toNumber()
		card.consume = results[2].toNumber()
		card.img = results[3]
		
		 console.log("11111"+card.img);
		const cardValues =  runContract.getBindCard(card.status,card.cardIndex)
		
		return Promise.all([cardValues]).then(res => {
		    let e = res[0].toNumber();
			  console.log(22222);
		   if(e!=card.id)
		   {
		   	card.status =0;
		   }
		     return card
		
		})
		
       debugger
        return card

    })

}

export async function getCardvalues(runContract,equip, cardIndex) {
    let card = {}
    let copy = {}
    const cardInfo =  runContract.getBindCard(equip,cardIndex)
    
    return Promise.all([cardInfo]).then(results => {
        let e = results[0].toNumber();
		  console.log(22222);
        return e

    })

}
export async function getMyCards(account) {

    let cardContract = await cardContractPromise
    let runContract = await runContractPromise
    //获取属性卡数量numOfCard和属性卡合集cardCollect
    //cardLoading=true获取数据中
    let cardCollect = []
    let cardIds = []

    return cardContract.balanceOf(account).then(async num => {
        for (let i = 0; i < num; i++)
            cardIds[i] = cardContract.tokenOfOwnerByIndex(account, i)
        return Promise.all(cardIds).then(res => {
            res.map((cardId) => {
                if (cardId?.toNumber()) cardCollect.push(getCard(runContract, cardContract, cardId))
            })
            return Promise.all(cardCollect).then(res => {
                return res
            })
        })

    });
}
//获取我的装备集合
export async function getMyEquips(account) {
    //获取装备数量numOfEquip和装备合集equipCollect
    let equipCollect = []
    let equipIds = []
    let equipContract = await equipContractPromise
    return equipContract.balanceOf(account).then(async num => {
		debugger
        for (let i = 0; i < num; i++)
            equipIds[i] = equipContract.tokenOfOwnerByIndex(account, i)
        return Promise.all(equipIds).then(res => {
            res.map((equipId) => {
                if (equipId?.toNumber()) equipCollect.push(getEquip(equipContract, equipId, account))
            })
            return Promise.all(equipCollect).then(res => {
                return res
            })
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

