import Event from '@/models/Event';
const currentDate: Date = new Date();

// initial state
const state = {
    loading: false,
    currentDateSelected: {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,        
        day: 0
    },
    events: [
        {
            id: 1,
            title: "title 1",
            year: 2022,
            month: 3,
            day: 15,
            hour: 14,
            city: "Trujillo",
            color: 3
        },
        {
            id: 2,
            title: "title 2",
            year: 2022,
            month: 3,
            day: 15,
            hour: 15,
            city: "Huaraz",
            color: 4
        },
        {
            id: 3,
            title: "title 3",
            year: 2022,
            month: 3,
            day: 16,
            hour: 14,
            city: "Trujillo",
            color: 3
        },
        {
            id: 4,
            title: "title 3",
            year: 2022,
            month: 4,
            day: 16,
            hour: 14,
            city: "Trujillo",
            color: 3
        }
    ]
};

// getters
const getters = {
    getEventsByDate( state: { events: Event[] }): any {
        return (day: number, month: number, year: number) => {
            return state.events.filter(e => e.day === day && e.month === month && e.year === year);
        }      
    },
    getTotalEvents( state: { events: Event[] }): number {
        return state.events.length;
    },
    getEventById( state: { events: Event[] }): any {
        return (id: number) => {
            return state.events.filter(e => e.id === id)[0];
        }
    }
}

// actions
const actions = {    
    setYear({ commit }: any, year: number) {
        commit("setYear", year);
    },
    setMonth({ commit }: any, month: number) {
        commit("setMonth", month);
    },
    setDay({ commit }: any, day: number) {
        commit("setDay", day);
    },
    addEvent({ commit }: any, event: Event) {
        commit("addEvent", event);
    },
    editEvent({ commit }: any, event: Event) {
        commit("editEvent", event);
    },
    deleteEvent({ commit }: any, id: number){
        commit("deleteEvent", id);
    }
}

// mutations
const mutations = {
    setYear(state: { currentDateSelected: any}, year: number) {
        state.currentDateSelected.year = year;
    },
    setMonth(state: { currentDateSelected: any}, month: number) {
        state.currentDateSelected.month = month;
    },
    setDay(state: { currentDateSelected: any}, day: number) {
        state.currentDateSelected.day = day;
    },
    addEvent(state: { events: any}, event: Event) {
        state.events.push(Object.assign({}, event));
    },
    editEvent(state: { events: any}, event: Event) {
        const index = state.events.findIndex((ev: Event) => ev.id === event.id);
        state.events[index] = Object.assign(state.events[index], event);
    },
    deleteEvent(state: { events: any}, id: number) {
        const index = state.events.findIndex((ev: Event) => ev.id === id);
        state.events.splice(index, 1);
    }
}

export const EventModule = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}