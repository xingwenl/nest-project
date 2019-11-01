import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Client } from 'socket.io';
import {  } from "@nestjs/platform-ws";

import {  } from "@nestjs/platform-socket.io";
import { Client, Socket, Server } from 'socket.io';
interface UserSocket extends Socket {
    username: ''
}
interface UserClients {
    [key: string]: {
        username: ''
    }
}

@WebSocketGateway(3002, {
    namespace: 'ws',
    transports: ['websocket'],
    // path: '/ws',
    // serveClient: true
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    clients: UserClients = {}

    afterInit(server: Server) {
        // console.log('afterInit', server)
    }

    handleConnection(client: Socket, ...args: any[]) {
        // console.log('handleConnection', client)
        console.log('handshake', client.handshake)
    }

    handleDisconnect(client: Client) {
        console.log(`Websocks client ${client.id} disconnect`)
    }

    @SubscribeMessage('login')
    onLogin(client: UserSocket, data: any): WsResponse | any{
        if (data.username) {
            client.username = data.username
            this.clients[client.id] = {
                username: client.username
            }
            return { event: 'login', data: '登录成功' }
        }
        return { event: 'login', data: '请输入信息' }
    }

    
    @SubscribeMessage('events')
    onEvent(client: Socket, data: string): Observable<WsResponse<any>> | any {
        console.log(client.id)
        
        // 通知对应客户端 events 事件
        // client.server.emit('events', data)
        // client.send('events');
        // Array.from(this.server.clients).forEach(a => {
        //     a.send(JSON.stringify({event: 'events', data: 'qweqwe'}))
        // })
        // 通知其他客户端 chat 事件
        // client.broadcast.emit('events', data);
        // console.log(client)
        // this.server.sockets.emit('events', '我是手表')
        // this.server.emit('events', { hello: 'world' })
        // setInterval(() => {
        //     // client.send({ event: 'events', data: data });
        //     client.emit('events', {data: data})
        //     client.emit('message', {data: data})
        // }, 10000);
        return { event: 'events', data: data }
    }
}