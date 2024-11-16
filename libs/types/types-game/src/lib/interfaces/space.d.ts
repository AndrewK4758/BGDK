import { SpaceType } from '../types/game';
import { IAvatar } from './avatar';
export interface ISpace {
    Value: string;
    Type: SpaceType;
    Previous: ISpace;
    Next: ISpace;
    Special: ISpace | null;
    AvatarsInSpace: IAvatar[];
    Display: string;
    value: string;
    type: SpaceType;
    previous: ISpace;
    next: ISpace;
    special: ISpace | null;
    avatarsInSpace: IAvatar[];
    display: string;
    occupied: boolean;
    land(avatar: IAvatar): void;
    leave(): void;
    ifOccupied(): void;
}
//# sourceMappingURL=space.d.ts.map