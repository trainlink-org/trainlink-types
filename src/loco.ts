import { Direction } from './index';

const MIN_ADDRESS = 0;
const MAX_ADDRESS = 10293;
const DEFAULT_ADDRESS = 3;

const MIN_SPEED = 0;
const MAX_SPEED = 126;

const MIN_FUNCTION_NUM = 0;
const MAX_FUNCTION_NUM = 28;

/**
 * A class to represent one locomotive
 */
export class Loco {
    readonly name: string;
    readonly address: number;
    protected _speed = 0;
    protected _direction = Direction.forward;
    private _functions: boolean[] = [];

    constructor(name?: string, address?: number) {
        name ??= '';
        address ??= DEFAULT_ADDRESS;
        this.name = name;
        // Validate input
        if (address >= MIN_ADDRESS && address <= MAX_ADDRESS) {
            this.address = address;
        } else {
            this.address = 3; //Default value if given value out of range
        }
        for (let i = 0; i <= MAX_FUNCTION_NUM; i++) {
            this._functions[i] = false;
        }
    }

    set speed(newSpeed: number) {
        //Check speed is valid
        if (newSpeed >= MIN_SPEED && newSpeed <= MAX_SPEED) {
            this._speed = newSpeed;
        }
    }

    get speed() {
        return this._speed;
    }

    set direction(newDirection: Direction) {
        this._direction = newDirection;
    }

    get direction() {
        return this._direction;
    }

    setFunction(functionNum: number, state: boolean) {
        if (
            functionNum >= MIN_FUNCTION_NUM &&
            functionNum <= MAX_FUNCTION_NUM
        ) {
            this._functions[functionNum] = state;
        }
    }

    getFunction(functionNum: number) {
        if (
            functionNum >= MIN_FUNCTION_NUM &&
            functionNum <= MAX_FUNCTION_NUM
        ) {
            return this._functions[functionNum];
        }
        return false;
    }

    toString() {
        return `${this.name} ${this.address} - ${this.speed} ${this.direction}`;
    }

    static fromJson(d: Record<string, unknown>): Loco {
        return Object.assign(new Loco(), d);
    }
}
