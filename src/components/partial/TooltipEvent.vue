<template>
    <div class="tooltip-custom" role="tooltip" v-show="openToolTip">
        <div class="pb-3">
            <div class="text-end">
                <button class="btnClose" @click="closeTooltip">X</button>
            </div>
            <div>
                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input v-model="eventData.title" 
                        type="text" 
                        :class="`form-control ${emptyTitle?'is-invalid':''}`" 
                        placeholder="Title"
                        @input="clearErrors" 
                        maxlength="30" />
                    <small class="invalid-feedback">Add title</small>
                </div>
                <div class="mb-3">
                    <label class="form-label">Time</label>
                    <v-select :clearable="false"
                        :class="`${emptyTime?'is-invalid':''}`" 
                        label="name" 
                        :options="$aHours" 
                        :reduce="(oHour) => oHour.hour"
                        @input="clearErrors"
                        v-model="timeSelected">                        
                    </v-select>
                    <small class="invalid-feedback">Add time</small>
                </div>
                <div class="mb-3">
                    <label class="form-label">City</label>
                    <input v-model="eventData.city" 
                        type="text" 
                        :class="`form-control ${emptyCity?'is-invalid':''}`" 
                        @input="clearErrors"
                        placeholder="City" />
                    <small class="invalid-feedback">Add city</small>
                </div>
                <div class="mb-3 d-flex">
                    <div class="pl-1">
                        <div class="circle-color bg-color-1 mb-1" 
                            role="button"
                            :class="{ isColorSelected: colorSelected === 1 }" 
                            @click="fnSelectColor(1)">
                        </div>
                         <div class="circle-color bg-color-2" 
                            :class="{ isColorSelected: colorSelected === 2 } " 
                            @click="fnSelectColor(2)">
                         </div>
                    </div>
                    <div class="px-1">
                        <div class="circle-color bg-color-3 mb-1" 
                            :class="{ isColorSelected: colorSelected === 3 }" 
                            @click="fnSelectColor(3)">
                        </div>
                         <div class="circle-color bg-color-4" 
                            :class="{ isColorSelected: colorSelected === 4 }" 
                            @click="fnSelectColor(4)">                             
                         </div>
                    </div>
                    <div class="px-1">
                        <div class="circle-color bg-color-5 mb-1" 
                            :class="{ isColorSelected: colorSelected === 5 }" 
                            @click="fnSelectColor(5)">
                        </div>
                         <div class="circle-color bg-color-6" 
                            :class="{ isColorSelected: colorSelected === 6 }" 
                            @click="fnSelectColor(6)">                             
                         </div>
                    </div>
                    <div class="px-1">
                        <div class="circle-color bg-color-7 mb-1" 
                            :class="{ isColorSelected: colorSelected === 7 }" 
                            @click="fnSelectColor(7)">
                        </div>
                         <div class="circle-color bg-color-8" 
                            :class="{ isColorSelected: colorSelected === 8 }" 
                            @click="fnSelectColor(8)">                             
                         </div>
                    </div>
                    <div class="px-1">
                        <div class="circle-color bg-color-9 mb-1" 
                            :class="{ isColorSelected: colorSelected === 9 }" 
                            @click="fnSelectColor(9)">
                        </div>
                         <div class="circle-color bg-color-10" 
                            :class="{ isColorSelected: colorSelected === 10 }" 
                            @click="fnSelectColor(10)">                             
                         </div>
                    </div>
                </div>
            </div>
            <div class="text-end">
                <button class="btn btn-primary" @click="saveEvent">Save</button>
            </div>
        </div>
        <div class="arrow-custom" data-popper-arrow></div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import Event from "@/models/Event";

@Component
export default class TooltipEvent extends Vue {
    @Prop() readonly openToolTip!: boolean;
    @Prop() id!: number;
    @State('EventModule') eventModule!: any;
    @Action('EventModule/addEvent') addEvent!: any;
    @Action('EventModule/editEvent') editEvent!: any;
    @Getter('EventModule/getTotalEvents') getTotalEvents!: number;
    @Getter('EventModule/getEventById') getEventById !: (id: number) => Event;
    @Watch('id') idChanged(val: number, oldVal: number) {
        if(val != 0) {
            this.eventData = Object.assign({}, this.getEventById(this.id));
            this.timeSelected = this.eventData.hour;
            this.colorSelected = this.eventData.color;
        } else {
            this.timeSelected = null;
            this.eventData.title = '';
            this.eventData.hour = null;
            this.eventData.city = '';
            this.colorSelected = 7;
            this.clearErrors();
        }
    }
    @Watch('openToolTip') openToolTipChanged(val: boolean, oldVal: boolean) {
        if(!val){
            this.timeSelected = null;
            this.eventData.title = '';
            this.eventData.hour = null;
            this.eventData.city = '';
            this.colorSelected = 7;
            this.clearErrors();
        }
    }

    colorSelected = 7;
    timeSelected : number | null = null;
    emptyTitle : boolean | null = null;
    emptyTime : boolean | null = null;
    emptyCity : boolean | null = null;

    eventData !: Event;

    get year() {
        return this.eventModule.currentDateSelected.year;
    }

    get month() {
        return this.eventModule.currentDateSelected.month;
    }

    get day() {
        return this.eventModule.currentDateSelected.day;
    }

    created() {
        this.eventData = new Event(0 ,'', this.year, this.month, this.day, this.timeSelected, '', this.colorSelected);
    }

    @Emit('close-tooltip')
    closeTooltip() {
      this.clearErrors();
    }

    clearErrors() {
        this.emptyTitle = false;
        this.emptyTime = false;
        this.emptyCity = false;
    }

    saveEvent() {
        if(this.validateEmptyValues()) {
            this.eventData.year = this.year;
            this.eventData.month = this.month;
            this.eventData.day = this.day;
            this.eventData.hour = this.timeSelected;
            this.eventData.color = this.colorSelected;
            if(this.id == 0) {
                this.eventData.id = this.getTotalEvents + 1;
                this.addEvent(this.eventData);
            } else {
                this.editEvent(this.eventData);
            }
            
            this.closeTooltip();
        }
        return;
    }

    validateEmptyValues() : boolean {
        let isValid = true;
        if(this.eventData.title === '') {
            this.emptyTitle = true;
            isValid = false;
        }
        if(this.timeSelected === null) {
            this.emptyTime = true;
            isValid = false;
        }
        if(this.eventData.city === '') {
            this.emptyCity = true;
            isValid = false;
        }

        return isValid;
    }

    fnSelectColor(color: number) {
        this.colorSelected = color;
    }
}
</script>

<style lang="scss" scoped>
.circle-color{
    width: 18px;
    height: 18px;
    border-radius: 50%;
    cursor: pointer;
}
.isColorSelected {
    border: 1px solid #333;
    box-shadow: 0px 0px 0px 3px rgba(0,0,0,0.5);
}

.btn-primary {
    background-color: #3a79b5 !important;
    border-color: #3a79b5 !important;

    &:hover {
        background-color: #039be5 !important;
        border-color: #039be5 !important;
    }
}

.tooltip-custom {
  display: inline-block;
  background: #ffffff;
  color: #643045;
  font-weight: bold;
  padding: 8px 16px;
  font-size: 13px;
  border-radius: 4px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  width: 450px;
  z-index: 10;

  .btnClose {
      background: transparent;
      border: 0;
      font-size: 18px;
  }
}

.arrow-custom,
.arrow-custom::before {
  position: absolute;
  width: 10px;
  height: 10px;
  background: inherit;
}

.arrow-custom {
  visibility: hidden;
}

.arrow-custom::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.tooltip-custom[data-popper-placement^='top'] > .arrow-custom {
  bottom: -4px;
}

.tooltip-custom[data-popper-placement^='bottom'] > .arrow-custom {
  top: -4px;
}

.tooltip-custom[data-popper-placement^='left'] > .arrow-custom {
  right: -4px;
}

.tooltip-custom[data-popper-placement^='right'] > .arrow-custom {
  left: -4px;
}
</style>