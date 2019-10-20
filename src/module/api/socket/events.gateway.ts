import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway(3002, {namespace: 'ws'})
export class EventsGateway {
    @WebSocketServer()
    server: Server;
    
    @SubscribeMessage('events')
    onEvent(client: any, data: string): Observable<WsResponse<any>> | any {
        console.log(data)
        // 通知对应客户端 events 事件
        client.emit('events', data);
        // 通知其他客户端 chat 事件
        // client.broadcast.emit('events', data);
        // console.log(client)
        // this.server.sockets.emit('events', '我是手表')
        // return { event: 'events', data: data }
    }
}