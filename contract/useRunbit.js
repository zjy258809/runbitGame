/*-----
runbit合约相关调用,contract参数-runbit合约。实现:
**获取已购装备/属性卡
**绑定装备/属性卡
**卸下装备/属性卡
**查看指定账户指定装备类型（上衣，裤子，鞋子）的装备情况
**查看指定账户所有装备类型的装备情况
**查看指定账户的指定装备的卡槽情况
**查看指定装备的所有卡槽情况
操作类（绑定，卸下）合约调任使用如下
try{
      bindCard(contract,20007,20005,0).then(tx=>{
        //交易hash
        console.log(tx.hash)
    })
   
}catch (e) {
        //出错的一些操作

        console.error(e)
    }

查询类合约调用

try{
      getBindEquips(contract,this.myAccount).then(data=>{
        //查询结果data
        console.log("data-------",data)
    })
   
}catch (e) {
        //出错的一些操作

        console.error(e)
    }

-------*/
import {
    useContract,
} from '../contract/useContract.js'
import {
    cardAddress, cardAbi, equipAddress, equipAbi
} from '../contract/address.js'
import {
    getEquip, getCard
} from './useEquipCard.js'
import {
    ethers,
} from 'ethers'
/*---------------查询类合约调用-------------*/

//查看account账户绑定equipType（即上衣，裤子鞋子）的情况
//0-没绑定 非0-绑定的equipId
export async function getBindEquip(contract, account, equipType) {
    return contract.getBindEquip(contract, account, equipType)

}
//一次性获取account绑定着装情况,equipId=0代表未配备
export async function getBindEquips(contract, account) {
    var equips = []
    return useContract(equipAddress, equipAbi).then(async equipContract => {

        for (let equipType = 0; equipType < 3; equipType++) {
            await contract.getBindEquip(account, equipType).then(async equipId => {

                //equipId=0代表未配备,不去获取装备详情
                if (equipId.toNumber() === 0)
                    equips[equipType] = 0
                //equipId不为0代表已配备,获取装备详情
                //进一步获取equip详情
                else {
                    await equipContract.ownerOf(equipId).then(async owner => {
                        if (ethers.utils.getAddress(owner) != ethers.utils.getAddress(account))
                            equipCollect[i] = 0
                        else
                            //获取基本信息
                            await getEquip(equipContract, equipId, account).then(async equip => {
                                equips[equipType] = equip
                            })
                    })
                    //获取绑定的卡片信息


                }

            })
        }
        return equips
    })

}

//查看equipId的装备的所有卡槽情况
//0-没属性卡 非0-绑定的cardId
export async function getBindCards(contract, equipId, account) {
    var cards = []
    return useContract(cardAddress, cardAbi).then(async cardContract => {
        for (let index = 0; index < 3; index++) {
            await contract.getBindCard(equipId, index).then(async cardId => {
                if (cardId.toNumber() === 0)
                    cards[index] = 0
                //cardId=0代表未配备,不去获取装备详情
                //cardId不为0代表已配备,获取装备详情
                //进一步获取card详情
                else await cardContract.ownerOf(cardId).then(async owner => {
                    if (ethers.utils.getAddress(owner) != ethers.utils.getAddress(account))
                        cardCollect[i] = 0
                    else {
                            await getCard(cardContract, cardId).then(async card => {
                                if(card.consume<card.card.durability)
                                cards[index] = card
                                else card[index]=0
                            })

                        
                    }

                })

            })
        }
        return cards
    })
}

//获取合成费用
export async function getForgeFee(collectContract, equipType, level) {
    return collectContract.getForgeFee(equipType, level)
}

//获取预计收益
export async function getUnharvestReward(collectContract, userAddress, curDay) {
    return collectContract.getUnharvestReward(userAddress, curDay)
}



/*---------------操作类合约调用-------------*/
//绑定卡片 contract-runbit合约  index卡槽
export async function bindCard(contract, equipId, cardId, index,gasPriceString) {

   // let tx = await contract.bindCard(equipId, cardId, index)
	let tx = await contract.bindCard(equipId, cardId, index, {
		gasLimit: 1200000,
		gasPrice: gasPriceString
	});

    //交易hash
    return tx
}
//绑定装备-runbit合约
export async function bindEquip(contract, equipId,gasPriceString) {
	let tx = await contract.bindEquip(equipId, {
		gasLimit: 1200000,
		gasPrice: gasPriceString
	});
    // let tx = await contract.bindEquip(equipId)
    return tx
}
//卸下装备 equipType 0-上衣 1-裤子 2-鞋子
export async function unbindEquip(contract, equipType,gasPriceString) {

   // let tx = await contract.unbindEquip(equipType)
	let tx = await contract.unbindEquip(equipType, {
		gasLimit: 1200000,
		gasPrice: gasPriceString
	});
	
    //交易hash
    return tx

}
//卸下卡片 equipId-装备id，index-卡槽
export async function unbindCard(contract, equipId, index,gasPriceString) {

    // let tx = await contract.unbindCard(equipId, index)
	let tx = await contract.unbindCard(equipId,index, {
		gasLimit: 1200000,
		gasPrice: gasPriceString
	});
    //交易hash
    return tx
}

//设置赛道
export async function setTrack(contract, trackId,gasPriceString) {
    // return contract.updateTrack(trackId)
	let tx = await contract.updateTrack(trackId, {
		gasLimit: 1200000,
		gasPrice: gasPriceString
	});
	 return tx
}
//获取赛道
export function getTrackId(contract) {
    return contract.getTrackId()
}
export function getUserState(contract, address, day) {
    return contract.getUserState(address, day)
}

// const checkSum = (uint256(keccak256(abi.encodePacked(steps, user, day, seed))) & 0xffffffffffffffffffffffffffffffffffffffffffffffff) | (steps << 192) 
export function updateStep(contract, steps) {
    return contract.updateSteps(steps)
}