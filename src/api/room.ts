import { post } from "../utils/request";
export function getRoomList(roomid:string){
    return post("/roomList",{roomid})

}