import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'ws';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Client } from 'socket.io';
import {  } from "@nestjs/platform-ws";

import {  } from "@nestjs/platform-socket.io";
import { Client, Socket } from 'socket.io';

@WebSocketGateway(3002, {
    namespace: 'ws',
    transports: ['websocket'],
    path: '/ws',
    serveClient: true
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        console.log('afterInit', server)
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log('handleConnection', client)
        console.log('handshake', client.handshake && client.handshake.query.token)
    }

    handleDisconnect(client: Client) {
        console.log(`Websocks client ${client.id} disconnect`)
    }
    
    @SubscribeMessage('events')
    onEvent(client: Socket, data: string): Observable<WsResponse<any>> | any {
        // console.log(client)
        
        // 通知对应客户端 events 事件
        // client.server.emit('events', data)
        client.send('events');
        // Array.from(this.server.clients).forEach(a => {
        //     a.send(JSON.stringify({event: 'events', data: 'qweqwe'}))
        // })
        // 通知其他客户端 chat 事件
        // client.broadcast.emit('events', data);
        // console.log(client)
        // this.server.sockets.emit('events', '我是手表')
        // this.server.emit('events', { hello: 'world' })
        // return { event: 'events', data: data }
    }
}