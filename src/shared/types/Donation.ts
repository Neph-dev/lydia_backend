export interface DonationDays {
    day: string;
    start: string;
    end: string;
}

export interface DonationFrequency {
    interval: number;
    unit: 'Week' | 'Month';
}