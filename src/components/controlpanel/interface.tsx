import { Room } from "../../interface";

export interface ControlPanelProps {
    roomNames: Array<string>,
    selectedRoomFromList?: Room
}