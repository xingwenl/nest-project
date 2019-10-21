import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Client } from 'socket.io';
import {  } from "@nestjs/platform-ws";

import {  } from "@nestjs/platform-socket.io";
import { Client, Socket } from 'socket.io';

@WebSocketGateway(3002, {
    namespace: 'ws',
    transports: ['websocket'] 
})
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        server.emit('events', 'data');
        console.log('afterInit')
        
    }
    
    @SubscribeMessage('events')
    onEvent(client: Socket, data: string): Observable<WsResponse<any>> | any {
        console.log(client)
        console.log(client.handshake)
        console.log(client.id)
        // 通知对应客户端 events 事件
        // client.server.emit('events', data)
        client.send('events');
        Array.from(this.server.clients).forEach(a => {
            a.send('events12' + data)
        })
        // 通知其他客户端 chat 事件
        // client.broadcast.emit('events', data);
        // console.log(client)
        // this.server.sockets.emit('events', '我是手表')
        // this.server.emit('events', { hello: 'world' })
        // return { event: 'events', data: data }
    }
}