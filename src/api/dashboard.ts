import {post,get} from "../utils/request"

export function getEnergyData(){
    return get("/energyData")
}

