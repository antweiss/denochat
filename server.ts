import { serve } from 'https://deno.land/std/http/server.ts';
//import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts';
import { connection } from './connections.ts';

serve(reqHandler, { port: 3000 });
console.log("Chat app listening on port 3000");

async function reqHandler(req: Request ): Promise<Response>  {
    
    // serve index.html file - route /  
    console.log("req ulr is " + req.url);
    console.log("req method is " + req.method);
    let url = new URL(req.url).pathname;
    if(url === '/'){
        return new Response(await Deno.readFile('./index.html'), 
        {status: 200});
    }

    // serve websocket route and accept socket - route /ws
    else if(url === '/ws'){
        console.log("req  is " + JSON.stringify(req));
        if (req.headers.get("upgrade") != "websocket") {
            return new Response(null, { status: 501 });
        }
        const { socket, response } = Deno.upgradeWebSocket(req);
        console.log("going into connection with " + JSON.stringify(socket));
        connection(socket);
        return response;

    }
    return new Response(null, 
        {status: 404});
}
