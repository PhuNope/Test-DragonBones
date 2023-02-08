import { _decorator, Component, Node, sys, dragonBones, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataSave')
export class DataSave extends Component {
    public static GAME_ID = "TestDragonBones";

    public static saveDataStorage(key: string, value): void {
        // let obj: object[] = [];

        // value.map((item) => {
        //     let a = { name: item.name, index: item.displayIndex, color: item._colorTransform };

        //     obj.push(a);
        // });

        sys.localStorage.setItem(key + DataSave.GAME_ID, JSON.stringify(value));
    }

    public static getDataStorage(key: string) {
        return JSON.parse(sys.localStorage.getItem(key + DataSave.GAME_ID));
    }

    start() {

    }
}


