export default class Event {
    title: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    city: string;
    color: string;

    constructor(
        title: string, 
        year: number,
        month: number,
        day: number,
        hour: number,
        city: string, 
        color: string
    ) 
    {
        this.title = title;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.city = city;
        this.color = color;
    }
}