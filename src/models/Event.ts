export default class Event {
    id:number;
    title: string;
    year: number;
    month: number;
    day: number;
    hour: number | null;
    city: string;
    color: number;

    constructor(
        id: number,
        title: string, 
        year: number,
        month: number,
        day: number,
        hour: number | null,
        city: string, 
        color: number
    )
    {
        this.id = id;
        this.title = title;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.city = city;
        this.color = color;
    }
}