import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.scss']
})
export class ProducerComponent implements OnInit, OnDestroy {

  receivedMessages: Array<string> = [];
  chatMessage: string = '';
  // @ts-ignore
  private topicSubscription: Subscription;

  constructor(private rxStompService: RxStompService) { }

  ngOnInit(): void {
    this.topicSubscription = this.rxStompService
      .watch('/topic/cons-prod')
      .subscribe((message: Message) => {
        this.receivedMessages.push(message.body);
        console.log("me llegó un betoide")
      });
  }

  onSendMessage() {
    this.rxStompService.publish({ destination: '/topic/prod-cons', body: this.chatMessage });
  }

  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
  }

}
