import { IDB } from "../components/idb.js";
export class Calendar {
  constructor() {
    this.dbname = "calendar_";
    this.db = new IDB();
  }
  async openDB() {
    await this.db.open(this.dbname, 1);
  }
  async getItemsDB(item_id) {
    //needs a then/await to get data
    const got = await this.db.get(this.dbname, item_id);
    return got;
  }
  async putItemsDB(item) {
    //item includes a  id field which will be used as the id in IDB
    await this.db.put(this.dbname, item);
  }
  async deleteItemsDB(item_id) {
    //item includes a  id field which will be used as the id in IDB
    await this.db.delete(this.dbname, item_id);
  }

  static MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  static MONTH_NAMES_SHORT = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  static WEEKDAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  static WEEKDAY_NAMES_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  static TODAY = new Date();
  static TODAY_DAY = parseInt(Calendar.TODAY.getDay());
  static TODAY_DATE = parseInt(Calendar.TODAY.getDate());
  static TODAY_YEAR = parseInt(Calendar.TODAY.getFullYear());
  static TODAY_MONTH = parseFloat(Calendar.TODAY.getMonth());
  static isWeekend(year, month, date) {
    //Sa and Su
    let weekdays = new Date(year, month, date).getDay();
    if (weekdays == 0 || weekdays == 6) {
      return true;
    }
  }
  static isToday(year, month, date) {
    if (
      year == Calendar.TODAY_YEAR &&
      month == Calendar.TODAY_MONTH &&
      date == Calendar.TODAY_DATE
    ) {
      return true;
    }
  }
  static isLeapYear(year) {
    if (year % 4 === 0) return true;
  }
  static getWeekDay(day, short) {
    return (short ? Calendar.WEEKDAY_NAMES_SHORT : Calendar.WEEKDAY_NAMES)[day];
  }
  static getMonthDays(year, month) {
    return [
      31,
      Calendar.isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ][month];
  }
  static createMonthsArray(month_days) {
    return Array.from({ length: month_days }, (_, i) => i + 1);
  }
}
