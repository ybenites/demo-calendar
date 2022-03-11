<template>
<div class="content" v-click-outside="fnHideToolTip">      
    <div class="h-100 w-100 text-start" @click="fnOpenTooltip">
        <div ref="btnEvent" class="temp-tag-reminder" v-show="tempTagReminder">
          (No title)
        </div>
    </div>
    <tooltip-event ref="tooltip" :openToolTip="openToolTip" />
</div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop } from "vue-property-decorator";
import { createPopper } from '@popperjs/core';
import vClickOutside from 'v-click-outside';
import TooltipEvent from './TooltipEvent.vue';

@Component({
  components:{
    TooltipEvent
  },
  directives:{
    clickOutside: vClickOutside.directive
  }
})
export default class Reminder extends Vue {
    @Ref('btnEvent') readonly btnEvent!: HTMLDivElement;
    @Ref('tooltip') readonly tooltip!: TooltipEvent;
    @Prop(Number) readonly day!: number;
    @Prop(Number) readonly month!: number;
    @Prop(Number) readonly year!: number;


    tempTagReminder = false;
    openToolTip = false;
    popperInstance : any;
    
    mounted(){
        this.$nextTick(() => {
            this.popperInstance = createPopper(this.btnEvent, this.tooltip.$el, {
                placement: 'left',
                modifiers: [
                    {
                    name: 'offset',
                    options: {
                        offset: [0, 9],
                    },
                    },
                ],
            });
        });
    }

    fnOpenTooltip() : void {
      this.tempTagReminder = true;
      this.openToolTip = true;
      this.popperInstance.update();
    }

    fnHideToolTip(): void {
        this.openToolTip = false;
        this.tempTagReminder = false;
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
}

.content{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 35px;
  padding: 0 4px;
}
</style>