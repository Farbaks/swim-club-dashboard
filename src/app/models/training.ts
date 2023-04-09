

export class Training {
    name: string = '';
    description: string = '';
    startTime: string = '';
    endTime: string = '';
    day!: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
    interval: 'once' | 'weekly' = 'once';
    squadId!: number;
}


export class TrainingPerformance {
    squadMemberId!: number;
    time!: string;
    points!: number;
    strokeId: string = '';
    trainingDate!: string;
}
