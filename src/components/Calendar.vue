<template>
    <div class="d-flex flex-column vh-100">
      <NavigationCalendar 
        :a_months="a_months" 
        :monthSync.sync="month" 
        :yearSync.sync="year" />

      <div class="pb-4 h-100">
        <table class="table table-bordered h-100">
          <thead>
            <tr>
              <th class="text-center" v-for="day in a_days" :key="day.name">
                {{ day.name }}
              </th>
            </tr>        
          </thead>
          <tbody>
            <tr v-for="(week, index) in getWeeks" :key="index">
              <td :class="objDay" v-for="(objDay,index) in week" :key="objDay.day+index">
                  <div class="text-start fw-bold text-date">
                      <span class="day-month" :class="{ isCurrent:numberDay === objDay.day && staticYear === year && objDay.isCurrentMonthDate }">
                          {{objDay.day}}
                      </span>
                  </div>   
                  <Reminder v-if="objDay.isCurrentMonthDate" 
                    :day=objDay.day :month="month" :year="year" />
              </td>
            </tr>
          </tbody>      
        </table>
      </div> 
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavigationCalendar from "./partial/NavigationCalendar.vue";
import Reminder from "./partial/Reminder.vue";

@Component({
    components:{
        NavigationCalendar,
        Reminder
    }
})
export default class Calendar extends Vue {
    a_days = [
        {name: 'Sunday', shortName: 'Sun.'},
        {name: 'Monday', shortName: 'Mon.'},
        {name: 'Tuesday', shortName: 'Tues.'},
        {name: 'Wednesday', shortName: 'Wed.'},
        {name: 'Thursday', shortName: 'Thurs.'},
        {name: 'Friday', shortName: 'Fri.'},
        {name: 'Saturday', shortName: 'Sat.'}
    ];

    a_months = [
        {name: 'January', shortName: 'Jan.', order: 1},
        {name: 'February', shortName: 'Feb.', order: 2},
        {name: 'March', shortName: 'Mar.', order: 3},
        {name: 'April', shortName: 'Apr.', order: 4},
        {name: 'May', shortName: 'May', order: 5},
        {name: 'June', shortName: 'Jun.', order: 6},
        {name: 'July', shortName: 'Jul.', order: 7},
        {name: 'August', shortName: 'Aug.', order: 8},
        {name: 'September', shortName: 'Sept.', order: 9},
        {name: 'October', shortName: 'Oct.', order: 10},
        {name: 'November', shortName: 'Nov.', order: 11},
        {name: 'December', shortName: 'Dec.', order: 12}
    ];

    monthSelected = null;

    currentDate: Date = new Date();
    month: number = this.currentDate.getMonth() + 1;
    year: number = this.currentDate.getFullYear();
    staticYear: number = this.currentDate.getFullYear();
    numberDay = this.currentDate.getDate()   

    get getDaysInMonth(): number {
        return new Date(this.year, this.month, 0).getDate();
    }

    get getStartDayInMonth(): number {
        return new Date(this.year, this.month - 1 , 1).getDay() + 1;
    }

    get getDaysInPreviousMonth(): number {
        let previousYear = this.year;
        let previousMonth = this.month - 1;

        if( previousMonth === 0 ) {
            previousMonth = 12;
            previousYear--;
        }

        return new Date(previousYear, previousMonth, 0).getDate();
    }


    get getWeeks(): any[][]{
        let weeks: any[][] = [];
        let day = 0;    
        let firstPreviousDay: number = this.getDaysInPreviousMonth - this.getStartDayInMonth + 2;
        let firstCurrentDay = 1;
        let firstNextDay = 1;
        let counterDayCalendar = 0;
        let isPreviousMonthDate: boolean;
        let isCurrentMonthDate: boolean;
        let isNextMonthDate: boolean;

        for (let counterweek = 1; counterweek <= 6; counterweek++){
            let week:any[] = [];
            for(let counterDay = 1; counterDay <= 7; counterDay++) {
                counterDayCalendar++;
                isPreviousMonthDate = false;
                isCurrentMonthDate = false;
                isNextMonthDate = false;

                // validate days in previous month
                if(this.getStartDayInMonth > counterDayCalendar) {                
                    isPreviousMonthDate = true;          
                    day = firstPreviousDay++;
                }

                // validate days in current month
                if(this.getStartDayInMonth <= counterDayCalendar && this.getDaysInMonth > (counterDayCalendar - this.getStartDayInMonth)) {
                    isCurrentMonthDate = true;
                    day = firstCurrentDay++;
                }

                // validate days in next month
                if(this.getStartDayInMonth <= counterDayCalendar && this.getDaysInMonth <= (counterDayCalendar - this.getStartDayInMonth)) {
                    isNextMonthDate = true;
                    day = firstNextDay++;
                }

                week.push({
                    day: day,
                    isPreviousMonthDate: isPreviousMonthDate,
                    isCurrentMonthDate: isCurrentMonthDate,
                    isNextMonthDate : isNextMonthDate
                });
            }

            weeks.push(week);
        }
        return weeks;
    }    
}
</script>
<style lang="scss" scoped>
.table {
    thead{
        background: #3a79b5;
        color: #fff;
        th {
            border: #3a79b5;
        }
    }

    tbody {
        tr {
            border-color: #a3a5a6;
        }

        td {
            width: 14.285715%;
            border-color: #a3a5a6;
            position: relative;

            &:nth-child(1) {
                color: #3a79b5;
            }

            &:nth-child(7) {
                color: #3a79b5;
            }
        }
    }
}
.day-month{
    width: 24px;
    display: block;
    text-align: center;
}
.isPreviousMonthDate, .isNextMonthDate{
    .text-date {
        color: #cdcece !important;
    }
}
.isCurrent{
    background: #3a79b5;
    color: #fff !important;
    border-radius: 50%;
}

.isCurrentMonthDate {
    .day-month:not(.isCurrent) {
        &:hover {
            cursor: pointer;
            background: rgba(58, 121, 181, 0.5);
            color: #fff !important;
            border-radius: 50%;
            width: 24px;
            display: block;
            text-align: center;
        }
    }
}

</style>