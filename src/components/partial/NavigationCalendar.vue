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
            :value="month"
            @input="setMonth"  ></v-select>
        </div>
        <div class="pl-3 w-25">        
          <v-select :clearable="false" :options="a_years" :value="year" @input="setYear">
          </v-select>
        </div>
      </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Action } from "vuex-class";


@Component
export default class NavigationCalendar extends Vue {
    @Prop() readonly a_months!: any[];
    @State('EventModule') eventModule!: any;
    @Action('EventModule/setMonth') setMonth!: any;
    @Action('EventModule/setYear') setYear!: any;

    get year() {
      return this.eventModule.currentDateSelected.year;
    }

    get month() {
      return this.eventModule.currentDateSelected.month;
    }

    get a_years(): number[]{
      return Array.apply(null, Array(this.year + 1000)).map((d,i)=>i+100);
    }

    previousMonth(): void {            
      let month = this.month;
      let year = this.year;

      month--;
      if(month === 0) {        
        year--;
        month = 12;
        this.setYear(year);
      }
      
      this.setMonth(month);
    }

    nextMonth() {
      let year = this.year;
      let month = this.month;

      month++;
      if( month === 13 ) {
          year++;
          month = 1;
          this.setYear(year);
      }

      this.setMonth(month);
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