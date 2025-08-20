import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { InteractionService } from '../interaction.service';
import { Interaction } from '../interaction';
import { MessageService } from '../message.service';
import { AddInteractComponent } from '../add-interact/add-interact.component';

@Component({
  selector: 'app-interactions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AddInteractComponent],
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.css']
})
export class InteractionsComponent implements OnInit {
  interactions$!: Observable<Interaction[]>;
  showAddInteract = false;

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
      this.messageService.add(`Updated interaction for ${interaction.customerName}`);
    });
  }

  handleAdd(interaction: { customerId: number; customerName: string; note: string }) {
    const newInteraction: Interaction = {
      id: 0, // backend can assign real id
      customerId: interaction.customerId,
      customerName: interaction.customerName,
      detail: interaction.note,
      date: new Date().toLocaleString()
    };
    this.interactionService.addInteraction(newInteraction).subscribe(() => {
      this.ngOnInit();
      this.messageService.add(`Added interaction for ${interaction.customerName}`);
    });
  }
}
