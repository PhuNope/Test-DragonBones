import { _decorator, Component, director, dragonBones, log, Node } from 'cc';
import { DataSave } from './DataSave';
import { Configs } from './Configs';
const { ccclass, property } = _decorator;

@ccclass('PLayerData')
export class PLayerData extends Component {
    public static instance: PLayerData;

    public arrButtonData = [];

    onLoad() {
        if (!PLayerData.instance) {
            PLayerData.instance = this;
            director.addPersistRootNode(this.node);
        }

        //
        if (DataSave.getDataStorage(Configs.KEY_STORAGE_ACCESS)) {
            this.arrButtonData = DataSave.getDataStorage(Configs.KEY_STORAGE_ACCESS);
        }
    }

    update(deltaTime: number) {

    }
}


