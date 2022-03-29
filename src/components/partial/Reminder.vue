<template>
<div class="content" v-click-outside="fnHideToolTip">      
    <div class="h-100 w-100 text-start reminder-content" @click.self="fnAddEvent">        
        <div :class="`d-flex bg-color-${eventDay.color} temp-tag-reminder`"
          @click.self="editEvent(eventDay.id, $event)" 
          v-for="(eventDay, index) in getEventsByDate(day, month, year)" 
          :key="eventDay.title + index">
          {{eventDay.title}} - {{ $aHours[eventDay.hour].name }}
          <span role="button" class="ms-auto" @click.self="fnDeleteEvent(eventDay.id)">X</span>
        </div>
        <div ref="btnAddEvent" class="temp-tag-reminder" v-show="tempTagReminder">
          (No title)
        </div>
    </div>
    <tooltip-event :id="id" ref="tooltip" :openToolTip="openToolTip" @close-tooltip="fnHideToolTip" />
</div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop } from "vue-property-decorator";
import { createPopper } from '@popperjs/core';
import vClickOutside from 'v-click-outside';
import TooltipEvent from './TooltipEvent.vue';
import { Getter, Action } from "vuex-class";
import Event from '@/models/Event';

@Component({
  components:{
    TooltipEvent
  },
  directives:{
    clickOutside: vClickOutside.directive
  }
})
export default class Reminder extends Vue {
    @Ref('btnAddEvent') readonly btnAddEvent!: HTMLDivElement;
    @Ref('tooltip') readonly tooltip!: TooltipEvent;
    @Prop(Number) readonly day!: number;
    @Prop(Number) readonly month!: number;
    @Prop(Number) readonly year!: number;
    @Getter('EventModule/getEventsByDate') getEventsByDate !: (day: number, month: number, year: number) => Event[];
    @Action('EventModule/setDay') setDay!: any;
    @Action('EventModule/deleteEvent') deleteEvent!: any;

    tempTagReminder = false;
    openToolTip = false;
    popperInstance : any;
    id = 0;

    createTooltip(btnEvent: HTMLElement) {
      this.popperInstance = createPopper(btnEvent, this.tooltip.$el as HTMLElement, {
        placement: 'left',
        modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9],
              }
            }
        ]
      });
    }

    async fnAddEvent(){
      this.id = 0;
      this.tempTagReminder = true;
      this.createTooltip(this.btnAddEvent);      
      this.setDay(this.day);
      await this.fnOpenTooltip();      
    }

    async fnOpenTooltip() {            
      this.openToolTip = true;
      await this.popperInstance.forceUpdate();         
    }

    fnHideToolTip(): void {
        this.openToolTip = false;
        this.tempTagReminder = false;
        if(this.popperInstance != undefined)this.popperInstance.destroy();
        this.id = 0;
    }

    async editEvent(id: number, ev: {target: EventTarget}) {
      this.setDay(this.day);
      this.id = id;
      this.tempTagReminder = false;
      this.createTooltip(ev.target as HTMLElement);
      await this.fnOpenTooltip();
      await this.popperInstance.update();
    }

    fnDeleteEvent(id: number) {
      this.fnHideToolTip();
      this.deleteEvent(id);
    }
}
</script>
<style lang="scss">
.temp-tag-reminder {
  background: #ccc;
  border-radius: 4px;
  background-color: rgb(3, 155, 229);
  border-color: rgb(3, 155, 229);
  color: #fff;
  font-size: 12px;
  padding: 4px 12px;
  line-height: 1;
  margin-bottom: 2px;
}

.content{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 35px;
  padding: 0 4px;
  .reminder-content{
    cursor: pointer;
    overflow-y: auto;
    padding-bottom: 20px;
  }
}
</style>