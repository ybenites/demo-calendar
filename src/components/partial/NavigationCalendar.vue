<template>
    <div class="d-flex py-4">
        <div>
          <span 
            @click="previousMonth"
            role="button" 
            class="material-icons align-middle fs-2 btn-arrow">
          chevron_left
          </span>
          <span
            @click="nextMonth" 
            role="button" 
            class="material-icons align-middle fs-2 btn-arrow">
          chevron_right
          </span>
        </div>
        <div class="w-25 px-3">
          <v-select
            :clearable="false" 
            label="name" 
            :options="a_months" 
            :reduce="(aMonth) => aMonth.order" 
            v-model="month"  ></v-select>
        </div>
        <div class="pl-3 w-25">        
          <v-select :clearable="false" :options="a_years" v-model="year">
          </v-select>
        </div>
      </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";


@Component
export default class NavigationCalendar extends Vue {
    @Prop() readonly a_months!: any[];
    @PropSync('monthSync', { type: Number }) month!: number;
    @PropSync('yearSync', { type: Number }) year!: number;

    a_years!: number[];

    created(){
        this.a_years = Array.apply(null, Array(this.year + 1000)).map((d,i)=>i+100);
    }

    previousMonth(): void {
        this.month--;
        if( this.month === 0 ) {
            this.year--;
            this.month = 12;
        }
    }

    nextMonth() {
        this.month++;
        if( this.month === 13 ) {
            this.year++;
            this.month = 1;
        }
    }
}
</script>

<style lang="scss">
.btn-arrow{
  &:hover{
    cursor: pointer;
    background-color: rgba(32,33,36,0.039);
    border-radius: 50%;
  }
}
</style>