//import { WebSocket, isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let sockets = new Map<string, WebSocket>();

interface BrodcastInterface {
    name: string,
    msg: string
};

const eventBrodcaster = (obj: BrodcastInterface) => {
//    console.log("In EB: " + JSON.stringify(obj));
    sockets.forEach((ws: WebSocket) => {
        console.log("Sending back to - " + JSON.stringify(ws));
        //console.log("Sending " + JSON.stringify(obj));
        ws.send(JSON.stringify(obj));
    });
}

const connection = async (ws: WebSocket) => {

    // New websocket and generate new user id
    const uid = v4.generate();
    sockets.set(uid, ws);

    const handleConnected = (ev:MessageEvent) => { 
        console.log("Scoekt open - " + JSON.stringify(ev));
        console.log("Type of - " + typeof ev);
        //if(typeof ev === 'string'){
          //  let evObj = JSON.parse(ev);
            eventBrodcaster(JSON.parse(ev.data));
       // }
    }

    ws.onmessage=(ev:MessageEvent)=>handleConnected(ev);

    ws.onclose=()=>{
        sockets.delete(uid);
    }

}
export { connection };
