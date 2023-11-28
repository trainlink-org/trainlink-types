export * from './websocketEvents';
export * from './loco';

/**
 * Describes the direction of a Loco
 */
export enum Direction {
    forward = 'Forward',
    stopped = 'Stopped',
    reverse = 'Reverse',
}

export enum AutomationErrorType {
    syntaxError = 'Syntax Error',
    unknownError = 'Unknown Error',
}

export class AutomationError {
    readonly type: AutomationErrorType;
    readonly message: string;
    readonly location?: string;

    constructor(type: AutomationErrorType, msg: string, location?: string) {
        this.type = type;
        this.message = msg;
        this.location = location;
    }
}

export type LocoIdentifier = string | number;
export type JsonString = string;

// export interface ServerToClientEvents {
//     'metadata/handshake': (appName: string, version: string ) => void;
//     'metadata/initialState/trackPower': (state: boolean) => void;
//     'metadata/initialState/locos': (locos: jsonString[]) => void;
//     'metadata/initialState/turnouts': (packet: TurnoutPacket) => void;
//     'automation/fetchAllResponse': (automations: AutomationScriptClient[]) => void;
//     'automation/fetchRunningResponse': (automations: RunningAutomationClient[]) => void;
//     'automation/processingError': (error: AutomationError) => void;
//     'throttle/speedUpdate': (identifier: locoIdentifier, speed: number, socketId: string, throttleNum: number) => void;
//     'throttle/directionUpdate': (identifier: locoIdentifier, direction: Direction, id?: string) => void;
//     'throttle/functionUpdate': (identifier: locoIdentifier, functionNum: number, state: boolean) => void;
//     'throttle/trackPowerUpdate': (state: boolean, socketId: string) => void;
//     'routes/turnoutUpdate': (identifier: number, state: TurnoutState) => void;
//     'routes/routeUpdate': (route: RouteObject) => void;
//     'routes/setRouteComponents': (destinations: number[], turnouts: number[], links: number[]) => void;
//     'routes/unsetRouteComponents': (destinations: number[], turnouts: number[], links: number[]) => void;
//     'config/newLocoAdded': (loco: jsonString) => void;
//     'config/locoEdited': (oldAddress: number, newAddress: number, name: string) => void;
//     'config/locoDeleted': (address: number) => void;
// }

// export interface ClientToServerEvents {
//     'metadata/handshake': (appName: string, version: string ) => void;
//     'automation/fileUpload': (name: string, file: string) => void;
//     'automation/fetchAll': () => void;
//     'automation/fetchRunning': () => void;
//     'automation/setDescription': (id: number, description: string) => void;
//     'automation/pauseAutomation': (pid: PID) => void;
//     'automation/resumeAutomation': (pid: PID) => void;
//     'automation/stopAutomation': (pid: PID) => void;
//     'automation/executeAutomation': (id: number, locoId?: locoIdentifier) => void;
//     'automation/deleteAutomation': (id: number) => void;
//     'throttle/setSpeed': (identifier: locoIdentifier, speed: number, throttleID: number) => void;
//     'throttle/switchDirection': (identifier: locoIdentifier) => void;
//     'throttle/setDirection': (identifier: locoIdentifier, direction: Direction) => void;
//     'throttle/setTrackPower': (state: boolean) => void;
//     'throttle/setFunction': (identifier: locoIdentifier, functionNum: number, state: boolean) => void;
//     'routes/setTurnout': (identifier: number, state: TurnoutState) => void;
//     'routes/setRoute': (start: number, end: number) => void;
//     'config/addLoco': (name: string, address: number) => void;
//     'config/editLoco': (oldAddress: number, newName: string, newAddress: number) => void;
//     'config/deleteLoco': (address: number) => void;
//     'config/routes/addObject': (turnout: MapPoint) => void;
//     'config/routes/changeObjectCoordinate': (id: number, coordinate: Coordinate) => void;
// }

/**
 * Base type for a hardware adapter.
 */
export interface HardwareAdapter {
    locoSetSpeed(
        address: number,
        speed: number,
        direction: Direction
    ): Promise<void>;
    locoEstop(address: number): Promise<void>;
    turnoutSet(id: number, state: TurnoutState): Promise<void>;
    trackPowerSet(state: boolean): Promise<void>;
}

export enum AutomationType {
    sequence = 'Sequence',
    route = 'Route',
    automation = 'Automation',
    eventHandler = 'Event Handler',
}

export enum EventHandlerType {
    turnout = 'Turnout',
    none = 'None',
}

export interface AutomationScriptClient {
    name: string;
    id: number;
    description: string;
    type: AutomationType;
    source: string;
}

export interface RunningAutomationClient {
    name: string;
    description: string;
    type: AutomationType;
    status: AutomationStatus;
    locoAddress?: number;
    pid: PID;
}

export type PID = string;

export enum AutomationStatus {
    running = 'Running',
    paused = 'Paused',
}

export enum TurnoutState {
    closed = 'Closed',
    thrown = 'Thrown',
}

export interface TurnoutPacket {
    turnouts: Turnout[];
    links: TurnoutLink[];
    destinations: Destination[];
}

export interface MapPoint {
    id: number;
    coordinate: Coordinate;
}

export interface Node extends MapPoint {
    name: string;
    type: string;
    state: TurnoutState;
}

export interface Turnout extends MapPoint {
    name: string;
    state: TurnoutState;
    primaryDirection: number;
    secondaryDirection: number;
    // connections: number[];
}

export interface TurnoutLink {
    id: number;
    length: number;
    start: number; //Turnout.id || Destination.id
    end: number; //Turnout.id
    points: Coordinate[];
    startActive: boolean;
    endActive: boolean;
}

export interface Destination extends MapPoint {
    /** A negative id for the destination (Not exposed to user) */
    // id: number; // Should always be -ve
    name: string;
    description: string;
    // connections: number[];
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface RouteObject {
    start: Destination;
    turnouts: CurrentTurnoutState[];
    links: TurnoutLink[];
    end: Destination;
}

export interface RouteObjectNew {
    start: Node;
    nodes: Node[];
    end: Node;
    links: TurnoutLink;
}

export interface CurrentTurnoutState {
    id: number;
    state: TurnoutState;
}

/**
 * Checks if an object has the correct properties to be a {@link Turnout}
 * @param object Object to check
 * @returns True or false
 */
export function isTurnout(object: unknown): object is Turnout {
    if (typeof object === 'object' && object) {
        return 'primaryDirection' in object && 'secondaryDirection' in object;
    }
    return false;
}

/**
 * Checks if an object has the correct properties to be a {@link Destination}
 * @param object Object to check
 * @returns True or false
 */
export function isDestination(object: unknown): object is Destination {
    if (typeof object === 'object' && object) {
        return (
            !('primaryDirection' in object) && !('secondaryDirection' in object)
        );
    }
    return false;
}

export interface HardwareDevice {
    name: string;
    driver: string;
    address?: string;
    manufacturer?: string;
    serialNumber?: string;
}
