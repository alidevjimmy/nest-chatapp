import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Observable } from "rxjs";
import { JwtService } from "src/auth/jwt/jwt.service";
import { RoomService } from "src/room/room.service";
import { User } from "src/users/interface/user.interface";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server;

    connectedUsers: string[] = []

    constructor(
        private jwtService: JwtService,
        private roomService: RoomService
    ) { }



    async handleDisconnect(client: any) {
        const user : User = await this.jwtService.verify(
            client.handShake.query.token,
            true
        )

        const userPos = this.connectedUsers.indexOf(String(user._id))

        this.connectedUsers = [
            ...this.connectedUsers.slice(0,userPos),
            ...this.connectedUsers.slice(userPos + 1)
        ]

        this.server.emit('users' , this.connectedUsers)
    }

    async handleConnection(client: any, ...args: any[]) {
        const user: User = await this.jwtService.verify(
            client.handShake.query.token,
            true
        )

        this.connectedUsers = [...this.connectedUsers , String(user._id)]
        this.server.emit('users' , this.connectedUsers)
    }
    
    @SubscribeMessage('message')
    async onMessage(client : any , data : any) {
        const event : string = 'message'
        const res = data[0]

        await this.roomService.addMessage(res.message , res.room)
        client.broadcast.to(res.room).emit(event , res.message)

        return Observable.create(observer => {
            observer.next({event , data : res.message})
        })
    }

    @SubscribeMessage('join')
    async onRoomJoin(client : any , data : any): Promise<any> {
        client.join(data[0])
        const messages = this.roomService.findMessages(data , 25)

        client.emit('message' , messages)
    }

    @SubscribeMessage('leave')
    async onRoomLeave(client : any , data : any) {
        client.leave(data[0])
    }

}