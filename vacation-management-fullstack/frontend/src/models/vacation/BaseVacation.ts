export default interface BaseVacation {
    destination: string,
    description: string,
    startDate: Date | string,
    endDate: Date | string,
    price: number,
}