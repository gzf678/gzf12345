import { post } from "../utils/request";
interface searchData{
    contractNo:string;
    person:string;
    tel:string;
    page:number;
    pageSize:number
}

interface searchData2{
    page:number;
    pageSize:number;
    no:string;
    status:string;
    startDate:string;
    endDate:string
}
export function getContractList(data:searchData){
    return post("/contractList",data)
}

export function getBillList(data:searchData2){
        return post("/billList",data)
}