import {
    SubscribeMessage,
    WebSocketGateway,
    WsResponse,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Client } from 'socket.io';
import { } from '@nestjs/platform-ws';

import { } from '@nestjs/platform-socket.io';
import { Client, Socket, Server } from 'socket.io';
import { CustomLogger } from '../../logger/logger';
interface UserSocket extends Socket {
    username: string;
    login: boolean;
}

interface IUserInfo {
    username: string;
    id: string;
}
// interface UserClients: Map {
//   [key: string]: {
//     username: string,
//       id: number
//   }
// }

@WebSocketGateway(4002, {
    // namespace: 'ws',
    // transports: ['websocket'],
    path: '/ws',
    //   serveClient: false
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly logger: CustomLogger) { }

    @WebSocketServer()
    server: Server;

    loginUsers = new Map<string, IUserInfo>();

    roomsClients = new Map<string, Object>();

    afterInit(server: Server) {
        console.log('[socket-afterInit] socket.io 启动成功');
    }

    handleConnection(client: Socket, ...args: any[]) {
        // console.log('handleConnection', client)
        // console.log('handshake', client.handshake)
        this.logger.log(`[socket-handleConnection] 新用户链接了 ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`[socket-handleDisconnect] 新用户走了 ${client.id}`);
        this.loginUsers.delete(client.id);
    }

    @SubscribeMessage('login')
    onLogin(client: UserSocket, data: any): WsResponse | any {
        if (data.username) {
            this.loginUsers.set(client.id, {
                username: data.username,
                id: client.id,
            });
            client.login = true;
            return returnData('login', successData(data));
        }
        return returnData('login', errorData('请输入信息'));
    }

    @SubscribeMessage('joinRoom')
    joinRoom(client: UserSocket, data: any): WsResponse | any {
        if (client.login) {
            client.join(data.room);
            const connected = this.server.in(data.room).connected;
            console.log('当前在线人数', Object.keys(connected));
            return returnData(
                'joinRoom',
                successData({
                    online: Object.keys(connected),
                    ...data,
                }),
            );
        }
        return returnData('joinRoom', errorData('登录信息'));
    }

    @SubscribeMessage('roomMessage')
    onMessage(client: UserSocket, data: any): Observable<WsResponse<any>> | any {
        // 先看看此用户是否登录，如果没登录 则提示
        if (!client.login) {
            return returnData('roomMessage', errorData('请先登录'));
        }

        console.log(`-------分-----割-------线---start----`)
        console.log(`[ 房间号: ${data.room} ]`)
        console.log(`[ 开始发送信息: ${data} ]`)
        // client.to(data.room).emit('roomMessage', successData(data));
        this.server.in(data.room).emit('roomMessage', successData(data));
        // this.server.sockets
        // client.to(data.room).broadcast('roomMessage', successData(data))
        console.log(`-------分-----割-------线---end----`)
        // 给已经登录的用户 发送消息
        // this.loginUsers.forEach((val: any) => {
        //   console.log(val.id)
        //   // console.log(this.server.sockets)
        //   this.server.sockets[val.id].emit('roomMessage', successData(data))
        // })
        // this.server.sockets.sockets[]
        return returnData('roomMessage', successData(data))
    }

    @SubscribeMessage('events')
    onEvent(client: Socket, data: string): Observable<WsResponse<any>> | any {
        console.log(client.id);

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
        return { event: 'events', data: data };
    }
}

function returnData(event, data) {
    return {
        event,
        data,
    };
}

function successData(data: any) {
    return formatdata(0, data, 'success');
}

function errorData(msg: string, data?: any) {
    return formatdata(-1, data, msg);
}

function formatdata(code: number, data: any, msg: string) {
    return [code, data, msg];
}
