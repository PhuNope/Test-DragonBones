import { _decorator, Component, dragonBones, Node } from 'cc';
import { Configs } from './untils/Configs';
import { controller } from './controller';
import { PLayerData } from './untils/PLayerData';
const { ccclass, property } = _decorator;

@ccclass('ButtonTextureController')
export class ButtonTextureController extends Component {
    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay | null = null;

    onClickViewCallback: CallableFunction | null = null;

    indexInData: number | null = null;

    setDataButtonDeleteCallback: CallableFunction | null = null;

    start() {

    }

    //set up
    setUpAddSave(armatureDisplayInput: dragonBones.ArmatureDisplay, onClickView: CallableFunction) {
        // let slots = this.armatureDisplay.armature().getSlots();

        // armatureDisplayInput.map((itemGameData) => {
        //     let index = slots.findIndex((itemSlots) => {
        //         return itemSlots.name === itemGameData["name"];
        //     });

        //     slots[index].displayIndex = itemGameData["index"];

        //     slots[index]._setColor(itemGameData["color"]);
        // });

        Configs.SetIndexAndColor(armatureDisplayInput, this.armatureDisplay);

        this.onClickViewCallback = onClickView;
    }

    setUpOnLoad(objectDataInput: object[], onClickView: CallableFunction) {
        Configs.setArmatureDisplayByObj(this.armatureDisplay, objectDataInput);

        this.onClickViewCallback = onClickView;
    }

    setDataButtonDelete(setDataButtonDeleteCallback: CallableFunction) {
        this.setDataButtonDeleteCallback = setDataButtonDeleteCallback;
    }

    setIndexInData(indexInput: number): void {
        this.indexInData = indexInput;
    }

    onClickView() {
        this.onClickViewCallback(this.armatureDisplay);

        this.setDataButtonDeleteCallback(this.node, this.indexInData);
    }


}


