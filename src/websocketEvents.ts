import type {
    JsonString,
    TurnoutPacket,
    AutomationScriptClient,
    RunningAutomationClient,
    AutomationError,
    LocoIdentifier,
    Direction,
    TurnoutState,
    RouteObject,
    PID,
    MapPoint,
    Coordinate,
    HardwareDevice,
    TurnoutLink,
} from './index';

/* eslint-disable @typescript-eslint/naming-convention */
// prettier-ignore
export interface ServerToClientEvents {
    'metadata/handshake': (
        name: string, 
        productName: string, 
        version: string
    ) => void;
    'metadata/initialState/trackPower': (
        state: boolean
    ) => void;
    'metadata/initialState/locos': (
        locos: JsonString[]
    ) => void;
    'metadata/initialState/turnouts': (
        packet: TurnoutPacket
    ) => void;
    'metadata/availableDrivers': (
        drivers: string[]
    ) => void;
    'automation/fetchAllResponse': (
        automations: AutomationScriptClient[]
    ) => void;
    'automation/fetchRunningResponse': (
        automations: RunningAutomationClient[]
    ) => void;
    'automation/processingError': (
        error: AutomationError
    ) => void;
    'throttle/speedUpdate': (
        identifier: LocoIdentifier,
        speed: number,
        socketID: string,
    ) => void;
    'throttle/directionUpdate': (
        identifier: LocoIdentifier,
        direction: Direction,
        socketID: string
    ) => void;
    'throttle/functionUpdate': (
        identifier: LocoIdentifier,
        functionNum: number,
        state: boolean,
        socketID: string
    ) => void;
    'throttle/trackPowerUpdate': (
        state: boolean,
        socketId: string
    ) => void;
    'routes/turnoutUpdate': (
        identifier: number,
        state: TurnoutState
    ) => void;
    'routes/routeUpdate': (
        route: RouteObject
    ) => void;
    'routes/setRouteComponents': (
        destinations: number[],
        turnouts: number[],
        links: number[]
    ) => void;
    'routes/unsetRouteComponents': (
        destinations: number[],
        turnouts: number[],
        links: number[]
    ) => void;
    'routes/mapPointUpdate' : (
        object: MapPoint
    ) => void;
    'routes/turnoutLinkUpdate' : (
        object: TurnoutLink
    ) => void;
    'config/newLocoAdded': (
        loco: JsonString
    ) => void;
    'config/locoEdited': (
        oldAddress: number,
        newAddress: number,
        name: string
    ) => void;
    'config/locoDeleted': (
        address: number
    ) => void;
    'hardware/driverChanged': (
        driver: string,
        driverMsg: string
    ) => void;
    'hardware/availableDevices': (
        devices: HardwareDevice[]
    ) => void;
    'hardware/newActiveDevice': (
        device: HardwareDevice
    ) => void;
}

// prettier-ignore
export interface ClientToServerEvents {
    'metadata/handshake': (
        name: string,
        productName: string,
        version: string
    ) => void;
    'automation/fileUpload': (
        name: string,
        file: string
    ) => void;
    'automation/fetchAll': (
    ) => void;
    'automation/fetchRunning': (
    ) => void;
    'automation/setDescription': (
        id: number, 
        description: string
    ) => void;
    'automation/pauseAutomation': (
        pid: PID
    ) => void;
    'automation/resumeAutomation': (
        pid: PID
    ) => void;
    'automation/stopAutomation': (
        pid: PID
    ) => void;
    'automation/executeAutomation': (
        id: number,
        locoId?: LocoIdentifier
    ) => void;
    'automation/deleteAutomation': (
        id: number
    ) => void;
    'throttle/setSpeed': (
        identifier: LocoIdentifier,
        speed: number,
    ) => void;
    // 'throttle/switchDirection': (
    //     identifier: LocoIdentifier,
    //     throttleID: number
    // ) => void;
    'throttle/setDirection': (
        identifier: LocoIdentifier,
        direction: Direction
    ) => void;
    'throttle/setTrackPower': (
        state: boolean
    ) => void;
    'throttle/setFunction': (
        identifier: LocoIdentifier,
        functionNum: number,
        state: boolean
    ) => void;
    'routes/setTurnout': (
        identifier: number,
        state: TurnoutState
    ) => void;
    'routes/setRoute': (
        start: number, 
        end: number
    ) => void;
    'config/addLoco': (
        name: string,
        address: number
    ) => void;
    'config/editLoco': (
        oldAddress: number,
        newName: string,
        newAddress: number
    ) => void;
    'config/deleteLoco': (
        address: number
    ) => void;
    'config/routes/addObject': (
        turnout: MapPoint
    ) => void;
    'config/routes/changeObjectCoordinate': (
        id: number,
        coordinate: Coordinate
    ) => void;
    'hardware/setDriver': (
        driver: string,
        address: string,
    ) => void;
    'hardware/getDevices': () => void
    'hardware/setDevice': (
        device: HardwareDevice
    ) => void;
}
/* eslint-enable @typescript-eslint/naming-convention */
