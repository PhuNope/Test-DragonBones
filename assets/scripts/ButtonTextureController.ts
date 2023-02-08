import { _decorator, Component, dragonBones, Node } from 'cc';
import { Configs } from './untils/Configs';
import { controller } from './controller';
const { ccclass, property } = _decorator;

@ccclass('ButtonTextureController')
export class ButtonTextureController extends Component {
    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay | null = null;

    onClickViewCallback: CallableFunction | null = null;

    start() {

    }

    //set up
    setUp(buttonDataObj: object[], onClickView: CallableFunction) {
        let slots = this.armatureDisplay.armature().getSlots();

        buttonDataObj.map((itemGameData) => {
            let index = slots.findIndex((itemSlots) => {
                return itemSlots.name === itemGameData["name"];
            });

            slots[index].displayIndex = itemGameData["index"];

            slots[index]._setColor(itemGameData["color"]);
        });

        this.onClickViewCallback = onClickView;
    }

    onClickView() {
        this.onClickViewCallback(this.armatureDisplay);
    }
}


