<template>
    <div class="tooltip-custom" role="tooltip" v-show="openToolTip">
        <div class="pb-3">
            <div class="text-end">
                <button class="btnClose">X</button>
            </div>
            <div>
                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control" placeholder="Title" maxlength="30">
                </div>
                <div class="mb-3">
                    <label class="form-label">Time</label>
                    <v-select :clearable="false" label="name" :options="a_hours">                        
                    </v-select>
                </div>
                <div class="mb-3">
                    <label class="form-label">City</label>
                    <input type="text" class="form-control" placeholder="City">
                </div>
                <div class="mb-3 d-flex">
                    <div class="pl-1">
                        <div class="circle-color color-1 mb-1" :class="{ isColorSelected: isColorSelected === 1 }">
                        </div>
                         <div class="circle-color color-2" :class="{ isColorSelected: isColorSelected === 2 }">
                         </div>
                    </div>
                    <div class="px-1">
                        <div class="circle-color color-3 mb-1" :class="{ isColorSelected: isColorSelected === 3 }">
                        </div>
                         <div class="circle-color color-4" :class="{ isColorSelected: isColorSelected === 4 }">                             
                         </div>
                    </div>
                    <div class="px-1">
                        <div class="circle-color color-5 mb-1" :class="{ isColorSelected: isColorSelected === 5 }">
                        </div>
                         <div class="circle-color color-6" :class="{ isColorSelected: isColorSelected === 6 }">                             
                         </div>
                    </div>
                    <div class="px-1">
                        <div class="circle-color color-7 mb-1" :class="{ isColorSelected: isColorSelected === 7 }">
                        </div>
                         <div class="circle-color color-8" :class="{ isColorSelected: isColorSelected === 8 }">                             
                         </div>
                    </div>
                    <div class="px-1">
                        <div class="circle-color color-9 mb-1" :class="{ isColorSelected: isColorSelected === 9 }">
                        </div>
                         <div class="circle-color color-10" :class="{ isColorSelected: isColorSelected === 10 }">                             
                         </div>
                    </div>
                </div>
            </div>
            <div class="text-end">
                <button class="btn btn-primary">Save</button>
            </div>
        </div>
        <div class="arrow-custom" data-popper-arrow></div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Event from "@/models/Event";

@Component
export default class TooltipEvent extends Vue {
    @Prop() readonly openToolTip!: boolean;

    isColorSelected = 7;
    // timeSelected : number;

    a_hours = [
        {hour:'24' , name:'12:00 am'},
        {hour:'1' , name:'1:00 am'},
        {hour:'2' , name:'2:00 am'},
        {hour:'3' , name:'3:00 am'},
        {hour:'4' , name:'4:00 am'},
        {hour:'5' , name:'5:00 am'},
        {hour:'6' , name:'6:00 am'},
        {hour:'7' , name:'7:00 am'},
        {hour:'8' , name:'8:00 am'},
        {hour:'9' , name:'9:00 am'},
        {hour:'10' , name:'10:00 am'},
        {hour:'11' , name:'11:00 am'},
        {hour:'12' , name:'12:00 pm'},
        {hour:'13' , name:'13:00 pm'},
        {hour:'14' , name:'14:00 pm'},
        {hour:'15' , name:'15:00 pm'},
        {hour:'16' , name:'16:00 pm'},
        {hour:'17' , name:'17:00 pm'},
        {hour:'18' , name:'18:00 pm'},
        {hour:'19' , name:'19:00 pm'},
        {hour:'20' , name:'20:00 pm'},
        {hour:'21' , name:'21:00 pm'},
        {hour:'22' , name:'22:00 pm'},
        {hour:'23' , name:'23:00 pm'},
    ]
}
</script>

<style lang="scss">
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
.color-1{
    background-color: rgb(213, 0, 0);   
}

.color-2 {
    background-color: rgb(230, 124, 115);
}

.color-3 {
    background-color: rgb(244, 81, 30);
}

.color-4 {
    background-color: rgb(246, 191, 38);
}

.color-5 {
    background-color: rgb(51, 182, 121);
}

.color-6 {
    background-color: rgb(11, 128, 67);
}

.color-7 {
    background-color: rgb(3, 155, 229);
}

.color-8 {
    background-color: rgb(63, 81, 181);
}

.color-9 {
    background-color: rgb(121, 134, 203);
}

.color-10 {
    background-color: rgb(142, 36, 170);
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
  right: -0px;
}

.tooltip-custom[data-popper-placement^='right'] > .arrow-custom {
  left: -4px;
}
</style>