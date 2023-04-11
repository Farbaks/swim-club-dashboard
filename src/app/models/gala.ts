export class Gala {
    name: string = '';
    description: string = '';
    requirements: string = '';
    startDate!: string;
    endDate!: string;
}

export class GalaGroup {
    name: string = '';
    description: string = '';
    raceId!: number
}

export class GalaGroupMember {
    name?: string;
    age?: number;
    club?: string;
    swimmerId?: number;
    raceGroupId!: number
}

export class GalaMemberPerfoomance {
    time: string = ''
    points!: number;
    strokeId!: number;
    rank?: string;
}