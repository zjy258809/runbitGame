import {
    useContract,
} from '../contract/useContract.js'
import {
    RunbitCollectionAddress,
    RunbitCollectionAbi,
    RBAddress,
    RBAbi,
    RBCTAddress,
    RBETAddress,
    RBCTAbi,
    RBETAbi
} from '../contract/address.js'
import {
    getEquip,getCard
} from './useEquipCard.js' 
//获取全部装备集合
export async function getCards(contract) {
    //获取属性卡数量numOfCard和属性卡合集cardCollect
    //cardLoading=true获取数据中
    var cardCollect = []

    contract.getCardCollectCount().then(num => {
        for (let i = 0; num && i < num; i++) {
            var card = {}
            contract.getCardCollection(i).then(cardResult => {
                card.card=cardResult
                //todo通过接口获取card的图片
                //cardImg = getImage(0,i)
                //card.img = cardImg
                cardCollect[i] = card
                cardLoading = false
            })
        }

        console.log("card", cardCollect)
    });
}
//获取装备集合
export async function getEquips(contract) {
    //获取装备数量numOfEquip和装备合集equipCollect
    var  equipCollect = []
    contract.getEquipCollectCount().then(num => {
        for (let i = 0; num && i < num; i++) {
            var equip
            contract.getEquipCollection(i).then(equipRest => {
                equip.equip = equipRest
                //todo通过接口获取card的图片
                //equipImg = getImage(1,i)
                //equip.img = equipImg
                equipCollect[i] = equip
                equipLoading = false;
            })
        }
        console.log("equip", equipCollect)
    });
}
//购买卡片
export async function buyCard(contract, cardId) {

// const tx = await contract.buyCard(from, to, tokenId, amount, [], {
//   // gasLimit: 100000,
//   // nonce: nonce || undefined,
// });

        let tx = await contract.buyCard(cardId,{
			 gasLimit: 121344,
			 gasprice:60574687305
		})
        //交易hash
    return tx
}

//获取合成费用
export async function getForgeFee(collectContract,equipType,level){
    return collectContract.getForgeFee(equipType,level)
    }