export class Squad {
    name: string = '';
    description: string = '';
    rank?: string;
    coachId!: number;
}

export class AddSquadMember {
    swimmer!: number;
}