import {
    useQuickContract,
} from '../contract/useContract.js'
import {
    RunbitProxyAddress, RunbitProxyAbi
} from '../contract/address.js'
export async function getUserInfo(account) {
    return useQuickContract(RunbitProxyAddress, RunbitProxyAbi).then(contract => {
        return contract.getUserInfo(account).then(info => {
            return info
        })
    })

}