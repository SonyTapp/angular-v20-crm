import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractionService } from '../interaction.service';
import { Interaction } from '../interaction';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-interactions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.css']
})
export class InteractionsComponent implements OnInit {
  interactions$!: Observable<Interaction[]>;

  constructor(
    private interactionService: InteractionService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.interactions$ = this.interactionService.getAllInteractions();
  }

  deleteInteraction(interaction: Interaction) {
    this.interactionService.deleteInteraction(interaction.id).subscribe(() => {
      this.ngOnInit();
      this.messageService.add(`Deleted interaction for ${interaction.customerName}`);
    });
  }

  saveInteraction(interaction: Interaction) {
    this.interactionService.updateInteraction(interaction).subscribe(() => {
      console.log('Updated:', interaction);
      this.messageService.add(`Updated interaction for ${interaction.customerName}`);
    });
  }
}
