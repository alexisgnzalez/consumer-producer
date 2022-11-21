import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit, OnDestroy {

  messages: Array<string> = [];
  chatMessage: string = '';
  //@ts-ignore
  topicSubscription: Subscription;

  constructor(private rxStompService: RxStompService) { }

  ngOnInit(): void {
    this.topicSubscription = this.rxStompService
      .watch('/topic/prod-cons')
      .subscribe((message: Message) => {
        this.messages.push(message.body);
      });
  }

  onSendMessage() {
    this.rxStompService.publish({ destination: '/topic/cons-prod', body: this.chatMessage });
  }

  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
  }

}
