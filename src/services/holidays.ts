import { getResource } from "../adapters/xhr/axios";
import { API_HOLIDAYS } from "../helpers/constants/holidaysEndpoint";
import { IHolidays } from "../helpers/interfaces/IHolidays";
import { IData } from "../helpers/interfaces/IData";

export const getHolidays = async (): Promise<IHolidays[]> => {
    const holidays: IHolidays[] = [];
    const fillHolidays = (holidayObject: IData): void => {
        if (holidayObject) {
            holidayObject["england-and-wales"].events.map(object => {
                holidays.push({
                    name: object.title,
                    date: object.date,
                })
            })
        }
    };

    try {
        const response = await getResource(API_HOLIDAYS);
        fillHolidays(response.data);
        
    } catch (error) {
        console.error(error);
    }

    return holidays;
}